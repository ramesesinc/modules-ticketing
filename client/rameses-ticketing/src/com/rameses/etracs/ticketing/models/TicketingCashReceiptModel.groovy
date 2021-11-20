package com.rameses.etracs.ticketing.models;

import com.rameses.rcp.annotations.*;
import com.rameses.rcp.common.*;
import com.rameses.osiris2.common.*;
import com.rameses.osiris2.client.*;
import com.rameses.util.*;
import com.rameses.treasury.common.models.*;

public class TicketingCashReceiptModel extends CommonCashReceiptModel {
    
    int numadult = 0;
    int numchildren = 0;
    int numsenior = 0;
    
    int numfil = 0;
    int numnonfil = 0;
    
    public String getCashReceiptServiceName() {
        return "TicketingCashReceiptService";
    }
    
    public def start() { 
        return super.start(); 
    }
    
    public String getTitle() {
        def buff = new StringBuilder();
        def str = invoker?.caption;
        if( str ) buff.append( str ).append(": "); 

        str = entity?.collectiontype?.title; 
        if ( str ) buff.append( str ); 

        str = buff.toString().trim();
        return ( str ? str : super.getTitle());
    }
    
    void findTxn() {
        txnid = "default";

        def v = [:];
        v.numadult = numadult;
        v.numchildren = numchildren;
        v.numsenior = numsenior;
        v.numfil = numfil;
        v.numnonfil = numnonfil;
        v.tag = entity.tag; 
        v.routes = [ entity.route ];
        query.info = v;
        
        super.findTxn();
    }
    
    void afterPrintReceipt() {
        def printModel = new TerminalPassPrintModel();
        printModel.printTickets( entity ); 
    }

    void calculateCharge() {
        def totalcount = numadult + numsenior; 
        if ( totalcount <= 0 ) 
            throw new Exception("Please specify the No. of Adults"); 

        findTxn();
    }    

    public void setNumadult( int value ) {
        if ( this.numadult == value ) {
            return; 
        }       
        this.numadult = value; 
        resetTotals();
    }
    public void setNumsenior( int value ) {
        if ( this.numsenior == value ) {
            return; 
        }
        this.numsenior = value; 
        resetTotals();
    }
    
    Number getCash() {
        return entity.totalcash;
    }
    void setCash( Number value ) {
        Number amtdue = entity.amount; 
        if ( !amtdue ) {
            entity.cashchange = entity.totalcash = 0; 
        }
        else {
            value = Math.max( value, 0 );
            if ( value >= amtdue ) {
                entity.cashchange = value - amtdue; 
                entity.totalcash = value; 
            }
            else {
                entity.totalcash = entity.cashchange = 0;
            }
        }
        binding.notifyDepends("totals"); 
    }
    
    void resetTotals() {
        entity.amount = entity.totalcash = entity.cashchange = 0;
        binding.notifyDepends("totals"); 
    }
    
    public def post() {
        if ( !entity.amount )
            throw new Exception("Please run the Calculate Charge first"); 
        if ( entity.amount <= 0 )
            throw new Exception("Amount Due must be greater than zero"); 

        if ( !entity.totalcash )
            throw new Exception("Cash Tendered must be greater than zero");
        if ( entity.totalcash < entity.amount )
            throw new Exception("Cash Tendered must be greater than or equal to the Amount Due");
        
        return super.post(); 
    }
}
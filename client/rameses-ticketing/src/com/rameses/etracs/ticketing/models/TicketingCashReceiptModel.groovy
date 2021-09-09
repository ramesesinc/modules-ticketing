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
}
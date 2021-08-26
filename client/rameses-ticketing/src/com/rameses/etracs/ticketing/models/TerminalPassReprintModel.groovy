package com.rameses.etracs.ticketing.models;

import com.rameses.rcp.annotations.*;
import com.rameses.rcp.common.*;
import com.rameses.osiris2.client.*;
import com.rameses.osiris2.common.*;
import com.rameses.etracs.ticketing.TicketPrinter;

class TerminalPassReprintModel {

    @Service('TicketingCashReceiptService')
    def cashReceiptSvc; 
    
    String title="Reprint Terminal Pass"; 
    
    def entity;
    
    def info; 

    void init() { 
        info = cashReceiptSvc.open([ objid: entity?.objid ]); 
        if ( !info.lguname ) throw new Exception("lgu_name must be set in the Ticketing Variables");
        if ( !info.thermalprintername ) throw new Exception("thermal_printername must be set in the Ticketing Variables");
    }
    
    def listHandler = [
        isMultiSelect: {
            return true; 
        }, 
        fetchList : { 
            return info.tickets; 
        }
    ] as DataListModel;
    
    void selectAll(){
        listHandler.selectAll();
    }
    
    void deselectAll(){
        listHandler.deselectAll();
    }
    
    void reprintTickets() {
        def selitems = listHandler.selectedValue;
        if ( !selitems ) throw new Exception("Ticket(s) to reprint should be selected.")

        if (!MsgBox.confirm('Reprint selected tickets?')) return; 

        logReprint(); 
        
        selitems.each {o-> 
            o.collector = entity.collector.name;
            o.orno = entity.receiptno;
            o.ordate = entity.receiptdate; 
            o.gateno = o.tag;
        } 

        def printer = new TicketPrinter();
        printer.lguname = info.lguname; 
        printer.terminalname = entity.org.name;
        printer.print( info.thermalprintername, info.tickets ); 
    }
    
    void logReprint() { 
        def data = [:]; 
        data.action = 'reprintTickets'; 
        data.ref = 'cashreceipt';
        data.refid = entity.objid; 
        data.remarks = 'Reprint terminal tickets';
        cashReceiptSvc.log( data ); 
    } 
    
}

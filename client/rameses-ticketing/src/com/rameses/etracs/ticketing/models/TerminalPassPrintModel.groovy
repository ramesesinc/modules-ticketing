package com.rameses.etracs.ticketing.models;

import com.rameses.rcp.annotations.*;
import com.rameses.rcp.common.*;
import com.rameses.osiris2.client.*;
import com.rameses.osiris2.common.*;
import com.rameses.etracs.ticketing.TicketPrinter;

class TerminalPassPrintModel {

    void printTickets( data ) {
        validateData( data ); 

        data.tickets.each {o-> 
            o.collector = data.collector.name;
            o.orno = data.receiptno;
            o.ordate = data.receiptdate; 
            o.gateno = o.tag;
        } 

        def printer = new TicketPrinter();
        printer.lguname = data.lguname; 
        printer.terminalname = data.org.name;
        printer.print( data.thermalprintername, data.tickets ); 
    }
    
    void validateData( data ) {
        def buff = new StringBuilder();
        def suffix = "  parameter is required in TerminalPassPrintModel\n";
        
        if ( !data.receiptno ) 
            buff.append("data.receiptno").append( suffix );
        if ( !data.receiptdate ) 
            buff.append("data.receiptdate").append( suffix );
        if ( !data.collector?.name ) 
            buff.append("data.collector.name").append( suffix );
        if ( !data.org?.name ) 
            buff.append("data.org.name").append( suffix );

        if ( !data.lguname ) 
            buff.append("data.lguname").append( suffix );
        if ( !data.thermalprintername ) 
            buff.append("data.thermalprintername").append( suffix );

        if ( !data.tickets ) 
            buff.append("data.tickets").append( suffix ); 
        if ( data.tickets.find{( !it.tag )} ) 
            buff.append("All tickets must have a tag. Please verify\n"); 
            
        if ( buff.length() > 0 ) {
            throw new Exception( buff.toString() ); 
        }
    }
}

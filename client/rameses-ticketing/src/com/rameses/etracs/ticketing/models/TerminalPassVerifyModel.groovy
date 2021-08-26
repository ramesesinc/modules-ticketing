package com.rameses.etracs.ticketing.models;

import com.rameses.rcp.annotations.*;
import com.rameses.rcp.common.*;
import com.rameses.osiris2.client.*;
import com.rameses.osiris2.common.*;

class TerminalPassVerifyModel {

    @Binding
    def binding;

    @Service('QueryService')
    def querySvc; 
    
    @Service('TicketingService')
    def ticketSvc;
    
    String title = 'Verify Terminal Pass'
    
    def entity;
    def turnstiles;
    def msg;
    
    @PropertyChangeListener
    def listener = [
        'entity.barcode' : { msg = null; }
    ]
    
    void init(){
        entity = [:];
        
        def param = [ _schemaname: 'ticketing_turnstile' ]; 
        param.node = [ state: 'ACTIVE' ]; 
        turnstiles = querySvc.getList( param ); 
        entity.turnstile = turnstiles.find{it.tags == 'TOURIST'}
    }
    
    void verify(){
        def retval = ticketSvc.verify([id:entity.turnstile.objid, barcode:entity.barcode]); 
        println 'retval -> '+ retval;
        msg = null;
        if (retval.retcode != 0){
            msg = retval.message;
        }
        else {
            msg = 'Barcode is valid'
        }
        binding.refresh('msg');
    }

    def cancel() {
        return '_close'; 
    }
} 
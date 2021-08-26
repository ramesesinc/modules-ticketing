package com.rameses.etracs.ticketing.models;

import com.rameses.rcp.annotations.*;
import com.rameses.rcp.common.*;
import com.rameses.osiris2.client.*;
import com.rameses.osiris2.common.*;
import com.rameses.seti2.models.CrudFormModel;

class TerminalModel extends CrudFormModel {

    @Service('TicketingTerminalService')
    def terminalSvc; 

    void afterEdit() {
        if ( binding ) {
//            binding.focus('entity.title'); 
        }
    }
    void afterCreate() {
        entity.objid = null; 
        if ( binding ) {
        }
    }
    void afterSave() {
    }
    
    def getLookupOrg() {
        def params = [:];
        params.onselect = { o->
            entity.org = [objid: o.objid, name: o.name]; 
            binding.refresh('entity.org');
        }
        return Inv.lookupOpener('org:lookup', params); 
    }     
    
    void activate() {
        def res = terminalSvc.activate([ objid: entity.objid ]); 
        if ( res?.state ) entity.state = res.state; 
        updateMgmtList(); 
    }
    void deactivate() {
        def res = terminalSvc.deactivate([ objid: entity.objid ]); 
        if ( res?.state ) entity.state = res.state; 
        updateMgmtList(); 
    }
    void updateMgmtList() {
        if ( caller == null ) return; 
        
        def callerListModel = caller; 
        if ( hasCallerProperty( 'caller', caller )) {
            callerListModel = caller.caller; 
        }

        if ( hasCallerMethod( 'search', callerListModel )) {
            callerListModel.search(); 
        }
    }
}
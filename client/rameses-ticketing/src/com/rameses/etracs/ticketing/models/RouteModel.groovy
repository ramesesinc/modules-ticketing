package com.rameses.etracs.ticketing.models;

import com.rameses.rcp.annotations.*;
import com.rameses.rcp.common.*;
import com.rameses.osiris2.client.*;
import com.rameses.osiris2.common.*;
import com.rameses.seti2.models.CrudFormModel;

class RouteModel extends CrudFormModel {

    @Service('TicketingRouteService')
    def routeSvc; 

    def getLookupOrg() {
        def params = [:];
        return Inv.lookupOpener('ticketing_terminal:lookup', params); 
    } 
    
    void activate() {
        def res = routeSvc.activate([ objid: entity.objid ]); 
        if ( res?.state ) entity.state = res.state; 
        updateMgmtList(); 
    }
    void deactivate() {
        def res = routeSvc.deactivate([ objid: entity.objid ]); 
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
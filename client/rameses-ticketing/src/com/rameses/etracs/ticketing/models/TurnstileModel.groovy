package com.rameses.etracs.ticketing.models;

import com.rameses.rcp.annotations.*;
import com.rameses.rcp.common.*;
import com.rameses.osiris2.client.*;
import com.rameses.osiris2.common.*;
import com.rameses.seti2.models.CrudFormModel;

class TurnstileModel extends CrudFormModel {

    @Service('TicketingTurnstileService')
    def turnstileSvc; 
    
    String createFocusComponent = 'entity.objid';
    String editFocusComponent = 'entity.title';
    boolean allowApprove = false;
    
    def selectedCategory;    
    def listhandler = [
        fetchList: { 
            if ( entity.categories == null ) {
                entity.categories = []; 
            } 
            return entity.categories; 
        },
        removeItem: { o-> 
            return entity.categories.remove( o ); 
        }
    ] as ListPaneModel;

    void removedSelectedCategory() {
        if ( selectedCategory?.objid ) {
            listhandler.removeSelectedItem(); 
        }
    }
    
    void afterOpen() {
        if ( binding ) {
            binding.refresh('lkpcategory');
        }
        listhandler.reload(); 
    }
    void afterEdit() {
        if ( binding ) {
            binding.focus('entity.title'); 
        }
    }
    void afterCreate() {
        selectedCategory = null; 
        entity.objid = null; 
        if ( binding ) {
            binding.focus('entity.objid'); 
            binding.refresh('lkpcategory');
        }
        listhandler.reload(); 
    }
    void afterSave() {
        if ( binding ) {
            binding.refresh('lkpcategory');
        }
        listhandler.reload(); 
    }
    
    def getLookupCategory() {
        if ( entity.categories == null ) {
            entity.categories = []; 
        } 
        
        def params = [ multiSelectEnabled: true ];
        params.beforeQueryHandler = { map-> 
            map.exclude = entity.categories.collect{ it.objid }.findAll{( it )} 
        }
        params.onselect = { selitems->
            selitems.each{ oo-> 
                if ( !entity.categories.find{ it.objid == oo.objid }) {
                    entity.categories << oo; 
                }
            }
            
            listhandler.reload();
        }
        return Inv.lookupOpener('ticketing_turnstile_category:lookup', params); 
    }     
    
    void activate() {
        def res = turnstileSvc.activate([ objid: entity.objid ]); 
        if ( res?.state ) entity.state = res.state; 
        updateMgmtList(); 
    }
    void deactivate() {
        def res = turnstileSvc.deactivate([ objid: entity.objid ]); 
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
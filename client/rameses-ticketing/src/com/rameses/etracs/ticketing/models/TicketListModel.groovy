package com.rameses.etracs.ticketing.models;

import com.rameses.seti2.models.CrudListModel;

class TicketListModel extends CrudListModel {

    public void initColumn( c ) { 
        if (c.name == 'seqno') {
            c.width = 100;
            c.maxWidth = 200; 
        }
        else if (c.name == 'dtfiled') {
            c.width = 100; 
            c.maxWidth = 140; 
        }
        else if (c.name == 'tag') {
            c.width = 100; 
            c.maxWidth = 200; 
        }
        else if (c.name == 'reftype') {
            c.width = 100; 
            c.maxWidth = 150; 
        }
        else if (c.name == 'refno') {
            c.width = 100; 
            c.maxWidth = 140; 
        }
        else if (c.name == 'dtused') {
            c.width = 100;
            c.maxWidth = 140; 
        }
        else if (c.name == 'voided') {
            c.width = c.maxWidth = 50; 
            c.type = 'boolean'; 
        } 
    } 

    public void beforeQuery( param ) {
        def _schemaname = selectedNode?._schemaname; 
        if ( _schemaname ) {
            param._schemaname = _schemaname; 
        }
    } 
} 
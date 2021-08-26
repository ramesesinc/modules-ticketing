package com.rameses.etracs.ticketing.models;

import com.rameses.seti2.models.CrudListModel;

class TurnstileListModel extends CrudListModel {

    public void initColumn( c ) { 
        if (c.name == 'objid') {
            c.maxWidth = 100; 
        }
        else if (c.name == 'dtfiled') {
            c.width = c.maxWidth = 140; 
        }
        else if (c.name == 'createdby.name') {
            c.width = 140;
            c.maxWidth = 200; 
        }
    } 
    
} 
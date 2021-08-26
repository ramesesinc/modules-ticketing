package com.rameses.etracs.ticketing.models;

import com.rameses.seti2.models.CrudListModel;

class TerminalListModel extends CrudListModel {

    public void initColumn( c ) { 
        if (c.name == 'objid') {
            c.width = 100;
            c.maxWidth = 120; 
        }
    }     
} 
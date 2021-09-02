package com.rameses.etracs.ticketing.models;

import com.rameses.seti2.models.CrudLookupModel;

class RouteListLookupModel extends CrudLookupModel {

    public void initColumn( c ) { 
        if (c.name == 'sortorder') {
            c.width = c.maxWidth = 100;
            c.type = 'integer'; 
        }
        else if (c.name == 'origin.name') {
            c.caption = "Origin";
        }
        else if (c.name == 'destination.name') {
            c.caption = "Destination";
        }
    }     
} 
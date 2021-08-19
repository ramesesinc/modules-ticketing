package com.rameses.etracs.ticketing.models;

import com.rameses.rcp.annotations.*;
import com.rameses.rcp.common.*;
import com.rameses.osiris2.common.*;
import com.rameses.osiris2.client.*;
import com.rameses.util.*;
import com.rameses.treasury.common.models.*;
import com.rameses.seti2.models.*;

public class TicketingItemAccountModel extends CrudFormModel {
    
    def itemTypes = [
        "FEE", "SURCHARGE","INTEREST","DISCOUNT"
    ]
    
    void afterCreate() {
        entity.objid = "";
    }
    
}
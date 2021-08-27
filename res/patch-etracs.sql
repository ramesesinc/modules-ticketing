
INSERT INTO `sys_domain` (`name`, `connection`) 
VALUES ('Ticketing', 'ticketing');

INSERT INTO `cashreceipt_plugin` (`objid`, `connection`, `servicename`) 
VALUES ('ticketing', 'ticketing', 'TicketingPaymentService');

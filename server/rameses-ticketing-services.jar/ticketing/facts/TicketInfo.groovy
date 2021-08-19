package ticketing.facts;

class TicketInfo {
	
	int numadult;
	int numchildren;
	int numsenior;

	int numfil;
	int numnonfil;

	public TicketInfo( def m ) {
		if(m.numadult!=null) this.numadult = m.numadult;
		if(m.numchildren!=null) this.numchildren = m.numchildren;
		if(m.numsenior!=null) this.numsenior = m.numsenior;

		if(m.numfil!=null) this.numfil = m.numfil;
		if(m.numnonfil!=null) this.numnonfil = m.numnonfil;

	}
}
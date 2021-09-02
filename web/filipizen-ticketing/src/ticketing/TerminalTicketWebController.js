import React, { useState } from 'react'
import { Page, StateProvider, Content } from "rsi-react-web-components";
import "rsi-react-web-components/dist/index.css";

const initialState = {
  txntype: "ticketing",
  txntypename: "ticketing",
  origin: 'filipizen',
  bill: {},
  contact: {},
  entity: {
    guestInfo: {total: 0, numadult: null, numsenior: null, numchildren: null, numfil: null, numnonfil: null},
    routes: [
      {objid: "1", origin: "Caticlan", destination: "Cagban", title: "Caticlan - Cagban", selected: false},
      {objid: "2", origin: "Cagban", destination: "Caticlan", title: "Cagban - Caticlan", selected: false },
    ],
  }
}

const reducer = (draft, action) => {
  switch(action.type) {
    case "SET_ENTITY":
      draft.entity = action.entity;
      return;
    
    case "SET_GUESTINFO":
      draft.entity.guestInfo = action.guestInfo;
      return;
    
    case "SET_BILL":
      draft.bill = action.bill;
      return;
    
    case "SET_CONTACT":
      draft.contact = action.contact;
      return;
  }
}

import { ContactVerification } from 'rsi-react-filipizen-components'
import Disclaimer from "./Disclaimer";
import TravelItinerary from "./TravelItinerary";
import GuestProfile from "./GuestProfile";
import OrderFeePayment from "./OrderFeePayment";

const EmailVerification = props => {
  return (
    <ContactVerification {...props} showName={true} emailRequired={true} />
  )
}

const pages = [
  {step: 1, name: "disclaimer", caption: "Disclaimer", Component: Disclaimer},
  {step: 2, name: "verification", caption: "Verification", Component: EmailVerification },
  {step: 3, name: "itinerary", caption: "Travel Itinerary", Component: TravelItinerary},
  {step: 4, name: "guest", caption: "Guest Profile", Component: GuestProfile},
  {step: 5, name: "epayment", caption: "Payment", Component: OrderFeePayment},
]

const TerminalTicketWebController = ({
  partner,
  service,
  location,
  history,
  initialStep=0
}) => {

  const [step, setStep] = useState(initialStep);

  const moveNextStep = () => {
    setStep(cs => cs+1);
  }

  const movePrevStep = () => {
    if (step === 0) {
      history.goBack();
    } else {
      setStep(cs => cs-1);
    }
  }

  const cancelPayment = () => {
    setStep(1);
  }

  const page = pages[step];
  const PageComponent = page.Component;
  const compProps = {
    partner,
    service,
    location,
    history,
    moveNextStep,
    movePrevStep,
    cancelPayment,
    title: "Terminal Fee Ticket Order",
  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Page>
        <Content center>
          <PageComponent page={page} {...compProps} />
        </Content>
      </Page>
    </StateProvider>
  )
}

export default TerminalTicketWebController

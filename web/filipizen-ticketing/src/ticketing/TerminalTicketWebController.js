import React, { useState } from 'react'
import { Page, StateProvider, Content, Spacer } from "rsi-react-web-components";
import "rsi-react-web-components/dist/index.css";

export const ACTIONS = {
  SET_ENTITY: "SET_ENTITY",
  SET_GUESTINFO: "SET_GUESTINFO",
  SET_ROUTES: "SET_ROUTES",
  SET_PO: "SET_PO",
  SET_BILL: "SET_BILL",
  SET_CONTACT: "SET_CONTACT",
}

const initialState = {
  txntype: "ticketing",
  txntypename: "ticketing",
  origin: 'filipizen',
  bill: {},
  po: {},
  entity: {
    guestInfo: {total: 0, numadult: null, numchildren: null, numnonfil: null},
    routes: [],
  },
  contact: {},
}

const reducer = (draft, action) => {
  switch(action.type) {
    case ACTIONS.SET_ENTITY:
      draft.entity = action.entity;
      return;
    
    case ACTIONS.SET_GUESTINFO:
      draft.entity.guestInfo = action.guestInfo;
      return;
    
    case ACTIONS.SET_ROUTES:
      draft.entity.routes = action.routes;
      return;

    case ACTIONS.SET_PO:
      draft.po = action.po;
      return;
    
    case ACTIONS.SET_BILL:
      draft.bill = action.bill;
      return;

    case ACTIONS.SET_CONTACT:
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
    title: "Online Terminal Pass Issuance",
  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Page>
        <Content center>
          <PageComponent page={page} {...compProps} />
        </Content>
        <Spacer height={40} />
      </Page>
    </StateProvider>
  )
}

export default TerminalTicketWebController

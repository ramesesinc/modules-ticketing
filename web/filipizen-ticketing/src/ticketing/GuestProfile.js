import React, { useState, useRef } from "react";
import {
  Title,
  FormPanel,
  Button,
  ActionBar,
  Subtitle,
  Spacer,
  Service,
  Error,
  BackLink,
  useData,
  Integer,
  Panel,
  Card,
  formatDate
} from "rsi-react-web-components";
import { ACTIONS } from "./TerminalTicketWebController";

const MAX_NO_GUESTS = 25;

const GuestProfile = ({ title, partner, moveNextStep, movePrevStep }) => {
  const [ctx, dispatch] = useData();
  const [error, setError] = useState();
  const [processing, setProcessing] = useState(false);
  const [guestInfo, setGuestInfo] = useState({ ...ctx.entity.guestInfo });

  const formRef = useRef();

  const getTotal = () => {
    let total = 0;
    if (guestInfo.numadult) total += parseInt(guestInfo.numadult);
    if (guestInfo.numchildren) total += parseInt(guestInfo.numchildren);
    return total;
  };

  const getParticulars = (routes) => {
    const routeTitles = routes.map((route) => `${route.name}`);
    const particulars = routeTitles.join(" and ");
    return particulars;
  };

  const getTravelInfo = (routes) => {
    const dates = routes.map((route) => formatDate(route.traveldate));
    return dates.join(" and ");
  };

  const getGuestInfo = () => {
    return `With ${getTotal()} Guest(s)`;
  };

  const buildBill = (bill) => {
    const entity = ctx.entity;
    const selectedRoutes = entity.routes.filter((route) => route.selected);
    let particulars = "Terminal Fee for";
    particulars += " " + getParticulars(selectedRoutes);
    particulars += " " + getTravelInfo(selectedRoutes);
    particulars += ". " + getGuestInfo(entity);
    const info = {
      ...guestInfo,
      routes: entity.routes.filter((route) => route.selected)
    };

    return {
      refno: bill.billno,
      txntype: ctx.txntype,
      origin: ctx.origin,
      txntypename: "TERMINAL FEE",
      orgcode: partner.id,
      paidby: bill.paidby,
      paidbyaddress: bill.paidbyaddress,
      amount: bill.amount,
      paymentdetails: particulars,
      particulars: particulars,
      info,
      items: bill.items
    };
  };

  const loadBill = () => {
    const total = getTotal();
    if (total === 0) {
      setError("At least one (1) guest should be specified.");
      return;
    }

    if (total > MAX_NO_GUESTS) {
      setError(`Total no. of guests should not exceed ${MAX_NO_GUESTS}.`);
      return;
    }

    if (guestInfo.numnonfil && guestInfo.numnonfil > guestInfo.numadult) {
      setError(`Number of Tourists must not exceed ${guestInfo.numadult}.`);
      return;
    }

    if (total !== 1 && !formRef.current.reportValidity()) {
      return;
    }

    const svc = Service.lookup(
      `${partner.channelid}:OnlineTicketingService`,
      "ticketing"
    );
    const info = {
      ...guestInfo,
      total,
      contact: ctx.contact,
      routes: ctx.entity.routes,
      tag: "TOURIST"
    };
    setProcessing(true);
    svc.invoke("getBilling", { info }, (err, data) => {
      if (err) {
        setError(err.toString());
        setProcessing(false);
      } else {
        dispatch({ type: ACTIONS.SET_BILL, bill: buildBill(data) });
        dispatch({
          type: ACTIONS.SET_GUESTINFO,
          guestInfo: { ...guestInfo, total: getTotal() }
        });
        setProcessing(false);
        moveNextStep();
      }
    });
  };

  return (
    <form ref={formRef}>
      <Card>
        <Title>{title}</Title>
        <Subtitle>Guest Profile</Subtitle>
        <Spacer />
        <Panel width={400}>
          <Error msg={error} />
          <Spacer height={10} />
          <FormPanel context={guestInfo} handler={setGuestInfo}>
            <Integer
              caption="No. of Adults"
              name="numadult"
              allowNegative={false}
              autoFocus={true}
            />
            <Integer
              caption="No. of Children (5 years and below)"
              name="numchildren"
              allowNegative={false}
            />
            <Integer
              caption="No. of Tourists (above 5 years old)"
              name="numnonfil"
              allowNegative={false}
            />
          </FormPanel>
          <Spacer />
          <p style={{ color: "red", fontSize: 12, opacity: 0.8 }}>
            * Children 5 years old and below are exempted from paying terminal
            fee
          </p>
        </Panel>
        <ActionBar>
          <BackLink caption="Back" variant="text" action={movePrevStep} />
          <Button
            caption="Next"
            action={loadBill}
            loading={processing}
            disabled={processing}
          />
        </ActionBar>
      </Card>
    </form>
  );
};

export default GuestProfile;

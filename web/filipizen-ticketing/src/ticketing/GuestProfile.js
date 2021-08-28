import React, { useState, useRef } from 'react'
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
  Card
} from 'rsi-react-web-components'

const GuestProfile = ({
  title,
  partner,
  moveNextStep,
  movePrevStep,
}) => {

  const [ctx, dispatch] = useData();
  const [error, setError] = useState();
  const [processing, setProcessing] = useState(false);
  const [guestInfo, setGuestInfo] = useState({...ctx.entity.guestInfo});

  const formRef = useRef();

  const getBilling = async () => {
    const svc = await Service.lookupAsync(`${partner.id}:OnlineTicketingService`, "ticketing")
    const total = getTotal();
    const info = {
      ...guestInfo, 
      numnonfil: getNumNonFil(total), 
      total, 
      contact: ctx.contact, 
      routes: ctx.entity.routes, 
      tag: 'TOURIST',
    }
    return await svc.invoke("getBilling", {info});
  }

  const getTotal = () => {
    let total = 0;
    if (guestInfo.numadult) total += parseInt(guestInfo.numadult);
    if (guestInfo.numsenior) total += parseInt(guestInfo.numsenior);
    if (guestInfo.numchildren) total += parseInt(guestInfo.numchildren);
    return total;
  }

  const getNumNonFil = (total) => {
    return total - guestInfo.numfil;
  }

  const loadBill = () => {
    const total = getTotal();
    if (total === 0) {
      setError("At least one (1) guest should be specified.");
      return;
    }

    if (total !== 1 && !formRef.current.reportValidity()) {
      return;
    }

    const numnonfil = getNumNonFil(total);
    if (numnonfil < 0) {
      setError('Number of Filipino citizens should not exceed ' + total);
      return;
    }
    
    setProcessing(true);
    setError(null);
    dispatch({type: "SET_GUESTINFO", guestInfo: {...guestInfo, numnonfil, total}});
    getBilling().then(bill => {
      console.log("BILL", bill);
      dispatch({type: "SET_BILL", bill});
      setProcessing(false);
      moveNextStep();
    }).catch(err => {
      console.log("error", err)
      setError(err.toString());
      setProcessing(false);
    })
  }
  
  return (
    <form ref={formRef}>
    <Card>
      <Title>{title}</Title>
      <Subtitle>Guest Profile</Subtitle>
      <Spacer />
      <Error msg={error} />
      <Panel width={400}>
        <FormPanel context={guestInfo} handler={setGuestInfo}>
          <Integer
            caption="No. of Adults (ages 12 or above)"
            name="numadult"
            allowNegative={false}
            autoFocus={true}
          />
          <Integer
            caption="No. of Senior (ages 60 and above)"
            name="numsenior"
            allowNegative={false}
          />
          <Integer
            caption="No. of Children (below 12)"
            name="numchildren"
            allowNegative={false}
          />
          <Spacer />
          <Integer
            caption="No. of Filipino citizens"
            name="numfil"
            required={true}
            allowNegative={false}
          />
        </FormPanel>
      </Panel>
      <ActionBar>
        <BackLink caption='Back' variant="text" action={movePrevStep} />
        <Button caption='Next' action={loadBill} loading={processing} disabled={processing} />
      </ActionBar>
    </Card>
    </form>
  )
}

export default GuestProfile

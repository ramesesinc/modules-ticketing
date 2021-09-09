import React, { useState } from "react";
import {
  Panel,
  Checkbox,
  ActionBar,
  BackLink,
  Button,
  MsgBox,
  Spacer,
  Card,
  Title,
  Subtitle,
} from "rsi-react-web-components";

import PrivacyStatement from "./PrivacyStatement";
import TermsAndConditions from "./TermsAndConditions";

const Disclaimer = ({
  history,
  moveNextStep,
  title,
}) => {
  const [agree, setAgree] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTermsAndConditions, setShowTermsAndConditions] = useState(false);

  const onSubmit = () => {
    if (!agree) {
      setShowMessage(true);
    } else {
      moveNextStep();
    }
  }

  return (
    <React.Fragment>
      <TermsAndConditions open={showTermsAndConditions} onAccept={() => setShowTermsAndConditions(false)} />
      <PrivacyStatement open={showPrivacy} onAccept={() => setShowPrivacy(false)} />
      <MsgBox
        open={showMessage}
        msg="Kindly click on the check box to agree on the terms and conditions"
        onAccept={() => setShowMessage(false) }
      />
      <Card>
        <Title>{title}</Title>
        <Subtitle>Caticlan and Cagban Passenger Terminals</Subtitle>
        <Spacer />
        <Panel style={styles.container}>
          <p style={styles.text}>
            Thank you for your interest in availing this service application.
          </p>
          <p style={styles.text}>
            By using this service, you agree to these 
            <span onClick={() => setShowTermsAndConditions(true)} style={styles.link}>terms and conditions</span>.
          </p>
          <p style={styles.text}>
            We value your privacy. Please read our privacy statement 
            <span onClick={() => setShowPrivacy(true)} style={styles.link}>here</span>.
          </p>
          <Spacer height={30} />
          <Panel style={{padding: "0px 30px"}}>
            <Checkbox
              caption="I have read and agree with the terms and conditions"
              value={agree}
              onChange={setAgree}
            />
          </Panel>
        </Panel>
        <ActionBar>
          <BackLink action={() => history.goBack()}/>
          <Button caption="Next" action={onSubmit} />
        </ActionBar>
      </Card>
    </React.Fragment>
  )

  
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    maxWidth: 350,
    padding: 15,
    border: "1px solid #aaa",
    borderRadius: 5,
    borderShadow: "5px 0px 7px -7px rgba(0,0,0,0.8)"
  },
  text: {
    // fontSize: 14,
    textAlign: "left",
    opacity: 0.75,
    marginTop: 0,
  },
  link: {
    color: "blue",
    cursor: "pointer",
    textDecoration: "underline",
    marginLeft: 5,
  }
};

export default Disclaimer;

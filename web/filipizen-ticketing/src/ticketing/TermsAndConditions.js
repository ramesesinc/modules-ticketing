import React from "react";
import { Modal } from "rsi-react-web-components";

const TermsAndConditions = ({ open, onAccept }) => {
  return (
    <Modal 
      caption="Terms and Conditions" 
      open={open} 
      onAccept={onAccept} 
      showCancel={false}
    >
      {/* <div style={styles.container}> */}
        <p style={styles.text}>
          This application will require you to provide information that will 
          require consent.
        </p>
        <p style={styles.text}>
          The information will be used for this transaction and
          for tourism purposes. In compliance with RA 10173 or Data
          Privacy Act of the Philippines, your data will not be
          used for other purposes except for the above mentioned.
        </p>
      {/* </div> */}
    </Modal>
  );
};

const styles = {
  container: {
    height: "250px",
    overflow: "auto",
    paddingLeft: 10,
    paddingRight: 10,
  },
  text: {
    fontSize: 12,
    opacity: 0.8
  }
};

export default TermsAndConditions;

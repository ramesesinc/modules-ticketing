import React from "react";
import { Modal } from "rsi-react-web-components";

const PrivacyStatement = ({ open, onAccept }) => {
  return (
    <Modal 
      caption="Privacy Policy Statement" 
      open={open} 
      onAccept={onAccept} 
      showCancel={false}
    >
      <div style={styles.container}>
        <p style={styles.text}>
          The Provincial Government of Aklan (PGA) is committed in protecting and
          respecting the privacy of the personal data it collects in compliance
          with Republic Act No. 10173 or the Data Privacy Act of 2012, and its
          implementing rules and regulations. This Privacy Policy statement
          applies to the following end users of the
        </p>
        <p style={styles.section}>1. Personal Data Collected</p>
        <p style={styles.text}>
          PGA collects the following personal information:
        </p>
        <ul style={styles.text}>
          <li>Email address</li>
          <li>Passport/Valid ID and Number</li>
          <li>Mobile Number</li>
          <li>Full Name</li>
          <li>Residence Address</li>
          <li>Birthdate</li>
          <li>Personal Health Information</li>
          <li>Nationality</li>
          <li>Scanning History including scanning station, timestamp</li>
        </ul>
        <p style={styles.section}>2. Legal Basis for Personal Data Processing</p>
        <p style={styles.text}>
          PGA process data with Republic Act No. 10173 or the Data Privacy Act of
          2012, and its implementing rules and regulations as its legal basis. In
          addition, Department of Interior and Local Government (DILG) Memorandum
          Circular 2020-077, under Section 3.7 mandates that, “... The LGU may
          make use of any available technology or application that could assist it
          in its actions relative to contact tracing….” Further, Department of
          Health (DOH) Administrative Order No. 2020-0015, under Section VII-C,
          directs local government units “to implement non-pharmaceutical
          interventions (NPIs) as minimum public health standards to mitigate the
          threat of COVID-19” which includes physical distancing, contactless
          transactions, and limited face-to-face interactions.
        </p>
        <p style={styles.text}>
          Data is collected primarily for contact tracing of individuals who are
          suspect, probable or confirmed for COVID-19 and other infectious
          diseases as well as the people they came in contact with.
        </p>
        <p style={styles.section}>3. Data Collection</p> 
        <p style={styles.text}>
        Data collection happens when the user encodes their
        personal data in the online health declaration form; and when the QR Code
        of the user is scanned in the scanning stations which both uses a secure
        connection to the PGA Servers. 4. Information Security PGA implements
        appropriate security protocols to prevent unauthorized access to personal
        data. These include encryption of data transmission, validation of user
        credentials before granting of access, password requirements for login
        access, user level access and functionality depending on user category and
        backup procedures. These security protocols are continuously evaluated and
        updated as the need arises. 5. Data Sharing PGA may share data in so far
        as the Republic Act No. 10173 or the Data Privacy Act of 2012, and its
        implementing rules and regulations, issuances of the National Privacy
        Commission (NPC) and other relevant laws allow it. 6. Retention and
        Deletion PGA retains personal data as long as necessary for processing in
        accordance to purposes stated herein and in compliance with other relevant
        and applicable laws particularly its obligations under Republic Act No.
        9470 or the National Archives of the Philippines Act of 2007. 7. Access,
        and Correction of Personal Database Users have the right to access their
        personal data and any personal profile information that may be incorrect
        can be changed by the user or requested to be changed. 8. Right to
        Complain If users believe that their data is processed in violation of
        their rights, they can send their complaint to touristboracay@gmail.com to
        resolve or clarify the issue before formally filing with the National
        Privacy Commission (NPC). 9. Controller and Contact Information This
        system is owned, developed and managed by the Provincial Government of
        Aklan located at Provincial Capitol, Barangay Estancia, Municipality of
        Kalibo, Province of Aklan as the personal information controller. For
        questions or clarifications about this Privacy Policy Statement, please
        contact: touristboracay@gmail.com.
        </p>
      </div>
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
  section: {
    fontSize: 14,
    fontWeight: 550,
    opacity: 0.8
  },
  text: {
    fontSize: 12,
    opacity: 0.8
  }
};

export default PrivacyStatement;

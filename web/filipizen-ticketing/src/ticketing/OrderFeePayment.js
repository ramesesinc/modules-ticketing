import React from "react";
import { useData } from "rsi-react-web-components";
import { EPayment } from "rsi-react-filipizen-components";

const OrderFeePayment = (props) => {
  const [ctx ] = useData();
  const module = {
    title: "Online Terminal Pass Issuance",
  };

  return (
    <EPayment
      module={module}
      {...props}
      contact={ctx.contact}
      bill={ctx.bill}
      po={ctx.po}
      initialStep={3}
      cancelPayment={props.cancelPayment}
      payee={{paidby: ctx.contact.name, paidbyaddress: ctx.contact.address}}
      showExpiry={false}
    />
  );
};

export default OrderFeePayment;

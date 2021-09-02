import React from "react";
import { useData } from "rsi-react-web-components";
import { EPayment } from "rsi-react-filipizen-components";
import OrderFee from "./OrderFee";

const OrderFeePayment = (props) => {
  const [ctx, dispatch] = useData();
  const module = {
    title: "Boracay Terminal Fee Ticket Order",
    component: OrderFee
  };
  return (
    <EPayment
      module={module}
      {...props}
      contact={ctx.contact}
      initialStep={1}
      cancelPayment={props.cancelPayment}
    />
  );
};

export default OrderFeePayment;

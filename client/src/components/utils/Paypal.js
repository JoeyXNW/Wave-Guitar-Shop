import React, { Component } from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";

class Paypal extends Component {
  state = {};
  render() {
    const onSuccess = data => {
      this.props.onSuccess(data);
    };

    const onCancel = data => {
      console.log(JSON.stringify(data));
    };

    const onError = data => {
      console.log(JSON.stringify(data));
    };

    let env = "sandbox";

    let currency = "USD";

    let total = this.props.toPay;

    const client = {
      sandbox:
        "AddGeL6nBEbDgEfeHHZU8OT8J89Nuz7NXWhhExEpf5nb_O-4e76RnVICWH4h8Z2rsC3ok5TLh1QQXAuz",
      production: ""
    };
    return (
      <>
        <PaypalExpressBtn
          env={env}
          client={client}
          currency={currency}
          total={total}
          onError={onError}
          onSuccess={onSuccess}
          onCancel={onCancel}
          style={{
            size: "large",
            color: "blue",
            shape: "rect",
            label: "checkout"
          }}
        />
      </>
    );
  }
}

export default Paypal;

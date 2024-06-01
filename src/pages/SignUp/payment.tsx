import { loadStripe } from "@stripe/stripe-js";

import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { json } from "stream/consumers";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string
);

function success(): string {
  return "http://localhost:3000/signup";
}
export default function Payments() {
  const handleClick = async (event: any) => {
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await stripePromise;
    if (stripe) {
      const temp = stripe
        .redirectToCheckout({
          lineItems: [
            {
              price: process.env.REACT_APP_ONE_TIME_PLAN_PRICE_ID as string,
              quantity: 1,
            },
          ],
          mode: "payment",
          successUrl: success(),
          cancelUrl: "https://example.com/cancel",
          clientReferenceId: "1999",
        })
        .then(function (result) {
          if (result.error) {
            console.log("error in payment");
          }
        });
      // .then((res: any) => {});
      //   temp.then(() => {

      //     localStorage.setItem("paid", "true");
      //   });
    }
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
  };

  return (
    <button role="link" onClick={handleClick}>
      Checkout
    </button>
  );
}

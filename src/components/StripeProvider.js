// StripeProvider.js
import React from 'react';
import { StripeProvider as ReactStripeProvider } from 'react-stripe-elements';

const publishableKey = 'pk_test_51HpgOfESTacQj7cFapgiHwtCBCNNfw44k82IX3qfsUEn59PEHl2GijrntIlZL3oundNmzBUp87WsdZLVwcLTchqp006Nq3vz5v'; // Replace with your actual Stripe Publishable Key

const StripeProvider = ({ children }) => (
  <ReactStripeProvider apiKey={publishableKey}>
    {children}
  </ReactStripeProvider>
);

export default StripeProvider;

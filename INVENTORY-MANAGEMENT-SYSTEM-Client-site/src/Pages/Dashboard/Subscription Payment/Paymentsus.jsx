import { loadStripe } from "@stripe/stripe-js";
import Container from "../../../ShareComponent/Container/Container";
import { Elements } from "@stripe/react-stripe-js";
import SectionTitle from "../../../ShareComponent/SectionTitle/SectionTitle";
import PaymentSuscFrom from "./PaymentSuscFrom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIP_PUBLICE_KEY);

const Paymentsus = ({amount}) => {
  return (
    <div>
      <Container>
        <SectionTitle
          title="Payment"
          description="Please pay Your to Suscription Amount "
        ></SectionTitle>
        <Elements stripe={stripePromise}>
         <PaymentSuscFrom amount=''></PaymentSuscFrom>
        </Elements>
      </Container>
    </div>
  );
};

export default Paymentsus;

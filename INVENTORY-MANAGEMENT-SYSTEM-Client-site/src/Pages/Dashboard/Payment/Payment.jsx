import { loadStripe } from "@stripe/stripe-js";
import Container from "../../../ShareComponent/Container/Container";
import { Elements } from "@stripe/react-stripe-js";
import SectionTitle from "../../../ShareComponent/SectionTitle/SectionTitle";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIP_PUBLICE_KEY)
const Payment = () => {
    return (
        <Container>
            <SectionTitle title='Payment' description='Please pay Your to Unpaid amount'></SectionTitle>
            <Elements stripe={stripePromise}>
                <PaymentForm></PaymentForm>     
            </Elements>
        </Container>
    );
};

export default Payment;
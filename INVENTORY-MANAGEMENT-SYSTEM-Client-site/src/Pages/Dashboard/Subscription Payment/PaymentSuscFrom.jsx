import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Container from "../../../ShareComponent/Container/Container";
import { useEffect, useState } from "react";
import useAxiosPublice from "../../../Hooks/useAxiosPublice";
import Swal from "sweetalert2";
import useProduct from "../../../Hooks/useProduct";
import { useParams } from "react-router-dom";



const PaymentSuscFrom = () => {
  const [secrectClient, setSecrectClient] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [shopeName,setShopName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const stripe = useStripe();
  const elements = useElements();

  const {id} = useParams();
const newPriceInfo = id.split('-');
const price = newPriceInfo[0];
const limited = newPriceInfo[1];
console.log(newPriceInfo);

  const useAxiouse = useAxiosPublice()
  const {isPending, error, data } = useProduct()

  useEffect(()=>{
    setUserEmail(data?.data[0].userEmail)
    setShopName(data?.data[0].shopeName)
    console.log(data?.data[0].shopeName);
    console.log(data?.data[0].userEmail);
  },[data?.data])

  useEffect(() => {
    const discountAndnormarlPrice = async () => {
        
      if (price > 0) {
        const getSecrectKey = await useAxiouse.post(
          "/create-payment-intent",
          { price: price }
        );
        setSecrectClient(getSecrectKey?.data?.clientSecret);
        console.log(getSecrectKey);
      }
    };
    discountAndnormarlPrice();
  }, [price,useAxiouse]);

  const handleSubmitepay = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("payment error", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
      });
    } else {
      console.log("payment method", paymentMethod);
    }
    // conformation client payment

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(secrectClient, {
        payment_method: {
          card: card,
          billing_details: {
            email: userEmail || "anonymous",
            name: shopeName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirmation error");
    } else {
      console.log("payment intent ", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Your payment Succesfully ${transactionId}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };


  const handlePremium = async () =>{

    const premiumInfo = { price,limited, shopeName: shopeName,userEmail:userEmail}
      
    const updatePremium = await useAxiouse.post('/suscription',premiumInfo)
    console.log(updatePremium);

  }



  return (
    <Container>
      <form
        onSubmit={handleSubmitepay}
        className="max-w-2xl mx-auto bg-white p-8 mt-8 rounded-lg shadow-md"
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          onClick={handlePremium}
          className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Pay Now
        </button>
      </form>
    </Container>
  );
};

export default PaymentSuscFrom;

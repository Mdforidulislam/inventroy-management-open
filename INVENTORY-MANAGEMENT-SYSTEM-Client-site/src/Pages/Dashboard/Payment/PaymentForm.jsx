import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Container from "../../../ShareComponent/Container/Container";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";


import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet";


const generatePdf = async () => {
    const input = document.getElementById('pdf-content');
  
    if (input) {
      const canvas = await html2canvas(input);
      const pdf = new jsPDF({ unit: 'px', format: 'a4' });
  
      const imgData = canvas.toDataURL('image/png', 1.0);
      pdf.addImage(imgData, 'JPEG', 0, 0);
  
      pdf.save('document.pdf');
    }
  };



const PaymentForm = () => {
    const [error, setError] = useState('')
    const [secrectClient,setSecrectClient] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const [shopeName,setShopeName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [amount,setAmount] = useState(0)
    const [seling,setSeling] = useState(0)
    const [isActive,setIsActive] = useState(false)
    const [productName,setproductName] = useState('')
    const [profit,setProfit] = useState(0)
    const [image, setImage] = useState('')

    const stripe = useStripe();
    const elements = useElements();
    const axiosPublice = useAxiosSecure()

    const {id} = useParams()

    // condtion for discount 

    let price; 
    if (!isActive) {
        price = amount
    }else{
        price = seling;
    }

   console.log(price,isActive,seling,amount);
   
    useEffect(()=>{
        const discountAndnormarlPrice = async () =>{
        const productInfo = await axiosPublice.get(`/prodctoffnormal/${id}`)
        console.log(productInfo,'inside the product');
        setAmount(parseInt(productInfo?.data?.discounInfo?.discountedPrice))
        setIsActive(productInfo?.data?.discounInfo?.discounted)
        setShopeName(productInfo?.data?.product?.shopeName)
        setUserEmail(productInfo?.data?.product?.userEmail)
        setSeling(productInfo?.data?.product?.sellingPrice)
        setproductName(productInfo?.data?.product?.productName)
        setProfit(productInfo?.data?.product?.profit)
        setImage(productInfo?.data?.product?.photoImage)

        if (price > 0) {
            const getSecrectKey = await axiosPublice.post('/create-payment-intent',{price:price})
            setSecrectClient(getSecrectKey?.data?.clientSecret)
            console.log(getSecrectKey);
        }
        }
        discountAndnormarlPrice()
    },[axiosPublice,id,price])
console.log(amount,shopeName,userEmail);
    

    

    const handleSubmitepay =  async(event) =>{
        event.preventDefault()
        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log('payment error', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error.message}`,
              });
            setError(error.message)
        }else{
            console.log('payment method', paymentMethod);
            setError('')
        }
        // conformation client payment 

        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(secrectClient,{
            payment_method:{
                card: card,
                billing_details:{
                    email: userEmail || 'anonymous',
                    name: shopeName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirmation error');
        } else{
            console.log('payment intent ', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id)

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your payment Succesfully",
                    showConfirmButton: false,
                    timer: 1500
                  });

                const currentDate = new Date();
                const formattedDate = currentDate.toISOString();
                //now save data to database 
                const productPayment = {
                    transactionId: paymentIntent.id,
                    shopeName: shopeName,
                    userEmail: userEmail,
                    amount : amount,
                    seling : seling,
                    productName: productName,
                    profit: profit,
                    image: image,
                    formattedDate: formattedDate
                }

            const salesCollection = await axiosPublice.post(`/salescollection/${id}`,productPayment)

            console.log(salesCollection);

            }
        }

        
    }

    return (
        <Container>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Dashboard || Payment </title>
            </Helmet>
    <div id="pdf-content" style={{ textAlign: 'center', margin: 'auto' }} className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center mb-8">
          <img
            className="w-48 h-48 object-cover rounded-2xl"
            src={image}
            alt="Product Image"
          />
        </div>
        <div className="flex space-y-4">
          <div className="flex-1">
            <h1 className="text-lg font-bold mb-2">Transaction Details</h1>
            <p>Your Transaction Id: {transactionId}</p>
            <p>Selling Price: ${seling}</p>
            <p>Discount Price: ${parseInt(seling - amount)}</p>
            <p>Total Cost: ${amount}</p>
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-bold mb-2">Product Information</h1>
            <p>Product Name: {productName}</p>
            <p>Shop Name: {shopeName}</p>
            <p>Product Id: {id}</p>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmitepay} className="max-w-2xl mx-auto bg-white p-8 mt-8 rounded-lg shadow-md">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button
          type="submit"
          onClick={generatePdf}
          className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Pay Now
        </button>
      </form>
    </div>
        </Container>
    );
};

export default PaymentForm;
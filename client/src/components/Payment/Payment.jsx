import React from 'react';
import {loadStripe} from '@stripe/stripe-js'
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import axios from 'axios';
import { useState } from 'react';
import "bootswatch/dist/minty/bootstrap.min.css";

const stripePromise = loadStripe('pk_test_51N9XymIq7GOKCNm5iFH4SEZraHWThEQFl2O0KLHWV3EJxMg1qpXrBYEnF9eTrB2iH6PqGF5diYda3oAwaDWpvbmw007FP4VzVf');

const CheckOutForm = () => {

    const stripe =useStripe();   
    const elements = useElements();
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

       const {error, paymentMethod} = await stripe.createPaymentMethod({
            type:'card',
            card: elements.getElement(CardElement)
        });

        setLoading(true);

        if(!error) {
            const {id} = paymentMethod;

            try {
               const{data} = await axios.post('http://localhost:3002/api/checkout', {
                    id,
                    amount: 10000
                });

                console.log(data);

                elements.getElement(CardElement).clear(); 
            } catch (error) {
                console.log(error);
            }

            setLoading(false);            
        }
        
    }

    return <form onSubmit={handleSubmit} className="card card-body" >
        <img src='https://w7.pngwing.com/pngs/280/68/png-transparent-torta-birthday-cake-cake-wish-food-photography.png' alt='Facturas' className='img-fluid'/>

        <h3 className='text-center my-2'>Precio: 100$</h3>

    <div className="form-group">
        <CardElement className='form-control'/>
    </div>
        
        <button className='btn btn-success' disabled={!stripe} >
            {loading ? (
                <div class="spinner-border text-light" role="status">
                <span class="sr-only"></span>
              </div>
            ): 'Comprar'}
        </button>
    </form>
}

function Payment(){
    return (
    <Elements stripe = {stripePromise}>
        <div className='container p-4'>
            <div className='row'>
                <div className='col-md-4 offset-md-4'>
                    <CheckOutForm/>
                </div>
            </div>
        </div>
    </Elements>
    )   
}


export default Payment;
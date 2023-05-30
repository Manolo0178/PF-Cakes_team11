import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "bootswatch/dist/minty/bootstrap.min.css";

const stripePromise = loadStripe('pk_test_51NAMXNJW5R242vXYwgPwoEcVTUaSoulVuqOJ4ECoOpdvXB3CU7yIF5TQ5LAK7NpbByw5ItQUKVwJjmQsQiGxpQuz00KeK0Deyt');

const CheckOutForm = ({ total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();


    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    setLoading(true);

    if (!error) {
      const { id } = paymentMethod;

      try {
        const { data } = await axios.post('http://localhost:3001/api/checkout', {
          id,
          amount: parseInt(total) * 100, // Convertir el monto total a centavos
        });

        console.log(data);

        elements.getElement(CardElement).clear();
        
        // Mostrar el mensaje de alerta y redirigir al usuario a la página de inicio
        alert('Se agradece por su compra');
        setLoading(false);
        navigate('/home'); // Ajusta la ruta de la página de inicio según corresponda
      } catch (error) {
        console.log(error);
        setLoading(false);
      }

    }
  };

  return (
    <form onSubmit={handleSubmit} className="card card-body">
      <img src="https://w7.pngwing.com/pngs/456/971/png-transparent-credit-card-business-payment-loan-service-payment-method-text-rectangle-service-thumbnail.png" alt="Facturas" className="img-fluid" />

      <h3 className="text-center my-2">Precio: ${total}</h3> {/* Mostrar el monto total en la interfaz de usuario */}

      <div className="form-group">
        <CardElement className="form-control" />
      </div>

      <button className="btn btn-success" disabled={!stripe}>
        {loading ? (
          <div className="spinner-border text-light" role="status">
            <span className="sr-only"></span>
          </div>
        ) : (
          'Comprar'
        )}
      </button>
    </form>
  );
};

function Payment() {
  const { total } = useParams();

  return (
    <Elements stripe={stripePromise}>
      <div className="container p-4">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <CheckOutForm total={total} />
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default Payment;
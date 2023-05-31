import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import styles from './payment.module.css';
import { emptyCart } from '../../redux/actions';
import { useDispatch } from 'react-redux';

const stripePromise = loadStripe('pk_test_51NAMXNJW5R242vXYwgPwoEcVTUaSoulVuqOJ4ECoOpdvXB3CU7yIF5TQ5LAK7NpbByw5ItQUKVwJjmQsQiGxpQuz00KeK0Deyt');

const CheckOutForm = ({ total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        if(data.message === 'Successful Payment')
        {
          console.log(true)
        }
      

        elements.getElement(CardElement).clear();

        // Mostrar el mensaje de alerta y redirigir al usuario a la página de inicio
        alert('Muchas gracias por su compra');
        dispatch(emptyCart());
        setLoading(false);
        navigate('/home'); // Ajusta la ruta de la página de inicio según corresponda
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`card card-body ${styles.card}`}>
      <h2 className={`text-center mb-4 ${styles.title}`}>Ingresar datos de la tarjeta :</h2>

      <div className="image-container">
        <img src="https://www.pngitem.com/pimgs/m/576-5767283_tarjeta-credito-clasica-banco-de-comercio-hd-png.png" alt="Logo" className={`img-fluid ${styles.logo}`} />
      </div>

      <div className="form-group">
        <CardElement className={`form-control ${styles.cardElement}`} options={{ style: { base: { fontSize: '16px' } } }} />
      </div>

      <h3 className={`text-center mt-4 ${styles.price}`}>Precio: ${total}</h3>

      <div className={styles.buttonContainer}>
        <div>
          <button type="submit" className={`btn btn-success ${styles.buyButton}`} disabled={!stripe}>
            {loading ? (
              <div className="spinner-border text-light" role="status">
                <span className="sr-only"></span>
              </div>
            ) : (
              'Pagar'
            )}
          </button>
        </div>
        <div className={styles.separatorContainer}>
          <span className={styles.separator}>o</span>
        </div>
        <div>
          <Link to="/Products" className={`btn btn-primary ${styles.backButton}`}>Volver</Link>
        </div>
      </div>
    </form>
  );
};

function Payment() {
  const { total } = useParams();

  return (
    <Elements stripe={stripePromise}>
      <div className={`container ${styles.container}`}>
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <CheckOutForm total={total} />
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default Payment;
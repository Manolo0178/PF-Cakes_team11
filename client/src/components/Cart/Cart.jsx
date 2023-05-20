import React, { useState, useEffect } from 'react';
import 'boxicons';
import style from './Cart.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../../redux/actions';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const Cart = ({ isOpen, toggleCart }) => {
  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const [removedItemId, setRemovedItemId] = useState(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const calculateTotal = () => {
    return cartItems.reduce((accumulator, item) => {
      if (typeof item.price === 'number') {
        return accumulator + item.price * item.quantity;
      }
      return accumulator;
    }, 0);
  };
  const total = calculateTotal();

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
    setRemovedItemId(itemId);
    setShowAlert(true);
  };

  const handleIncreaseQuantity = (itemId) => {
    dispatch(increaseQuantity(itemId));
  };

  const handleDecreaseQuantity = (itemId) => {
    dispatch(decreaseQuantity(itemId));
  };

  const handlePayment = (token) => {
    axios
      .post('/api/pago', { token, amount: total })
      .then(response => {
        setPaymentCompleted(true);
      })
      .catch(error => {
        console.error(error);
        // Aquí puedes mostrar un mensaje de error
      });
  };

  const handleAlertClose = () => {
    setShowAlert(false);
    setRemovedItemId(null);
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
        setRemovedItemId(null);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showAlert]);

  if (!isOpen) {
    return null;
  }

  if (paymentCompleted) {
    return (
      <div className={`${style.carritos} ${style.show}`}>
        <div className={`${style.carrito} ${style.show}`}>
          <h2>Pago completado</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={`${style.carritos} ${style.show}`}>
      <div className={`${style.carrito} ${style.show}`}>
        <div className={`${style['carrito__close']} ${style.boxIcon}`} onClick={toggleCart}>
          <box-icon name="exit" size="md"></box-icon>
        </div>
        <h2>Su carrito</h2>
        <div className={style.carrito__center}>
          {cartItems.map((item) => (
            <div className={style.carrito__item} key={item.id}>
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p className={`${style.price}`}>${item.price}</p>
              </div>
              <div>
                <box-icon type='solid' name='upvote' onClick={() => handleIncreaseQuantity(item.id)}></box-icon>
                <p className={`${style.cantidad}`}>{item.quantity}</p>
                <box-icon type='solid' name='downvote' onClick={() => handleDecreaseQuantity(item.id)}></box-icon>
              </div>
              <div className={style.remove__item} onClick={() => handleRemoveItem(item.id)}>
                <box-icon name="trash"></box-icon>
              </div>
            </div>
          ))}
        </div>
        <div className={style.carrito__footer}>
          <h3>Total: ${total}</h3>
          <StripeCheckout
            token={handlePayment}
            amount={total * 100} // El monto se especifica en centavos
            currency="USD"
            stripeKey="TU_CLAVE_PUBLICA_STRIPE"
          >
            <button className={style.btnn}>Pagar</button>
          </StripeCheckout>
        </div>
      </div>
      <Alert
        variant="danger"
        show={showAlert && removedItemId !== null}
        onClose={handleAlertClose}
        dismissible
      >
        Elemento eliminado del carrito
      </Alert>
    </div>
  );
};

export default Cart;
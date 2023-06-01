import React, { useState, useEffect } from 'react';
import 'boxicons';
import style from './Cart.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity,emptyCart, getCart } from '../../redux/actions';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
import axios from "axios";

const Cart = ({ isOpen, toggleCart, total }) => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const [removedItemId, setRemovedItemId] = useState(null);

  useEffect(() => {
    if (token) {
      dispatch(getCart(userId));
    }
  }, []);



  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId, userId));
    console.log(cartItems)
    setRemovedItemId(itemId);
    setShowAlert(true);
    dispatch(getCart(userId))

    if (cartItems.length === 1) {
      dispatch(emptyCart())
    }
    
  };


  const handleIncreaseQuantity = (e,itemId, quantity) => {
    e.preventDefault();
    dispatch(increaseQuantity(itemId, userId, quantity+1));
    dispatch(getCart(userId));
  };

  const handleDecreaseQuantity = (itemId, quantity) => {
    if (quantity > 1) { 
      dispatch(decreaseQuantity(itemId, userId, quantity-1));
      dispatch(getCart(userId));
    }
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

  return (
    <div className={`${style.carritos} ${style.show}`}>
      <div className={`${style.carrito} ${style.show}`}>
        <div
          className={`${style["carrito__close"]} ${style.boxIcon}`}
          onClick={toggleCart}
        >
          <box-icon name="exit" size="md"></box-icon>
        </div>
        <h2>Su carrito</h2>
        <div className={style.carrito__center}>
          {!cartItems.length && <p>No hay productos agregados</p>}
          {cartItems.length &&
            cartItems?.map((item) => (
              <div className={style.carrito__item} key={item.id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p className={`${style.price}`}>${item.price}</p>
                </div>
                <div>
                  <box-icon
                    type="solid"
                    name="upvote"
                    onClick={(e) =>
                      handleIncreaseQuantity(e,item.id, item.orderItem.quantity)
                    }
                  ></box-icon>
                  <p className={`${style.cantidad}`}>
                    {item.orderItem.quantity}
                  </p>
                  <box-icon
                    type="solid"
                    name="downvote"
                    onClick={() =>
                      handleDecreaseQuantity(item.id, item.orderItem.quantity)
                    }
                  ></box-icon>
                </div>
                <div
                  className={style.remove__item}
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <box-icon name="trash"></box-icon>
                </div>
              </div>
            ))}
        </div>
        <div className={style.carrito__footer}>
          <h3>Total: ${total}</h3>
          <Link to={token ? `/payment/${total}` : "/login"}>
            <button className={style.btnn}>Pagar</button>
          </Link>
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
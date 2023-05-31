import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { MdOutlineLocalGroceryStore } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { useDispatch } from 'react-redux';
import { getUserData } from '../../redux/actions';
import styles from './Navbar.module.css';

import Cart from '../Cart/Cart';

function NavBar() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const storedToken = localStorage.getItem('token');
  const id = localStorage.getItem("userId");
  const [cartVisible, setCartVisible] = useState(false);
  const cartItems = useSelector((state) => state.cartItems);
  const cartItemCount = cartItems.length;
  const { userData } = useSelector((state) => state);


  useEffect(() => {
    if (!Object.keys(userData).length) {
      dispatch(getUserData(storedToken, id));
    }
  },[dispatch, userData])

  const toggleCart = () => {
    setCartVisible((prevVisible) => !prevVisible);
  };

  const calculateTotal = () => {
    if (cartItems.length) {
      return cartItems.reduce((accumulator, item) => {
        if (typeof item.price === "number") {
          return accumulator + item.price * item.orderItem.quantity;
        }
        return accumulator;
      }, 0);
    }
    return 0
  };

  const total = calculateTotal()




  const logoutButton = (e) => {
    e.preventDefault()
    Swal.fire({
      title: '¿Estás seguro de querer salir?',
      icon: 'question',
      confirmButtonText: 'Ok',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        navigate('/home');

      }
    });
  };


  return (
    <Navbar expand="lg" className={styles.navBarCont}>
      <Container className={styles.cont}>
        <Navbar.Brand as={Link} to="/" className={styles.logoCont}>
          <img
            className="navbar-brand"
            src="https://github.com/Manolo0178/PF-Cakes_team11/raw/main/cake.png"
            width="90px"
            alt="logo"
          />
        </Navbar.Brand>

        <SearchBar />

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className={styles.linksCont}>
          <Nav className={styles.linkCont}>
            <Nav.Link as={Link} to="/home" className={styles.link}>
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/products" className={styles.link}>
              Productos
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className={styles.link}>
              Sobre Nosotros
            </Nav.Link>
            <Nav.Link as={Link} to="/create" className={styles.link}>
              Crear Postre
            </Nav.Link>
            {storedToken ? (
              <Nav.Link
                as={Link}
                to="/favoritos"
                className={styles.link}
                style={{ display: "flex" }}
              >
                <div>
                  <div className={styles.imgCont}>
                    <img src={userData.image} alt="" />
                  </div>
                  {userData.name}
                </div>
                <div>
                  <button onClick={(e) => logoutButton(e)}>Salir</button>
                </div>
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login" className={styles.link}>
                Ingresá
              </Nav.Link>
            )}
            <OverlayTrigger
              placement="bottom"
              overlay={
                <div className={`${styles.cartPanel} cartPanel`}>
                  <p></p>
                  <h5 className={styles.h5}>Resumen del Carrito</h5>
                  <ul>
                    {cartItems.map((item) => (
                      <li key={item.id}>
                        <div className={`${styles.cartItem} cartItemImage`}>
                          <img src={item.image} alt={item.name} width="100px" />
                          <div className={styles.itemDetails}>
                            <h7 className={styles.h7}>{item.name}</h7>
                            <p></p>
                            <h6 className={styles.h6}>
                              Cantidad: {item.quantity}
                            </h6>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <h5 className={styles.h5}>Total: ${total}</h5>
                </div>
              }
            >
              <Nav.Link className={styles.link} onClick={toggleCart}>
                <MdOutlineLocalGroceryStore color="white" size="1.8rem" />
                {cartItemCount > 0 && (
                  <span className={styles.cartItemCount}>{cartItemCount}</span>
                )}
              </Nav.Link>
            </OverlayTrigger>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Cart
        isOpen={cartVisible}
        toggleCart={toggleCart}
        total={total}
      />
    </Navbar>
  );
}

export default NavBar;
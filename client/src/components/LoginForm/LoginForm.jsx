import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';
import GoogleLogin from 'react-google-login';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { FacebookLoginButton } from 'react-social-login-buttons';
import { gapi } from 'gapi-script';
import styles from './LoginForm.module.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberSession, setRememberSession] = useState(false);

  const clientID = '781787972829-6oaasrp4vfoe34t3fkbd02bqv1vpktjm.apps.googleusercontent.com';

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: clientID,
      });
    };
    gapi.load('client:auth2', start);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/user/login', { email, password });
      const { token, id: userId } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      navigate('/home');
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleRememberSessionChange = () => {
    setRememberSession(!rememberSession);
  };

  const onSuccess = async (response) => {
    const token = response.accessToken;
    localStorage.setItem('token', token);

    const user = {
      name: response.profileObj.givenName,
      email: response.profileObj.email,
      lastName: response.profileObj.familyName,
      googleId: response.googleId,
    };

    try {
      const res = await axios.post('http://localhost:3001/user/create', user);
      if (res.data.success) {
        const id = res.data.id;
        localStorage.setItem('userId', id);
        navigate('/home');
      }
    } catch (error) {
      console.log('Error al crear el usuario:', error);
    }
  };

  const onFailure = () => {
    console.log('Lo sentimos, ocurrió un fallo');
  };

  const onSuccessFacebook = async (response) => {
    const token = response.accessToken;
    localStorage.setItem('token', token);

    const user = {
      name: response.name,
      email: response.email,
      facebookId: response.id,
    };

    try {
      const res = await axios.post('http://localhost:3001/create', user);
      if (res.data.success) {
        const id = res.data.id;
        localStorage.setItem('userId', id);
        navigate('/home');
      }
    } catch (error) {
      console.log('Error al crear el usuario:', error);
      navigate('/home');
    }
  };

  const onFailureFacebook = (error) => {
    console.log('Error al iniciar sesión con Facebook:', error);
  };

  return (
    <form className={styles.loginCont} onSubmit={handleLogin}>
      <h1>Iniciar sesión</h1>
      <div className={styles.inputCont}>
        {error && <p>{error}</p>}
        <div className={styles.emailCont}>
          <label>Email: </label>
          <input
            type="text"
            placeholder="Email"
            className={styles.input}
            name="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.emailCont}>
          <label>Contraseña: </label>
          <input
            type="password"
            placeholder="Contraseña"
            className={styles.input}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.forgotPassword}>
          <Link to="/login/enviarMail">
            <p>¿Olvidaste tu contraseña?</p>
          </Link>
        </div>
      </div>
      <div className={styles.loginElse}>
        <div>
          <LoginSocialFacebook
            appId="2731500723659290"
            onResolve={onSuccessFacebook}
            onReject={onFailureFacebook}
          >
            <FacebookLoginButton onClick={onSuccessFacebook} />
          </LoginSocialFacebook>
        </div>

        <div>
          <GoogleLogin
            clientId={clientID}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy="single_host_policy"
          />
        </div>
      </div>
      <div className={styles.checkbox}>
        <input
          type="checkbox"
          name="rememberSession"
          checked={rememberSession}
          onChange={handleRememberSessionChange}
        />
        <label htmlFor="">Permanecer conectado</label>
      </div>
      <Button variant="primary" type="submit">
        Login
      </Button>{' '}
      <div className={styles.links}>
        <p>No puedes iniciar sesión?</p>
        <Link to="/createUser">Crear cuenta</Link>
      </div>
    </form>
  );
};

export default LoginForm;
// email = profileObj.email
// surName = profileObj.familyName
// name = profileObj.givenName
// image = profileObj.imageUrl
// googleId
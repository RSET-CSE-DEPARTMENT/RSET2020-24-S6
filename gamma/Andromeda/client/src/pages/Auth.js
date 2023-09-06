import React from 'react';
import '../styles/Auth.css';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
function Auth() {
  useEffect(() => {
    localStorage.setItem('isLoggedIn', false);
    localStorage.setItem('loggedUser', 'guest');
  }, []);
  let navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(true);
  const phoneField = useRef(null);
  const emailField = useRef(null);
  const addressField = useRef(null);
  const usernameField = useRef(null);
  const passwordField = useRef(null);
  const nationalityField = useRef(null);
  const ageField = useRef(null);
  const genderField = useRef(null);
  const [nameError, setnameError] = useState('');
  const [passwordError, setpasswordError] = useState('');
  const [text, setText] = useState('');
  const fullText = 'If not here,then where?';

  useEffect(() => {
    const interval = setInterval(() => {
      setText((prevText) => {
        if (prevText === fullText) {
          clearInterval(interval);
          return fullText;
        }
        return fullText.slice(0, prevText.length + 1);
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  async function sendRegistrationForm(event) {
    event.preventDefault();
    let username;
    let email;
    let password;
    let phone;
    let address;
    let national;
    let age;
    let gender;
    username = usernameField.current.value;
    email = emailField.current.value;
    phone = phoneField.current.value;
    address = addressField.current.value;
    password = passwordField.current.value;
    national = nationalityField.current.value;
    age = ageField.current.value;
    gender = genderField.current.value;
    let data;

    // https://en.wikipedia.org/wiki/Regular_expression
    const phoneNumberPattern = /^\d{10}$/;
    // https://stackoverflow.com/questions/25286239/matching-exactly-10-digits-in-javascript

    const emailPattern = // eslint-disable-next-line
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    /*http://jsfiddle.net/ghvj4gy9/
    https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
    */
    phone = phoneField.current.value.trim();
    email = emailField.current.value.trim();

    if (!phoneNumberPattern.test(phone)) {
      alert('Please enter a valid phone number');
    } else if (!emailPattern.test(email)) {
      alert('Please enter a valid email address');
    } else {
      data = {
        name: username,
        phone: phone,
        email: email,
        address: address,
        password: password,
        nationality: national,
        age: age,
        gender: gender,
      };

      try {
        const response = await api.post(`/auth/register`, data);
        if (response.status === 200) {
          setText('');
          setIsRegistered(true);
          console.log('Form data:\n', data);
          console.log('\nResponse : ', response);
          console.log('Successfully sent data');
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function sendLoginForm(event) {
    event.preventDefault();
    let username;
    let password;
    username = usernameField.current.value;
    password = passwordField.current.value;
    let data;

    data = {
      name: username,
      password: password,
    };
    if (username.length === 0 && password.length === 0) {
      setnameError('Enter a valid username!');
      setpasswordError('Enter a valid password!');
      return;
    }
    if (username.length === 0) {
      setnameError('Enter a valid username!');
      return;
    }
    if (password.length === 0) {
      setpasswordError('Enter a valid password!');
      return;
    }

    try {
      const response = await api.post(`/auth/login`, data);
      if (response.data.name === 'User not found') {
        alert('User not found!');
      } else if (response.data.name === 'Wrong password') {
        alert('Wrong password!');
      } else if (response.data.name === data.name) {
        setIsRegistered(true);
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('loggedUser', data.name);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }

  return (
    <div className='login-container'>
      <div className='top-container'>
        <div className='left-container'>
          {!isRegistered && (
            <>
              <div className='app-name'>ShopHere </div>
              <div className='app-description'>Join us Now!</div>
            </>
          )}
          {isRegistered && (
            <>
              <div className='app-name'>ShopHere </div>
            </>
          )}
        </div>
        {!isRegistered && (
          <div className='right-container'>
            <form
              className='form'
              onSubmit={sendRegistrationForm}
              autoComplete='off'
            >
              <div className='form-fields-container'>
                <div className='label-container'>
                  <label htmlFor='Username'>Username </label>
                  <label htmlFor='email'>Email </label>
                  <label htmlFor='phone'>Phone Number </label>
                  <label htmlFor='address'>Address </label>
                  <label htmlFor='password'>Password </label>
                  <label htmlFor='nationality'>Nationality </label>
                  <label htmlFor='nationality'>Age </label>
                  <label htmlFor='nationality'>Gender </label>
                </div>
                <div className='input-container'>
                  <input
                    type='text'
                    id='name'
                    className='auth-input'
                    name='name'
                    placeholder='    Name here'
                    autoComplete='off'
                    ref={usernameField}
                  />
                  <input
                    type='email'
                    id='email'
                    name='email'
                    className='auth-input'
                    placeholder='    shop@here.com'
                    autoComplete='off'
                    ref={emailField}
                  />

                  <input
                    type='tel'
                    id='phone'
                    name='phone'
                    placeholder='    9876543210'
                    className='auth-input'
                    autoComplete='off'
                    ref={phoneField}
                  />
                  <input
                    type='text'
                    id='address'
                    name='address'
                    placeholder='    Your Address'
                    className='auth-input'
                    autoComplete='off'
                    ref={addressField}
                  />
                  <input
                    type='password'
                    id='password'
                    name='password'
                    placeholder='    Password here'
                    className='auth-input'
                    autoComplete='off'
                    ref={passwordField}
                  />
                  <input
                    type='text'
                    id='nationality'
                    name='nationality'
                    placeholder='    Nationality here'
                    className='auth-input'
                    autoComplete='off'
                    ref={nationalityField}
                  />
                  <input
                    type='text'
                    id='age'
                    name='age'
                    placeholder='    Age here'
                    className='auth-input'
                    autoComplete='off'
                    ref={ageField}
                  />
                  <input
                    type='text'
                    id='gender'
                    name='gender'
                    placeholder='    Gender here'
                    className='auth-input'
                    autoComplete='off'
                    ref={genderField}
                  />
                </div>
              </div>
              <div className='buttons-login'>
                <button
                  type='button'
                  className='btn'
                  onClick={() => {
                    setIsRegistered(true);
                  }}
                >
                  Login
                </button>
                <button
                  type='submit'
                  className='btn'
                  onClick={() => {
                    setIsRegistered(false);
                  }}
                >
                  Signup
                </button>
              </div>
              <div className='link-to-reg'>
                Already a user ?{' '}
                <button
                  className='switch-form-link'
                  onClick={() => setIsRegistered(true)}
                >
                  Click here{' '}
                </button>
                to Login
              </div>
            </form>
          </div>
        )}
        {isRegistered && (
          <div className='right-container'>
            <form className='form' onSubmit={sendLoginForm} autoComplete='off'>
              <div className='form-fields-container'>
                <div className='label-container'>
                  <label htmlFor='Username' className='u-label'>
                    Username{' '}
                  </label>
                  <label htmlFor='password'>Password </label>
                </div>
                <div className='input-container'>
                  <input
                    type='text'
                    id='Username'
                    name='Username'
                    className='auth-input'
                    placeholder='    Username here'
                    autoComplete='off'
                    ref={usernameField}
                  />
                  <div className='Username-err-label'>{nameError}</div>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    className='auth-input'
                    placeholder='    Password here'
                    autoComplete='off'
                    ref={passwordField}
                  />
                  <div className='password-err-label'>{passwordError}</div>
                </div>
              </div>
              <div className='buttons-login'>
                <button type='submit' className='btn'>
                  Login
                </button>
                <button
                  type='button'
                  className='btn'
                  onClick={() => {
                    setIsRegistered(false);
                  }}
                >
                  Signup
                </button>
              </div>
              <div className='link-to-reg'>
                Not a user ?{' '}
                <button
                  className='switch-form-link'
                  onClick={() => setIsRegistered(false)}
                >
                  Click here{' '}
                </button>
                to register
              </div>
            </form>
          </div>
        )}
      </div>

      <div className='bottom-container'>
        {isRegistered && (
          <>
            <div className='logged-app-description'>{text}</div>
          </>
        )}
      </div>
    </div>
  );
}

export default Auth;

import React from 'react';
import { useEffect, useState } from 'react';
import CartLayout from './CartLayout';
import { api } from '../api';
import '../styles/Cart.css';
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import { Link } from 'react-router-dom';
function Cart() {
  let navigate = useNavigate();
  const [products, setProducts] = useState([{}]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const checkoutHandler = async (amount) => {
    const {
      data: { key },
    } = await api.get('api/getkey');

    const {
      data: { order },
    } = await api.post('api/checkout', { total });

    const options = {
      key,
      amount: total,
      currency: 'INR',
      name: 'ShopHere',
      image:
        'data:image/png;base64,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',
      order_id: order.id,
      handler: function (response) {
        var x = document.getElementById('alert');
        x.style.transform = 'scale(1)';
        x.style.position = 'fixed';
        x.style.left = '35vw';
        x.style.zIndex = '2000';
        x.style.top = '50vh';
        setTimeout(async () => {
          const sendIt = {
            username: localStorage.getItem('loggedUser'),
          };

          let curr_products = products;
          let model_params = {
            username: localStorage.getItem('loggedUser'),
            products: curr_products,
          };
          console.log(model_params)
          await api.put(`order/clear`, sendIt);
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(model_params),
          };
          fetch(`http://localhost:3002/order/model-updation`, requestOptions).then((response) => response.json()).then((data) => console.log(data))
          fetch(`http://localhost:3002/product/rating-updation`, requestOptions).then((response) => response.json()).then((data) => console.log(data))
          navigate(`/`);
        }, 100);
      },
      callback_url: 'http://localhost:3002/api/paymentverification',

      prefill: {
        name: localStorage.getItem('loggedUser'),
      },
      theme: {
        color: '#E1DC41',
        backdrop_color: '#000000',
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };

  async function getData() {
    try {
      setLoading(true);
      let curr_user = localStorage.getItem('loggedUser');
      const data = {
        username: curr_user,
      };
      const response = await api.put(`order/show`, data);
      setProducts(response.data.items);
      setTotal(response.data.total);
      setLoading(false);
    } catch (error) {
      setLoading(true);
      console.error(error);
    }
  }
  useEffect(() => {
    (async () => {
      await getData();
    })();
    return () => {};
  }, []);

  async function handleClearCart() {
    const data = {
      username: localStorage.getItem('loggedUser'),
    };
    const response = await api.put(`order/clear`, data);
    window.location.reload();
  }

  let stotal = total.toString();
  var lastThree = stotal.substring(stotal.length - 3);
  var otherNumbers = stotal.substring(0, stotal.length - 3);
  if (otherNumbers !== '') lastThree = ',' + lastThree;
  var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;

  function alertClose() {
    var close = document.getElementById('alert-closebtn');
    var div = close.parentElement;
    div.style.opacity = '0';
    setTimeout(function () {
      div.style.display = 'none';
    }, 600);
  }
  return (
    <>
      <Topbar />
      <div className='cart-container'>
        {' '}
        <div id='alert'>
          <span id='alert-closebtn' onClick={alertClose}>
            &times;
          </span>
          <strong>Your order has been placed successfully!</strong>
        </div>
        <div className='continue-shopping'>
          <Link to='/'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              fill='currentColor'
              className='bi bi-arrow-left'
              viewBox='0 0 16 16'
            >
              <path
                fillRule='evenodd'
                d='M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z'
              />
            </svg>
            <span className='continue-text'>Continue Shopping</span>
          </Link>
        </div>
        <h2>Shopping Cart</h2>
        {products.length === 0 ? (
          <div className='cart-empty'>
            <p>Your Cart is Currently Empty</p>
            <div className='start-shopping'>
              <Link to='/'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  fill='currentColor'
                  className='bi bi-arrow-left'
                  viewBox='0 0 16 16'
                >
                  <path
                    fillRule='evenodd'
                    d='M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z'
                  />
                </svg>
                <span>Start Shopping</span>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className='titles'>
              <h3 className='product-tittle'>Product</h3>
              <h3 className='price'>Price</h3>
              <h3 className='quantity'>Quantity</h3>
              <h3 className='total'>Total</h3>
            </div>
            {loading && <div className='loader'></div>}
            {!loading &&
              products.map((product) => {
                return <CartLayout text={product} key={product.id} />;
              })}
          </div>
        )}
        <div className='cart-summary'>
          <button className='clear-cart' onClick={handleClearCart}>
            Clear Cart
          </button>
          <div className='cart-checkout'>
            <div className='subtotal'>
              <span>SubTotal</span>
              <span className='amount'>₹{res}</span>
            </div>
            <p>Taxes and Shipping calculated at checkout</p>
            <button onClick={() => checkoutHandler(total)}>Check out</button>
            <div className='continue-shopping'>
              <Link to='/'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  fill='currentColor'
                  className='bi bi-arrow-left'
                  viewBox='0 0 16 16'
                >
                  <path
                    fillRule='evenodd'
                    d='M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z'
                  />
                </svg>
                <span className='continue-text'>Continue Shopping</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;

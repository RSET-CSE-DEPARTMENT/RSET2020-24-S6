import { useState, useEffect } from 'react';
import { api } from '../api';
import '../styles/Cart.css';

function CartLayout(props) {
  const { text } = props;
  let stotal = text.total.toString();
  var lastThree = stotal.substring(stotal.length - 3);
  var otherNumbers = stotal.substring(0, stotal.length - 3);
  if (otherNumbers !== '') lastThree = ',' + lastThree;
  var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;

  const [cartItems, setCartItems] = useState(null);
  const [cartLoading, setCartLoading] = useState(true);
  async function getCartData() {
    try {
      setCartLoading(true);
      let { data } = await api.get(`/product/${text.id}`);
      setCartItems(data);
      setCartLoading(false);
    } catch (e) {
      console.log(e);
      setCartLoading(true);
    }
  }
  useEffect(() => {
    (async () => {
      await getCartData();
    })();
    return () => {};
  },[]);

  async function handleRemoveFromCart() {
    const data = {
      id: text.id,
      username: localStorage.getItem('loggedUser'),
    };
    await api.put(`order/remove`, data);
    window.location.reload();
  }

  async function handleDecreaseCart() {
    const data = {
      id: text.id,
      username: localStorage.getItem('loggedUser'),
    };
    await api.put(`order/quantity/decrease`, data);
    window.location.reload();
  }

  async function handleIncreaseCart() {
    const data = {
      id: text.id,
      username: localStorage.getItem('loggedUser'),
    };
    await api.put(`order/quantity/increase`, data);
    window.location.reload();
  }

  return (
    <div className='cart-layout'>
      {!cartLoading && (
        <div className='cart-container'>
          <div className='cart-items'>
            <div className='cart-product'>
              <div className='cart-left'>
                <img src={cartItems.img} className='cart-product-image' alt='product'></img>

                <h3>{cartItems.name}</h3>
              </div>
            </div>
            <div className='car-product-price'>{cartItems.price}</div>
            <div className='cart-remove-container'>
              <div className='cart-product-quantity'>
                <button
                  className='cart-btn-dec'
                  onClick={() => handleDecreaseCart(cartItems)}
                >
                  -
                </button>
                <div className='count'>{text.quantity}</div>
                <button
                  className='cart-btn-inc'
                  onClick={() => handleIncreaseCart(cartItems)}
                >
                  +
                </button>
              </div>
              <button
                className='remove-from-cart'
                onClick={() => handleRemoveFromCart(cartItems)}
              >
                Remove
              </button>
            </div>

            <div className='cart-product-total-price'>₹{res}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartLayout;

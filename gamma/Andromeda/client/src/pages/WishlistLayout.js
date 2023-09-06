import { useState, useEffect} from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";

function WishlistLayout(props) {
    const navigate = useNavigate();
  const { text } = props;
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
  }, []);

//   async function handleRemoveFromCart() {
//     const data = {
//       id: text.id,
//       username: localStorage.getItem("loggedUser"),
//     };
//     const response = await api.put(`order/remove`, data);
//     window.location.reload();
//   }

  return (
    <div className="cart-layout">
      {!cartLoading && (
        <div className="cart-container">
          <div className="cart-items" onClick={() => {
                    navigate(`/product/${cartItems._id}`);
                  }} >
            <div className="cart-product">
              <div className="cart-left">
                <img src={cartItems.img} className="cart-product-image"></img>

                <h3>{cartItems.name}</h3>
              </div>
            </div>
            <div className="cart-remove-container">

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WishlistLayout;


/*              <button
                className="remove-from-cart"
                onClick={() => handleRemoveFromCart(cartItems)}
              >
                Remove
              </button>*/
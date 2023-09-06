import React from "react";
import Topbar from "../components/Topbar";
import { useEffect, useState } from "react";
import WishlistLayout from "./WishlistLayout";
import { api } from "../api";
import "../styles/Cart.css";
import { Link } from "react-router-dom";

function Wishlist() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([{}]);
  async function getData() {
    try {
      setLoading(true);
      let curr_user = localStorage.getItem("loggedUser");
      const data = {
        username: curr_user,
      };
      const response = await api.put(`order/wishlist/show`, data);
      console.log(data,response.data);
      setProducts(response.data.items);
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

  return (
    <div>
      <Topbar />
      {products.length===0? (
        <div className="cart-empty">
          <p>Your Cart is Currently Empty</p>
          <div className="start-shopping">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          {loading && <div className="loader"></div>}
          {!loading &&
            products.map((product) => {
              return <WishlistLayout text={product} key={product.id} />;
            })}
        </div>
      )}
    </div>
  );
}

export default Wishlist;

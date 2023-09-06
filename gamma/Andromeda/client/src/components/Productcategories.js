import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";
import "../styles/Productcategories.css";
import Topbar from "./Topbar";
import { useNavigate } from "react-router-dom";
import { AiTwotoneStar } from "react-icons/ai";

function Productcategories() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [products, setProduct] = useState(null);
  const [rated, setRated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function handleCartClick(id, price) {
    let curr_user = localStorage.getItem("loggedUser");
    if (curr_user === "guest") {
      alert("You must be logged in !");
      window.location = "http://localhost:3000/login";
    } else {
      let productPrice = 0;
      let len = price.length;
      for (let i = 0; i < len; i++) {
        if (price[i] >= "0" && price[i] <= "9") {
          productPrice = productPrice * 10 + parseInt(price[i]);
        }
      }
      const data = {
        id: id,
        number: 100,
        username: localStorage.getItem("loggedUser"),
        price: productPrice,
      };
      const response = await api.put(`order/cart`, data);
      window.location.replace("http://localhost:3000/cart");
    }
  }

  async function handleRemove(id, productname) {
    const data = {
      id: id,
      username: localStorage.getItem("loggedUser"),
    };
    console.log(data);
    const response = await api.put(`product/remove`, data);
    if (response.status === 200) {
      alert(productname + " removed successfully !");
    }
    window.location.reload();
  }

  //check if logged in as admin
  let isAdmin = localStorage.getItem("loggedUser") === "admin";

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data } = await api.get(`/product/category/${category}`);
      setProduct(data);
      setIsLoading(false);
    })();

    return () => {
      setProduct(null);
      setIsLoading(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleWishClick(id, price,productname) {
    let curr_user = localStorage.getItem("loggedUser");
    if (curr_user === "guest") {
      alert("You must be logged in !");
      window.location = "http://localhost:3000/login";
    } else {
      let productPrice = 0;
      let len = price.length;
      for (let i = 0; i < len; i++) {
        if (price[i] >= "0" && price[i] <= "9") {
          productPrice = productPrice * 10 + parseInt(price[i]);
        }
      }
      const data = {
        id: id,
        username: localStorage.getItem("loggedUser"),
        price: productPrice
      };
      const response = await api.put(`order/wishlist`, data);
      if(response.product==="found")
        alert(productname+" already in wishlist!");
      else alert(productname+" added successfully!")
      window.location.replace("http://localhost:3000/wishlist");
    }
  }

  let avgRating = 0;
  let num = 0;
  function displayRating(product) {
    avgRating = 0;
    num = 0;
    product.rating.map((rate) => {
      avgRating += parseFloat(rate.rating);
      num = num + 1;
      if (!rated) {
        setRated(true);
      }
    });

    if (product.rating.length === 0) {
      return "No reviews yet";
    }
    return parseInt((avgRating / num) * 100) / 100;
  }

  return (
    <>
      <Topbar />
      <div className="categories-container">
        <div className="category-container">
          {isLoading && <div className="loader"></div>}
          {!isLoading &&
            products.map((product) => (
              <div className="individual-product-container" key={product._id}>
                <div
                  onClick={() => {
                    navigate(`/product/${product._id}`);
                  }}
                  className="clickable-div"
                >
                  <div className="img-container">
                    <div className="individual-product-image-container">
                      <img
                        src={product.img}
                        className="individual-product-image"
                        alt="productimage"
                      ></img>
                    </div>
                  </div>
                  <div className="individual-text-container">
                    <div className="individual-name">
                      <h2>{product.name}</h2>
                    </div>
                    <div className="individual-price">
                      <h3>{product.price}</h3>
                    </div>
                    <div className="individual-rating">
                      <span>
                        Rating: {displayRating(product)}{" "}
                        {rated && <AiTwotoneStar />}
                      </span>
                    </div>
                  </div>
                </div>
                {!isAdmin && (
                  <div className="cart-button-container">
                    <button
                      className="cart-button primary-btn"
                      onClick={() => {
                        handleCartClick(product._id, product.price);
                      }}
                    >
                      Add to cart
                    </button>
                    <button
                      className="wish-button primary-btn"
                      onClick={() => {
                        handleWishClick(product._id, product.price,product.name);
                      }}
                    >
                      Add to Wishlist
                    </button>
                  </div>
                )}

                {isAdmin && (
                  <div className="cart-button-container">
                    <button
                      className="cart-button primary-btn"
                      onClick={() => {
                        handleRemove(product._id, product.name);
                      }}
                    >
                      Remove product
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Productcategories;

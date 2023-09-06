import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiTwotoneStar } from "react-icons/ai";
import RatingStars from "../components/RatingStars";
import { api } from "../api";
import "../styles/IndividualProduct.css";
import Rating from "./Rating";
import { animateScroll as scroll } from "react-scroll";
import { VscDebugBreakpointLog } from "react-icons/vsc";
function IndividualProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [rated, setRated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [review, setReview] = useState("");
  let curr_user = localStorage.getItem("loggedUser");
  async function handleRemove(id) {
    const data = {
      id: id,
      username: localStorage.getItem("loggedUser"),
    };
    const response = await api.put(`product/remove`, data);
    if(response.status === 200){
      alert(product.name+" removed successfully !");
    }
    window.location.replace("http://localhost:3000");
  }
  async function handleCartClick(id, price) {
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
      console.log(data);
      const response = await api.put(`order/cart`, data);
    }
  }

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data } = await api.get(`/product/${id}`);
      setProduct(data);
      setIsLoading(false);
    })();
  }, []);

  let avgRating = 0;
  let num = 0;
  function getRating(product) {
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

  const storeReview = () => {
    const data = {
      newreview: review,
    };
    const response = api.put(`/product/${id}/review`, data);
  };

  const updateReview = (e) => {
    setReview(e.target.value);
  };
  const scrollToReviews = () => {
    const element = document.getElementById("ind-rev-cont");
    scroll.scrollTo(element.offsetTop);
  };
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
  return (
    <>
      {isLoading && <div className="loader"></div>}
      {product && (
        <div className="ind-pro-cont">
          <div className="ind-image-specs">
            <div className="ind-img-cont">
              <img
                src={product.img}
                alt="Product IMG"
                className="ind-pro-img"
              />
            </div>
            <div className="ind-specs-cont">
              <div className="ind-pro-name">
                <h1>{product.name}</h1>{" "}
                <div className="separate-rr-cont">
                  <div className="separate-ratings">
                    {product.rating.length} ratings
                  </div>
                  <div style={{ padding: "0px 10px" }}>and</div>
                  <div className="separate-reviews" onClick={scrollToReviews}>
                    {product.reviews.length} reviews
                  </div>
                </div>
              </div>
              <div className="ind-specs-content-cont">
                <div className="ind-text-cont">
                  <div className="separate-hl">
                    <h2 className="hl-header">Specifications</h2>
                    {product.highlights.map((highlight, i) => (
                      <div className="separate-highlights" key={i}>
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div></div>
          </div>
          <div className="btn-rev-cont">
            <div>
              {curr_user !== "admin" && (
                <>
                <button
                  className="cart-button primary-btn"
                  onClick={() => {
                    handleCartClick(product._id, product.price);
                  }}
                >
                  Add to cart
                </button>   <button
                      className="wish-button primary-btn"
                      onClick={() => {
                        handleWishClick(product._id, product.price,product.name);
                      }}
                    >
                      Add to Wishlist
                    </button></>
              )}
              {curr_user === "admin" && (
                <div className="cart-button-container">
                  <button
                    className="cart-button primary-btn"
                    onClick={() => {
                      handleRemove(product._id);
                    }}
                  >
                    Remove product
                  </button>
                </div>
              )}
            </div>
            <div className="rating-text">
              {getRating(product)} {rated && <AiTwotoneStar />}
            </div>
          </div>
          {product && (
            <div>
              <div className="rating-section">
                <RatingStars />
              </div>
            </div>
          )}
          <div className="rev-container">
            <h1 className="rev-review-text">Write a review : </h1>
            <textarea
              className="review-textarea"
              onChange={updateReview}
            ></textarea>
          </div>
          <button className="review-button" onClick={storeReview}>
            Submit
          </button>
          <h1 className="review-text-header">Reviews</h1>
          <div id="ind-rev-cont">
            {product.reviews.map((review) => {
              return (
                <div key={review.length} className="ind-review">
                  <div className="review-ind-cont">
                    <VscDebugBreakpointLog size="30" className="bullet-icon" />
                    <div className="ind-rev-text-wrap">{review}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default IndividualProduct;

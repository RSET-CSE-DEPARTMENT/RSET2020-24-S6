import "../styles/FeaturedProductBox.css";
import { useNavigate } from "react-router-dom";
// https://www.geeksforgeeks.org/how-to-create-image-slider-in-reacts/
function FeaturedProductBox(props) {
  const { text } = props;
  const navigate = useNavigate();
  return (
    <div className="featured-product-box" id="featured-products" 
    onClick={() => {
      navigate(`/product/${text._id}`);
    }}>
      <div className="featured-image-container">
        <img
          src={text.img}
          alt="Product IMG"
        />
      </div>
      <div className="featured-text-container">
        <h2>{text.name}</h2>
        <div className="featured-card-content">
          <div className="featured-flex">
            <p> {text.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedProductBox;

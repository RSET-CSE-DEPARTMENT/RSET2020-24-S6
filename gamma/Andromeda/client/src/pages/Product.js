import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiTwotoneStar } from 'react-icons/ai';
import RatingStars from '../components/RatingStars';
import { api } from '../api';
import '../styles/Product.css';
import Rating from './Rating';

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [review, setReview] = useState('');

  async function handleCartClick(id, price) {
    const productPrice = parseInt(price.replace(/\D/g, ''));
    const data = {
      id: id,
      number: 100,
      username: localStorage.getItem('loggedUser'),
      price: productPrice,
    };
    console.log(data);
    await api.put(`order/cart`, data);
  }

  const handleWishlistClick = () => {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await api.get(`/product/${id}`);
        setProduct(data);
      } catch (error) {
        // Handle error state
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const getAverageRating = () => {
    const ratings = product.rating;
    if (ratings.length === 0) return 0;

    const totalRating = ratings.reduce(
      (sum, rate) => sum + parseFloat(rate.rating),
      0
    );
    const averageRating = totalRating / ratings.length;

    return Math.round(averageRating * 100) / 100;
  };

  const storeReview = async () => {
    const data = {
      newreview: review,
    };
    await api.put(`/product/${id}/review`, data);
  };

  const updateReview = (e) => {
    setReview(e.target.value);
  };

  return (
    <>
      <div className='separate-products-container' id='home-container'>
        {isLoading ? (
          <div className='loader'></div>
        ) : (
          product && (
            <div className='separate-product-details'>
              <div className='separate-image-container'>
                <img
                  src={product.img}
                  alt='Product IMG'
                  className='separate-product-image'
                />
              </div>
              <div className='separate-text-container'>
                <h1>{product.name}</h1>
                <div className='separate-rr-cont'>
                  <div className='separate-ratings'>
                    {product.rating.length} ratings
                  </div>
                  <div style={{ padding: '0px 10px' }}>and</div>
                  <div className='separate-reviews'>
                    {product.reviews.length} reviews
                  </div>
                </div>
                <div className='separate-hl'>
                  <h2 className='hl-header'>Specifications</h2>
                  {product.highlights.map((highlight, i) => (
                    <div className='separate-highlights' key={i}>
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        )}
      </div>
      {product && (
        <div>
          <div className='rating-section'>
            <div className='add-button-container'>
              <button
                className='cart-button primary-btn'
                onClick={() => handleCartClick(product._id, product.price)}
              >
                Add to cart
              </button>
              <button
                className='wish-button primary-btn'
                onClick={handleWishlistClick}
              >
                Add to wishlist
              </button>
            </div>
            <h1>Ratings</h1>
            Rating: {getAverageRating()} <AiTwotoneStar />
            <RatingStars />
          </div>
          <div className='reviews-section'>
            <h1>Write a review: </h1>
            <textarea
              className='review-textarea'
              onChange={updateReview}
            ></textarea>
            <button className='review-button' onClick={storeReview}>
              Submit
            </button>

            <h1>Reviews</h1>
            {product.reviews.map((review, index) => (
              <div key={index} className='review'>
                {review}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Product;

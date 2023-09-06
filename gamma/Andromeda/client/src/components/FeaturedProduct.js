import FeaturedProductBox from './FeaturedProductBox';
import '../styles/FeaturedProduct.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { api } from '../api';
//https://codepen.io/shshaw/pen/YpERQQ
function Product() {
  const [products, setProducts] = useState([{}]);
  const [loading, setLoading] = useState(true);

  async function getData() {
    try {
      setLoading(true);
      const response = await api.get(`/product/featured`);
      setProducts(response.data);
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
    <div className='fp-body'>
      <div
        className='featured-product-container'
        id='featured-product-container'
      >
        <div className='feat-header'>
          <h1 className='featured-shimmering-text'>FEATURED PRODUCTS</h1>
        </div>

        <div className='featured-product-grid'>
          {loading && <div className='loader'></div>}
          {!loading &&
            products.map((product) => (
              <FeaturedProductBox text={product} key={product._id} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Product;

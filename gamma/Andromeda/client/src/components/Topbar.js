import axios from 'axios';
import { useState, useEffect } from 'react';
import '../styles/topbar.css';
import { FiSearch } from 'react-icons/fi';
import { BsCartFill } from 'react-icons/bs';
import { animateScroll as scroll } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import { IoLogInOutline } from 'react-icons/io5';
import { GoSignOut } from 'react-icons/go';
import { FaUserCircle } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { api } from '../api';
let urlLength = window.location.pathname;
function Topbar() {
  var userDetails = {};
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const loggedUser = localStorage.getItem('loggedUser');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [result, setResult] = useState('');
  const scrollToFeatured = () => {
    const element = document.getElementById('featured-product-container');
    scroll.scrollTo(element.offsetTop);
  };
  const scrollToHome = () => {
    const element = document.getElementById('home-container');
    scroll.scrollTo(element.offsetTop);
  };

  useEffect(() => {
    axios.get('http://localhost:3002/product').then((response) => {
      setSuggestions(response.data);
    });
  }, []);

  async function getData() {
    try {
      setLoading(true);
      let curr_user = localStorage.getItem('loggedUser');
      const data = {
        username: curr_user,
      };
      const response = await api.put(`order/show`, data);
      setCartCount(response.data.items.length);
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
  });

  const handleCategoriesClick = (event) => {
    let urlparam = event.currentTarget.textContent;
    urlparam = urlparam.replace(/\s/g, '');
    navigate(`/category/${urlparam}`);
    window.location.reload();
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  let filteredSuggestions = [];
  if (searchText.length > 0)
    filteredSuggestions = suggestions.filter((suggestion) =>
      suggestion.name.toLowerCase().startsWith(searchText.toLowerCase())
    );

  const searchListClick = (event, param) => {
    let searchHistory = {
      username: loggedUser,
      product_id: param,
    };
    api.put('/product/search', searchHistory).then((response) => {
      console.log(response);
    });
    navigate(`/product/${param}`);
  };

  const model = (id) => {
    console.log(id);
    fetch('http://localhost:3002/run-python') // Replace with the correct server URL
      .then((response) => response.json())
      .then((data) =>{ console.log(data);
      let indexdata = {
        id:id,
        top3:data
      }  
      api.post('/user/top3', indexdata)
      
      })
      .catch((error) => setResult(`Error: ${error.message}`));
  }

  const handleLogout = async() => {  
      let data = {
        name: loggedUser,
      };
    localStorage.setItem('isLoggedIn', false);
    localStorage.setItem('loggedUser', 'guest');
    navigate(`/login`);
    const filePath = '../graphrec/data/test_user_array.json';
    await api.post(`/user/search-by-name`, data)
      .then((response)=>{
        model(response.data.user._id)
        let k=response.data.user.userindex
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ k: k }),
        };
        fetch('http://localhost:3002/modify-file', requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data))
      })
  };

  const handleCartClick = () => {
    let curr_user = localStorage.getItem('loggedUser');
    if (curr_user === 'guest') {
      alert('You must be logged in !');
      window.location = 'http://localhost:3000/login';
    } else window.location = 'http://localhost:3000/cart';
  };

  const handleWishClick = () => {
    let curr_user = localStorage.getItem('loggedUser');
    if (curr_user === 'guest') {
      alert('You must be logged in !');
      window.location = 'http://localhost:3000/login';
    } else window.location = 'http://localhost:3000/wishlist';
  };

  const handleAdminClick = () => {
    window.location = 'http://localhost:3000/admin';
  };
  return (
    <div className='topbar-container'>
      <div className='topbarContainer'>
        <span
          className='logo'
          onClick={() => {
            window.location.href = '/';
          }}
        >
          ShopHere
        </span>
        <div className='searchbar'>
          <FiSearch className='searchIcon' />
          <input
            placeholder='Search for a product'
            type='text'
            value={searchText}
            onChange={handleSearchChange}
            className='searchInput'
          />
        </div>
        {urlLength.length === 1 && (
          <span className='navbar-links' onClick={scrollToFeatured}>
            FEATURED
          </span>
        )}
        {urlLength.length > 1 && (
          <span className='category-navbar-links'>FEATURED</span>
        )}
        <div className='topbarLinks'>
          {urlLength.length === 1 && (
            <span className='navbar-links' onClick={scrollToHome}>
              HOME
            </span>
          )}
          {urlLength.length > 1 && (
            <span className='category-navbar-links'>Home</span>
          )}
        </div>
        <div className='topbarIcons'>
          {loggedUser !== 'admin' && (
            <div className='topbarIconItem'>
              <BsCartFill className='cart-icon' onClick={handleCartClick} />
              <div className='topbarIconBadge'>{cartCount}</div>
            </div>
          )}
          {loggedUser === 'admin' && (
            <div className='topbarIconItem'>
              <BsCartFill
                className='cart-icon'
                style={{ color: 'hsl(180, 3%, 7%)' }}
              />
              <div
                className='topbarIconBadge'
                style={{
                  backgroundColor: 'hsl(180, 3%, 7%)',
                  color: 'hsl(180, 3%, 7%)',
                }}
              >
                {cartCount}
              </div>
            </div>
          )}
          {(isLoggedIn === 'undefined' || isLoggedIn === 'false') && (
            <IoLogInOutline
              className='login-icon'
              onClick={() => {
                localStorage.setItem('loggedUser', 'guest');
                navigate(`/login`);
              }}
            />
          )}
          {isLoggedIn === 'true' && (
            <>
              <div className='username-label'>
                {loggedUser}
                <FaUserCircle
                  className='user-icon'
                  size='30'
                  onClick={() => {
                    setIsProfileOpen(!isProfileOpen);
                  }}
                />
                {isProfileOpen && (
                  <>
                    <div
                      className='triangle-icon'
                      onClick={() => {
                        setIsProfileOpen(!isProfileOpen);
                      }}
                    ></div>
                    <div className='profile-div'>
                      <div className='all-btn' onClick={handleLogout}>
                        <GoSignOut className='profile-open-icon' size='20' />
                        <span className='option-text'>Logout</span>
                      </div>
                      <hr />
                      {loggedUser !== 'admin' && (
                        <div className='all-btn' onClick={handleCartClick}>
                          <BsCartFill className='profile-open-icon' />
                          <span className='option-text'>My Cart</span>
                        </div>
                      )}
                      {loggedUser === 'admin' && (
                        <div className='all-btn' onClick={handleAdminClick}>
                          <BsCartFill className='profile-open-icon' />
                          <span className='option-text'>Upload product</span>
                        </div>
                      )}

                      <hr />
                      {loggedUser !== 'admin' && (
                        <div className='all-btn' onClick={handleWishClick}>
                          <FaHeart className='profile-open-icon' />
                          <span className='option-text'>My Wishlist</span>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      {searchText.length > 0 && filteredSuggestions.length > 0 && (
        <div className='search-focus'>
          <ul className='search-suggestions'>
            {filteredSuggestions.map((suggestion) => (
              <li
                className='searchlist'
                key={suggestion._id}
                onClick={(event) => searchListClick(event, suggestion._id)}
              >
                {suggestion.name}
                {suggestion.featured && (
                  <span className='featured-suggestion'>Featured</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className='separator-line'></div>
      <div className='topbar-bottom'>
        <div className='topbar-bottom-text' onClick={handleCategoriesClick}>
          Smartphones
        </div>
        <div className='topbar-bottom-text' onClick={handleCategoriesClick}>
          Cameras
        </div>
        <div className='topbar-bottom-text' onClick={handleCategoriesClick}>
          Computers
        </div>
        <div className='topbar-bottom-text' onClick={handleCategoriesClick}>
          Men's Fashion
        </div>
        <div className='topbar-bottom-text' onClick={handleCategoriesClick}>
          Women's Fashion
        </div>
        <div className='topbar-bottom-text' onClick={handleCategoriesClick}>
          Headphones
        </div>
        <div className='topbar-bottom-text' onClick={handleCategoriesClick}>
          Furniture
        </div>
        <div className='topbar-bottom-text' onClick={handleCategoriesClick}>
          Books
        </div>
        <div className='topbar-bottom-text' onClick={handleCategoriesClick}>
          Fragrances
        </div>
        <div className='topbar-bottom-text' onClick={handleCategoriesClick}>
          Grocery
        </div>
        <div className='topbar-bottom-text' onClick={handleCategoriesClick}>
          Skin Care
        </div>
        <div className='topbar-bottom-text' onClick={handleCategoriesClick}>
          Watches
        </div>
        <div className='topbar-bottom-text' onClick={handleCategoriesClick}>
          Shoes
        </div>
        <div className='topbar-bottom-text' onClick={handleCategoriesClick}>
          Kitchenware
        </div>
        <div className='topbar-bottom-text' onClick={handleCategoriesClick}>
          Chocolates
        </div>
        <div className='topbar-bottom-text' onClick={handleCategoriesClick}>
          Jewellery
        </div>
      </div>
    </div>
  );
}

export default Topbar;

// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_shapes_triangle-up

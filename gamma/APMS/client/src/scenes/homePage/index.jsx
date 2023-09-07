import './homePage.css';
import logo from '../../assets/logo-black.png'; 

const HomePage = () => {
    return (
        <div>
            <div className='container'>
                <img src={logo} alt="Logo" width="550" height="550" /> 
                <div className="HomepageHeading">
                </div>
            </div>
        </div>
    );
};

export default HomePage;

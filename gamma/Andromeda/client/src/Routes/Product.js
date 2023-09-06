import Product from "../pages/IndividualProduct";
import Topbar from '../components/Topbar';
const ProductPage=()=>{
  return (
    <div className="App">
    <Topbar/>
      <Product/>
    </div>
  );
};

export default ProductPage;
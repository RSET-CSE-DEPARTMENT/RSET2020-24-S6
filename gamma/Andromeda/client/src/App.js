import "./styles/App.css";
import HomePage from "./Routes/Home";
import AuthPage from "./Routes/Auth";
import AdminPage from "./Routes/Admin";
import  ProductPage  from "./Routes/Product";
import CategoryProductPage from "./Routes/Category";
import CartPage from "./Routes/Cart";
import WishlistPage from "./Routes/Wishlist";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
    errorElement: <div>Something went wrong</div>,
  },  {
    path: "/login",
    element: <AuthPage/>,
    errorElement: <div>Something went wrong</div>,
  }, 
  {
    path: "/product/:id",
    element: <ProductPage />,
    errorElement: <div>Something went wrong</div>,
  },
  {
    path: "/category/:category",
    element: <CategoryProductPage />,
    errorElement: <div>Something went wrong</div>,
  },
  {
    path:"/admin",
    element:<AdminPage />,
    errorElement: <div>Something went wrong</div>,
  },
  {
    path: "/cart",
    element: <CartPage/>,
    errorElement: <div>Something went wrong</div>,
  },
  {
    path: "/wishlist",
    element: <WishlistPage/>,
    errorElement: <div>Something went wrong</div>,
  },
]);


function App() {
  return (
    
    <div className="App">

    <RouterProvider router={router} />
    </div>
  );
}

export default App;

import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout"
import AllProducts from "../pages/Public/AllProducts";
import Login from "../pages/Public/Login"
import Register from "../pages/Public/Register"
import Profile from '../pages/Private/Profile'
import Cart from "../pages/Private/Cart";
import Admin from "../pages/Private/Admin";
import ProductDetails from "../Components/ProductDetails";
import Order from "../pages/Private/Order";
import AddNewProduct from "../pages/Private/AddNewProduct";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <AllProducts />,

            }, {
                path: "product/:id",
                element: <ProductDetails />
            },
            {
                path: "login",
                element: <Login />,

            },
            {
                path: "register",
                element: <Register />,

            },
            {
                path: "profile",
                element: <Profile />,

            },
            {
                path: "cart",
                element: <Cart />,


            }, {
                path: "cart/order",
                element: <Order />,

            },
            {
                path: "admin",
                element: <Admin />,

            },
            {
                path:"addProduct",
                element:<AddNewProduct/>
            }

        ],
    },

]);
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout"
import AllProducts from "../pages/Public/AllProducts";
import Login from "../pages/Public/Login"
import Register from "../pages/Public/Register"
import Profile from '../pages/Private/Profile'
import Cart from "../pages/Private/Cart";
import Admin from "../pages/Private/Admin";
import ProductDetails from "../Components/ProductDetails";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index:true,
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

            },
            {
                path: "admin",
                element: <Admin />,

            },
        ],
    },

]);
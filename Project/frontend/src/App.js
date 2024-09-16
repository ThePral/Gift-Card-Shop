import React from 'react';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Gnav from './components/gnav';
import Home from './pages/home';
import Contact from './pages/contact';
import Cart from './pages/cart';
import About from './pages/about';
import NoPage from './pages/nopage';
import Gfooter from './components/gfooter';
import ProductsList from './pages/products-list';
import Login from './pages/login';
import Register from './pages/register';
import './styles/pages_general.css';

export default function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
            errorElement: <NoPage />
        }, {
            path: "/about",
            element: <About />
        }, {
            path: "/contact",
            element: <Contact />
        }, {
            path: "/cart",
            element: <Cart />
        }, {
            path: "/products",
            element: <ProductsList />
        }, {
            path: "/login",
            element: <Login />
        }, {
            path: "/register",
            element: <Register/>
        }
    ])
    return (
        <div className='app'>
            <Gnav />
            <RouterProvider router={router} />
            <Gfooter />
        </div>
    );
    }

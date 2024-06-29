import './App.css';
import Main from './components/main/main';
import Login from './components/auth/login/login'
import Register from './components/auth/register/register'
import ProductList from './components/productList/productList'
import ProductDetails from './components/productDetails/productDetails';
import { Navigate } from 'react-router-dom';
import React, { useContext } from 'react';
import { AuthContext } from './components/context/AuthContext';
import About from './components/about/about';
import ProfilePage from './components/profilePage/profilePage';
import { adminLoader, basketPageLoader, favoritePageLoader, listPageLoader, singleProductLoader } from './lib/loaders';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Layout } from './routes/layout/layout';
import BasketLayout from './components/basketLayout/basketLayout';
import AdminPanel from './components/admin/adminPanel';
import ProfileUpdatePage from './components/profileUpdatePage/profileUpdatePage';
import Favorite from './components/favorite/favorite';
import BasketPay from './components/basketPay/basketPay';
import AdminOrder from './components/admin/adminOrder';
import AdminReport from './components/admin/adminReport';



function App() {

  const { currentUser } = useContext(AuthContext);
  console.log(currentUser)
  const ProtectedRoute = ({ children }) => {
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return <Navigate to='/' />;
    }
    return children;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Main />,
        },
        {
          path: "product",
          element: <ProductList />,
          loader: listPageLoader
        },
        {
          path: "product/:id",
          element: <ProductDetails />,
          loader: singleProductLoader
        },
        {
          path: "about",
          element: <About />,
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
          element: <ProfilePage />,
          loader: listPageLoader
        },
        {
          path: "profile/update",
          element: <ProfileUpdatePage />,
        },
        {
          path: "favorite/:id/saved-products",
          element: <Favorite />,
          loader: favoritePageLoader
        },
        {
          path: "basket/:id",
          element: <BasketLayout />,
          loader: basketPageLoader
        },
        {
          path: "basket/:id/buy",
          element: <BasketPay />,
          loader: basketPageLoader
        },


      ]
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute>
          <AdminPanel />
        </ProtectedRoute>
      ),
      loader: adminLoader
    },
    {
      path: "/admin/order",
      element: (
        <ProtectedRoute>
          <AdminOrder />
        </ProtectedRoute>
      ),
      loader: adminLoader
    },
    {
      path: "/admin/report",
      element: (
        <ProtectedRoute>
          <AdminReport />
        </ProtectedRoute>
      ),
      loader: adminLoader
    },
  ])

  return (
    <div className='container'>
      <RouterProvider router={router} />
    </div>

  );


}

export default App;

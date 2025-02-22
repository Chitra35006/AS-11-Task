import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import PrivateRoute from './Routes/PrivateRoute';
import Tasks from './Components/Tasks/Tasks';
import SignIn from './Components/SignIn';
import Register from './Components/Register';
import AuthProvider from './Provider/AuthProvider';

import Home from './Components/Home';
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path:"/",
    element:<Home></Home>
  },
  {
    path:"tasks",
    element:<PrivateRoute><Tasks></Tasks></PrivateRoute>
  },
  {
    path:"signIn",
    element:<SignIn></SignIn>
  },
  {
    path:"register",
    element:<Register></Register>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

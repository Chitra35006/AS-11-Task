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

import SignIn from './Components/SignIn';
import Register from './Components/Register';
import AuthProvider from './Provider/AuthProvider';

import Home from './Components/Home';
import MainLayout from './Layout/MainLayout';
import TaskBoard from './Components/Tasks/TaskBoard';
import TaskList from './Components/Tasks/TaskList';
import TaskForm from './Components/Tasks/TaskForm';
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path:"/",
    element:<Home></Home>
  },
  {
    path:"signIn",
    element:<SignIn></SignIn>
  },
  {
    path:"register",
    element:<Register></Register>
  },
  {
    path:"/dashboard",
    element:<PrivateRoute><MainLayout></MainLayout></PrivateRoute>,
    children:[
      {
        path:"taskBoard",
        element:<TaskBoard></TaskBoard>
      },
      {
        path:"taskList",
        element:<TaskList></TaskList>
      },
      {
        path:"taskFrom",
        element:<TaskForm></TaskForm>
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
  <QueryClientProvider client={queryClient}>
        <Toaster />
        <RouterProvider router={router} />
      </QueryClientProvider>
  </AuthProvider>

  </StrictMode>,
)

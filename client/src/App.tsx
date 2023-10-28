import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react'
import LoginPage from './pages/LoginPage'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Error404 from './pages/404'
import Dashboard from './pages/Dashboard'
import Error500 from './pages/500'
import GettingStarted1 from './pages/gettingStarted1'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <Error404 />
    },
    {
      path: "/login",
      element: <LoginPage />
    },
    {
      path: "/register",
      element: <Signup />
    },
    {
      path: "/dashboard",
      element: <Dashboard />
    },
    {
      path: "/Error500",
      element: <Error500 />
    },
    {
      path: "/getStarted",
      element: <GettingStarted1 />  
    }
  ])
  return (
    <NextUIProvider>
      <RouterProvider router={router}></RouterProvider>
    </NextUIProvider>
  )
}

export default App

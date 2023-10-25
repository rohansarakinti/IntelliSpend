import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react'
import LoginPage from './pages/LoginPage'
import Signup from './pages/Signup'
import Home from './pages/Home'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <div>Not found</div>
    },
    {
      path: "/login",
      element: <LoginPage />
    },
    {
      path: "/register",
      element: <Signup />
    }
  ])
  return (
    <NextUIProvider>
      <RouterProvider router={router}></RouterProvider>
    </NextUIProvider>
  )
}

export default App

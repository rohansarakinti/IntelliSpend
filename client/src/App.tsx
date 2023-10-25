import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react'
import LoginPage from './pages/LoginPage'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Home</div>,
      errorElement: <div>Not found</div>
    },
    {
      path: "/login",
      element: <LoginPage />
    }
  ])
  return (
    <NextUIProvider>
      <RouterProvider router={router}></RouterProvider>
    </NextUIProvider>
  )
}

export default App

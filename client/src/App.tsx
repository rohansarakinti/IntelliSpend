import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import './App.css'

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
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App

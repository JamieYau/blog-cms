import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Layouts/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Layouts/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import DashboardLoader from "./pages/Dashboard/Dashboard.loader";
import LoginPage from "./pages/LoginPage";
import NewPostPage from "./pages/NewPostPage";
import ProfilePage from "./pages/ProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
        loader: DashboardLoader
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "create",
        element: <NewPostPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;

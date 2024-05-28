import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Layouts/RootLayout";
import ErrorPage from "./pages/Error/ErrorPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import DashboardLoader from "./pages/Dashboard/Dashboard.loader";
import LoginPage from "./pages/Login/LoginPage";
import NewPostPage from "./pages/NewPost/NewPostPage";
import PostPage from "./pages/PostPage/PostPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import EditPostPage from "./pages/EditPost/EditPostPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
        loader: DashboardLoader,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "/posts/create",
        element: <NewPostPage />,
      },
      {
        path: "/posts/:postId",
        element: <PostPage />,
        children: [
          {
            path: "edit",
            element: <EditPostPage />
          }
        ]
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

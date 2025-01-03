import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../src/pages/LoginPage";
import { SignupPage } from "../src/pages/SignupPage";
import { Dashboard } from "../src/pages/Dashboard";
import { App } from "../src/pages/Homepage";
import { ProfilePage } from "../src/pages/ProfilePage";
import { ErrorPage } from "../src/pages/ErrorPage";
import { DirectMessagePage } from "../src/components/MessageComponents/DirectMessagePage";
import { FriendPage } from "../src/pages/FriendPage";
import { ProtectedRoute } from "../src/pages/ProtectedRoute.jsx"; 
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/dashboard/:profileId",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "direct-messages/:chatId",
        element: (
          <ProtectedRoute>
            <DirectMessagePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "friends",
        element: (
          <ProtectedRoute>
            <FriendPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;

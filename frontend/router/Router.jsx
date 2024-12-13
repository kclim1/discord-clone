import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../src/pages/LoginPage";
import { SignupPage } from "../src/pages/SignupPage";
import { Dashboard } from "../src/pages/Dashboard";
import { App } from "../src/pages/Homepage";
import { ProfilePage } from "../src/pages/ProfilePage";
import { ErrorPage } from "../src/pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement:<ErrorPage/>
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  { path: "/signup", element: <SignupPage /> },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [{ path: "/dashboard/:profileId", element: <ProfilePage /> }],
  },
]);

export default router;

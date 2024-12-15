import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../src/pages/LoginPage";
import { SignupPage } from "../src/pages/SignupPage";
import { Dashboard } from "../src/pages/Dashboard";
import { App } from "../src/pages/Homepage";
import { ProfilePage } from "../src/pages/ProfilePage";
import { ErrorPage } from "../src/pages/ErrorPage";
// import { NewDashboard } from "../src/pages/NewDashboard";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement:<ErrorPage/>
  },
//   {
//     path:'/error',
//     element:<Authenticated404/>
//   },
  {
    path: "/login",
    element: <LoginPage />,
  },
  { path: "/signup", element: <SignupPage /> },
  {
    path: "/dashboard/:profileId",
    element: <Dashboard />,
    children: [{ path: "profile", element: <ProfilePage /> }],
  },
]);

export default router;

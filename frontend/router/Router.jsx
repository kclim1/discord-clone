import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../src/pages/LoginPage";
import { SignupPage } from "../src/pages/SignupPage";
import { Dashboard } from "../src/pages/Dashboard";
import { App } from "../src/pages/Homepage";
import { ProfilePage } from "../src/pages/ProfilePage";
import { ErrorPage } from "../src/pages/ErrorPage";
import { DirectMessagePage } from "../src/components/MessageComponents/DirectMessagePage"
// import { FriendRequestList } from "../src/pages/FriendRequestPage";
import { FriendPage } from "../src/pages/FriendPage";
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
    children: [
      { path: "profile", element: <ProfilePage /> },
      { path: "direct-messages/:chatId", element: <DirectMessagePage /> },
      {path: "friends",element:<FriendPage/>}
    ],
  }
]);

export default router;

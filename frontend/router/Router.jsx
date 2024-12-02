import { createBrowserRouter  } from "react-router-dom";
import { LoginPage } from "../src/pages/LoginPage";
import { SignupPage } from "../src/pages/SignupPage";
import {App} from '../src/App'

const router = createBrowserRouter([
    {
        path:'/',
        element: <App/>
    },
    {
        path:'/login',
        element:<LoginPage/>
    },
    {
        path: '/signup',
        element:<SignupPage/>
    }
])

export default router
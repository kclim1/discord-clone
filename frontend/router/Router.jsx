import { createBrowserRouter  } from "react-router-dom";
import { LoginPage } from "../src/pages/LoginPage";
import {App} from '../src/App'

const router = createBrowserRouter([
    {
        path:'/',
        element: <App/>
    },
    {
        path:'/login',
        element:<LoginPage/>
    }
])

export default router
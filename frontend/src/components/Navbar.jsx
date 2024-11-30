import {Link} from 'react-router-dom'

export const Navbar = ()=>{
    return(
        <nav>
            <div>
                <ul>
                    <li>Home</li>
                    <li>FAQ</li>
                    <li><Link to="/login">Login</Link></li>    
                </ul>
            </div>
        </nav>
    )
}
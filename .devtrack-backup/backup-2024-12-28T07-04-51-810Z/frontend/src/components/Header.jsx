import {Link} from 'react-router-dom'
import { LogoutButton } from './LogoutButton';

export const Header = function() {
    return (
      <div className='bg-red-300 flex justify-between'>
        <h2 className="text-white bg-green-700 h-10 mx-8">Header here</h2>
        <Link className='text-white bg-blue-500 p-2 mx-8' to='/login'>Login</Link> {/* Added bg-blue-500 and padding */}
        <LogoutButton/>
      </div>
    );
  };
  
import {Header} from '../components/Header'
import { Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <div>
        <Header/>
      <h1>Homepage here</h1>
      <Outlet/>
    </div>
  );
};



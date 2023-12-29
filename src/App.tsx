import './App.scss';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Welcome from './pages/Welcome/Welcome';
import WhoopWhoop from './pages/WhoopWhoop/WhoopWhoop';
import { useState } from 'react';
import { UserNameContext } from './contexts/user-name.context';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Welcome />,
  },
  {
    path: '/whoopwhoop',
    element: <WhoopWhoop />,
  },
]);

function App() {
  const [userName, setUserName] = useState('');

  const handleChangeUserName = (name: string) => {
    setUserName(name);
  } 

  return (
    <UserNameContext.Provider value={{ userName, handleChangeUserName }}>
      <RouterProvider router={router} />
    </UserNameContext.Provider>
  )
}

export default App

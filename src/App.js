import logo from './logo.svg';
import './App.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import Navbar from './components/Navbar/Navbar';

import RemoveBgOfImage from './pages/RemoveBg/RemoveBgOfImage';

function App() {


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
           index: true,
          element: <RemoveBgOfImage />
        },
      ],
    },
  ]);


  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

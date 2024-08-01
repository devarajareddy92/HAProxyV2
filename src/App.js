import React from 'react';
import './App.css';
// import Sidebar from './Components/sidebar/Sidebar';
import GlobalContainer from './Components/Global/GlobalContainer';
import NavBar from './Components/content/Naviagtion';
import Login from './Components/Login/Login';
import Nav from './Components/navigation'
import Naviagtion from './Components/content/Naviagtion';
import Default from './Components/Global/Default';
import FrontendConfig from './Components/Global/Frontend';
// import 'antd/dist/antd.css';

const App = () => {
  return [
    // { path: "", element: <Login /> },

    { path: "/", element: <Login /> },
    { path: "/home", element: <Naviagtion /> },
    { path: "/global", element: <Naviagtion /> },
    { path: "/default", element: < Naviagtion /> },
    { path: "/frontend", element: <Naviagtion /> },
    { path: "/stats", element: <Naviagtion /> },
    { path: "/backend", element: <Naviagtion /> },
    { path: "/acl", element: <Naviagtion /> },
    { path: "/switchingrules", element: <Naviagtion /> },
    { path: "/current-config-view", element: <Naviagtion /> },
    { path: "/journallogs", element: <Naviagtion /> },
    { path: "/deploymenthistory", element: <Naviagtion /> },


  ]
}


export default App;

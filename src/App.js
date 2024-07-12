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
    { path: "/", element: <Login /> },
    { path: "/global", element: <Naviagtion /> },
    { path: "/default", element: < Naviagtion /> },
    { path: "/frontend", element: <Naviagtion /> },

    { path: "/navbar", element: <NavBar /> },
  ]
}


export default App;

// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
// import SideBar from "./Components/sidebar/SideBar";
// import Content from "./Components/content/Content";
// import Login from "./Components/Login/Login";

// class App extends React.Component {
//   constructor(props) {
//     super(props);

//     // Moblie first
//     this.state = {
//       isOpen: false,
//       isMobile: true
//     };

//     this.previousWidth = -1;
//   }

//   updateWidth() {
//     const width = window.innerWidth;
//     const widthLimit = 576;
//     const isMobile = width <= widthLimit;
//     const wasMobile = this.previousWidth <= widthLimit;

//     if (isMobile !== wasMobile) {
//       this.setState({
//         isOpen: !isMobile
//       });
//     }

//     this.previousWidth = width;
//   }

//   /**
//    * Add event listener
//    */
//   componentDidMount() {
//     this.updateWidth();
//     window.addEventListener("resize", this.updateWidth.bind(this));
//   }

//   /**
//    * Remove event listener
//    */
//   componentWillUnmount() {
//     window.removeEventListener("resize", this.updateWidth.bind(this));
//   }

//   toggle = () => {
//     this.setState({ isOpen: !this.state.isOpen });
//   };

//   render() {
//     return (
//       <div className="App wrapper">
//         <Login toggle=
//         <SideBar toggle={this.toggle} isOpen={this.state.isOpen} />
//         <Content toggle={this.toggle} isOpen={this.state.isOpen} />
//       </div>
//     );
//   }
// }

// export default App;


import React from "react";
import Navbar from "../container/Navbar";
import SignUp from "../screens/SignUp";
import Login from "../screens/Login";

class Homepage extends React.Component {
  render() {
    return (
      <>
      <Navbar/>
      <SignUp/>
      <Login/>
      </>
    );
  }
}
export default Homepage;

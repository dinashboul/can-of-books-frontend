import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand style={{display :"flex" ,color : "crimson" }}>My Favorite Books</Navbar.Brand>
        <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
        <NavItem><Link to="/Profile" className="nav-link" style={{display :"inline-block" ,color : "crimson",paddingLeft:"100px" }}
        >Profile</Link></NavItem>
        
        
       <NavItem style={{display :"inline-block" ,color : "crimson" ,paddingLeft:"200px"}}><LoginButton /></NavItem>
       <NavItem><LogoutButton/></NavItem>
       {/* PLACEHOLDER: render a navigation link to the about page */}
      </Navbar>
    )
  }
}

export default Header;

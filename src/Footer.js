import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

class Footer extends React.Component {
  render() {
    return (
      <Navbar  collapseOnSelect expand="lg" bg="#E8B4B8" variant="#E8B4B8" style={{
        position: "fixed",
        bottom: "0",
        width: "100%",
        height: "20px",   /* Height of the footer */
        background: "#F8AFA6",
     }}>
      
        <Navbar.Brand style={{display :"inline-block" ,color : "crimson"}}>Code Fellows</Navbar.Brand>
        </Navbar>
       
    )
  }
}

export default Footer;

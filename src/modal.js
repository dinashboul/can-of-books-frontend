
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./style.css"
class Modalform extends React.Component {

render(){
    return (
        <Modal show={this.props.show} onHide={this.props.handleClose} >
        <Modal.Header closeButton>
          <Modal.Title style={{color:"red"}}>Add A New Book </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{background:"#ffb3b3"}}>
          <Form onSubmit={this.props.addBook}>
            <Form.Group className="mb-4">
              <Form.Label style={{color:"aqua"}}>Book Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter a book name"
              />
            </Form.Group>

            <Form.Group  className="mb-4">
              <Form.Label style={{color:"red"}}>Book Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="Enter a description"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select style={{color:"red"}} onChange={this.props.handleOnChange}>
              <option>Choose a Status</option>
                <option value="Life Changing">Life Changing</option>
                <option value="Favorite Five">Favorite Five</option>
                <option value="Reccomended To Me">Reccomended To Me</option>
              </Form.Select>
            </Form.Group>
            <Button  class="btn btn-primary btn-lg" type="submit"  style={{color:"red"}}>
              Add Book Now!
            </Button>
            <Button  class="btn btn-primary btn-lg" onClick={this.props.handleClose}>
            Close
          </Button>
          </Form>
          
        </Modal.Body>
      </Modal>
    );
  }

}









export default Modalform;
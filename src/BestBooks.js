import React from "react";
import axios from "axios";
import UpdateForm from "./UpdateForm";
import Button from "react-bootstrap/Button";
import { withAuth0 } from '@auth0/auth0-react';
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Modalform from "./modal";

class BestBooks extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      status: "",
      books: [],
      showFlag: false,
      currentBook: {},
      
    };
  }

  componentDidMount = () => {
    const { user } = this.props.auth0;
  
    axios
      .get(
        `https://backend-lab15.herokuapp.com/books?email=${user.email}`
      )
      .then((result) => {
        console.log(result.data);
        this.setState({
          books: result.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleShow = () => {
    this.setState({
      show: true,
    });
  };

  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  handleOnChange = (event) => {
    this.setState({
      status: event.target.value,
    });
  };

  addBook = (event) => {
    event.preventDefault();
    const { user } = this.props.auth0;
    console.log("the email is ",user.email);
    const obj = {
      bookTitle: event.target.title.value,
      bookDescription: event.target.description.value,
      email: user.email,
      bookStatus: this.state.status,
      
    };
    axios
      .post(`https://backend-lab15.herokuapp.com/addBook`, obj)
      .then((result) => {
        console.log(result.data);
        return this.setState({
          books: result.data,
        });
      })
      
      .catch((err) => {
        console.log(err);
      });
    this.handleClose();
  };

  deleteBook = (id) => {
    const { user } = this.props.auth0;

    axios
      .delete(`https://backend-lab15.herokuapp.com/deleteBook/${id}?email=${user.email}`)
      .then((result) => {
        this.setState({
          books: result.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  openForm = (item) => {
    this.setState({
      showFlag: true,
      currentBook: item,
    });
  };

  handleOnChangeUpdate = (event) => {
    this.setState({
      status: event.target.value,
    });
  };

  handleCloseUpdate = () => {
    this.setState({
      showFlag: false,
    });
  };

  updateBook = (event) => {
    event.preventDefault();
    const { user } = this.props.auth0;

    let obj = {
      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.value,
      email: user.email,
    };
    const id = this.state.currentBook._id;
    axios
      .put(
        `https://backend-lab15.herokuapp.com/updateBook/${id}?email=${user.email}`,
        obj
      )
      .then((result) => {
        this.setState({
          books: result.data,
        });
        this.handleCloseUpdate();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    // const { user } = this.props.auth0;

    return (
      <div>
        <div id="form">
          <>
            <Button class="btn btn-secondary btn-lg" onClick={this.handleShow}>
              Add A New Book
            </Button>

            <Modalform
              show={this.state.show}
              handleClose={this.handleClose}
              addBook={this.addBook}
              handleOnChange={this.handleOnChange}
            />
          </>
        </div>
        <div>
          {this.state.books.length ? (
            <div>
              <Row xs={1} md={3} className="g-4">
              {this.state.books.map((item) => {
                return (
                  <div style={{ color: "blue" }}>
                   
                      <Col>
                        <Card
                          
                          variant="success"
                        >
                          <Card.Header>
                            
                            <h3 style={{ color: "#F65A83" }}>{item.title}</h3>
                          </Card.Header>
                          <Card.Body>
                            <Card.Text>
                              <p>{item.description}</p>
                              <p class="bg-info">{item.status}</p>
                              <p>Email: {item.email}</p>
                            </Card.Text>
                            <Card.Footer
                              className="text-muted"
                              class="btn-group"
                              role="group"
                              aria-label="Basic example"
                            >
                              <Button
                                class="btn btn-primary btn-lg"
                                onClick={() => this.deleteBook(item._id)}
                              >
                                Delete This Book
                              </Button>
                              <button
                                class="btn btn-primary btn-lg"
                                onClick={() => this.openForm(item)}
                              >
                                update
                              </button>
                            </Card.Footer>
                          </Card.Body>
                        </Card>
                      </Col>
                    
                    <UpdateForm
                      showFlag={this.state.showFlag}
                      handleCloseUpdate={this.handleCloseUpdate}
                      updateBook={this.updateBook}
                      currentBook={this.state.currentBook}
                      handleOnChangeUpdate={this.state.handleOnChangeUpdate}
                    />
                  </div>
                );
              })}
              </Row>
            </div>
          ) : (
            <h3>No Books </h3>
          )}
        </div>
      </div>
    );
  }
}

export default withAuth0(BestBooks);

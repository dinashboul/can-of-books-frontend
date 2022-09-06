import React from "react";
import axios from "axios";
import UpdateForm from "./UpdateForm";
import Button from "react-bootstrap/Button";
import "./style.css"
import Modalform from "./modal";
// import Carousel from 'react-bootstrap/Carousel';
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
    axios
      .get(`https://bookapp-backend-frontend.herokuapp.com/books`)
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

    const obj = {
      bookTitle: event.target.title.value,
      bookDescription: event.target.description.value,
      bookStatus:this.state.status,
    };
    console.log(obj);
    axios
      .post(`https://bookapp-backend-frontend.herokuapp.com/addBook`, obj)
      .then((result) => {
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
    axios
      .delete(`https://bookapp-backend-frontend.herokuapp.com/deleteBook/${id}`) 
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
    let obj = {
      title: event.target.title.value,
      description: event.target.description.value,
      status : event.target.status.value
    };
    const id = this.state.currentBook._id;
    axios
      .put(`https://bookapp-backend-frontend.herokuapp.com/updateBook/${id}`, obj)
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
    return (
      <div>
        <div id="form">
          <>
            <Button
              style={{ color: "red" }}
              variant="dark"
              size="lg"
              onClick={this.handleShow}
            >
              Add a Book!
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
              {this.state.books.map((item) => {
                return (
                  <div style={{ color: "red" }}>
                    <h3 style={{ color: "#F65A83" }}>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>{item.status}</p>
                    <Button
                      style={{ color: "#B9005B" }}
                      variant="dark"
                      onClick={() => this.deleteBook(item._id)}
                    >
                      Delete This Book!
                    </Button  >
                    <button onClick={() => this.openForm(item)}>update</button>
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
            </div>
          ) : (
            <h3>No Books Found :(</h3>
          )}
        </div>
      </div>
    );
  }
}

export default BestBooks;

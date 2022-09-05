import React from 'react';
import axios from 'axios';
// import Carousel from 'react-bootstrap/Carousel';
import "./book.css"
class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  

  componentDidMount = () => {
    axios
    .get(`http://localhost:3001/books`)
    .then(result =>{
      console.log(result.data);
      this.setState({
        books : result.data
      })
    })
    .catch(err=>{
      console.log(err);
    })
    
  }

  addBook = (event) =>{
    event.preventDefault();
    // const catName = event.target.catName.value;
    // const catBreed = event.target.catBreed.value;
    const obj = {
      bookTitle : event.target.bookTitle.value,
      bookDescription : event.target.bookDescription.value,
      bookStatus:event.target.bookStatus.value
    }

    axios
    .post(`http://localhost:3001/addBook`, obj)
    .then(result =>{
      this.setState({
        books : result.data
      })
    })
    .catch(err=>{
      console.log(err);
    })
  }


  deleteBook= (id) => {
    axios
    .delete(`http://localhost:3001/deleteBook/${id}`) //http://localhost:3010/deleteCat?id=${id}
    .then(result =>{
      this.setState({
        books : result.data
      })
    })
    .catch(err=>{
      console.log(err);
    })
  }

  render() {

 
    return(
      <div>
        <h1>Books System</h1>
        <form onSubmit={this.addBook}>
          <input type="text" name="bookTitle" placeholder='Book Title' />
          <input type="text" name="bookDescription" placeholder='Description of Book' />
          <input type="text" name="bookStatus" placeholder='Status of the Book' />
          <button type='submit'>Add</button>

        </form>
        {this.state.books.map(item =>{
          return(
            <div>
              <h3>Book Title  : {item.title} </h3>
              <p>Book Description: {item.description}</p>
              <p>Book Status : {item.status}</p>

              <button onClick={() => this.deleteBook(item._id)}>X</button>
              <p>----------------------------</p>
            </div>
          )
        })}
      </div>
    )
      }
  }

export default BestBooks;

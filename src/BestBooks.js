import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import "./book.css"
class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */

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
  render() {

    /* TODO: render all the books in a Carousel */
    return (
      <>
      
      <Carousel  >
        {this.state.books.length ? (
           this.state.books.map((item) => {
                return(
                <Carousel.Item >
                  <img
                    className="d-block w-100"
                    src="https://play-lh.googleusercontent.com/DmpYQrVcldrDuz5uyATqGbNvTALsJ1Bg3fpXM0p-VsRNM19osEB9-_ByvdjSbTvZQg=w450-h300-rw"
                    alt={item.title}
                  />
                  <Carousel.Caption>
                    <h3><p>{item.title}</p></h3>
                    <p>{item.description}</p>
                    <p>{item.status}</p>
                  </Carousel.Caption>
                </Carousel.Item>
                )
              })
           
          
        ) : (
          <h3>No Books Found :(</h3>
        )}
         </Carousel>
      </>
    );
      }
  }

export default BestBooks;

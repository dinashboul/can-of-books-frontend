import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
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
    return(
      <div >
        <h1>Book System</h1>
        <Carousel slide={true}>
        {this.state.books.map(item =>{
          return(
              <div style={{ width: "400px" , height :"10px"}}>
           
               
               <Carousel.Item interval={500}>
        <Carousel.Caption>
        <h3> Books title:{item.title}</h3>
            <p>{item.description}</p>
             <p>{item.status}</p>
        </Carousel.Caption>
      </Carousel.Item>
    
        
      </div>
          )
        })}
          </Carousel>
      </div>
    )
      }
  }

export default BestBooks;

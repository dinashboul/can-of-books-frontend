import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';

class Profile extends Component {
  render() {
    const { user } = this.props.auth0;
   {console.log(user)};
    return <div>
        <p>Hello to our App {user.name}</p>
        <p>Email: {user.email}</p>
    </div>;
  }
}

export default withAuth0(Profile);
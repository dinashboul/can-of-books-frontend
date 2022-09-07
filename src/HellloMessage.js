import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import { Alert } from 'react-bootstrap';


class HelloMessage extends React.Component {
    render() {
    return(
<div> 
<Alert variant="success" > Hello to Our App : Please Sign in to show Your Books</Alert>
</div>

    )
}

}

export default withAuth0(HelloMessage);
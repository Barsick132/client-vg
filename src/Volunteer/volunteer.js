import React from 'react'
import {Jumbotron, Container} from 'react-bootstrap';

export default class Volunteer extends React.Component {

    constructor() {
        super();

        document.title = "Voice Gen. Vol.";
    }

    render() {
        return (
            <div>
                <Container className="d-flex align-items-center"
                           style={{height: "100vh"}}>
                    <Jumbotron className="m-2 w-100">
                        <h1 className="display-4">Form Login</h1>
                    </Jumbotron>
                </Container>
            </div>
        );
    }
}
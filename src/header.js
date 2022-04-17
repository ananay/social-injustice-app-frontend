import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss'
import {FaPaypal} from 'react-icons/fa'
import "@vetixy/circular-std"

const Header = (props) => {
    return (
        <div>
            <Navbar className="navbar" variant="dark">
                <Container>
                    <Navbar.Brand href="/">
                        <span className={"paypal_logo"}><FaPaypal /></span>
                        <span className={"app_name"}>Social Injustice Index</span>
                    </Navbar.Brand>
                    <Nav className="me-right">
                        <Nav.Link className={props.active == "home" ? "link active" : "link"} href="/">Home</Nav.Link>
                        <Nav.Link className={props.active == "about" ? "link active" : "link"} href="/about">About this project</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            {props.children}
        </div>
    )
}

export default Header
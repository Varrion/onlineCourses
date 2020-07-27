import React from "react";
import {Navbar} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './../index.css';
import {faFacebook, faFlickr, faInstagram, faLinkedin, faPinterest} from "@fortawesome/free-brands-svg-icons"

export default function Footer() {
    return (
        <div className="footer">
            <Navbar className="justify-content-center" collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/" style={{paddingLeft: 10, fontFamily: 'arial'}}>
                    Breaking News
                </Navbar.Brand>
                <div>
                    <a style={{paddingRight: '7px'}} href="/"><FontAwesomeIcon icon={faFacebook}/></a>
                    <a style={{paddingRight: '7px'}} href="/"><FontAwesomeIcon icon={faPinterest}/></a>
                    <a style={{paddingRight: '7px'}} href="/"><FontAwesomeIcon icon={faInstagram}/></a>
                    <a style={{paddingRight: '7px'}} href="/"><FontAwesomeIcon icon={faFlickr}/></a>
                    <a style={{paddingRight: '7px'}} href="/"><FontAwesomeIcon icon={faLinkedin}/></a>
                </div>
            </Navbar>
        </div>
    )
}

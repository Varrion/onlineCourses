import React from "react";
import {Navbar} from "react-bootstrap";
import './../index.css';
import SocialMediaIcons from "./SocialMediaIcons";

export default function Footer() {
    return (
        <div className="footer">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/" style={{paddingLeft: 10, fontFamily: 'arial'}} className={"text-left"}>
                    eCourses
                </Navbar.Brand>
                <div className="flex-column position-relative m-auto">
                    <span>follow us</span>
                    <div className="ml-1">
                        <SocialMediaIcons/>
                    </div>
                </div>
            </Navbar>
        </div>
    )
}

import React, {useEffect, useState} from "react";
import {Nav, Navbar} from "react-bootstrap";
import {Link, navigate} from '@reach/router';
import NavDropdown from "react-bootstrap/NavDropdown";
import axios from '../axiosConfig/axiosConfig'

export default function Header() {

    const [categories, setCategories] = useState(null);

    useEffect(() => {
        axios.get("category")
            .then(response => setCategories(response.data))
            .catch(error => console.log(error))
    }, [])

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand style={{cursor: "pointer"}} onClick={() => navigate('/')}>eCourses</Navbar.Brand>
                <Nav className="mr-auto">
                    <Link to="/courses" className="nav-link"> Courses </Link>
                    <NavDropdown title="Categories" id="categories-dropdown">
                        {categories && categories.map((category, index) =>
                            <Link className="dropdown-item" to={`category/${category.id}`} key={index}>{category.name}</Link>)}
                        <NavDropdown.Divider/>
                        <Link className={"dropdown-item"} to={"category/add"}>Add Category</Link>
                    </NavDropdown>
                </Nav>
                <Nav>
                    <Link to="/login" className="nav-link"> Login</Link>
                    <Link to="/register" className="nav-link"> Register </Link>
                </Nav>
            </Navbar>
        </>
    )
}
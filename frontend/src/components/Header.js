import React, {useEffect, useState} from "react";
import {Button, Nav, Navbar} from "react-bootstrap";
import {Link, navigate} from '@reach/router';
import NavDropdown from "react-bootstrap/NavDropdown";
import axios from '../axiosConfig/axiosConfig'

export default function Header(props) {

    const [categories, setCategories] = useState(null);

    useEffect(() => {
        axios.get("category")
            .then(response => setCategories(response.data))
            .catch(error => console.log(error))
    }, [props.loggedUser])


    const logoutUser = () => {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("instructor");
        props.setLoggedUser(null);
        navigate("/login")
            .then(() => window.location.reload())
    };

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand style={{cursor: "pointer"}} onClick={() => navigate('/')}>eCourses</Navbar.Brand>
                <Nav className="mr-auto">
                    <Link to="/courses" className="nav-link"> Courses </Link>
                    <NavDropdown title="Categories" id="categories-dropdown">
                        {categories && categories.map((category, index) =>
                            <Link className="dropdown-item" to={`category/${category.id}`}
                                  key={index}>{category.name}</Link>)}
                        <NavDropdown.Divider/>
                        { props.loggedUser?.isInstructor && <Link className={"dropdown-item"} to={"category/add"}>Add Category</Link> }
                    </NavDropdown>
                </Nav>
                <Nav>
                    {!props.loggedUser
                        ? <>
                            <Link to="/login" className="nav-link"> Login</Link>
                            <Link to="/register" className="nav-link"> Register </Link>
                        </>
                        : <NavDropdown alignRight title={props.loggedUser?.name} id="profile-dropdown">
                            <Link className="dropdown-item" to={`user/${props.loggedUser.username}`} state={{ loggedUser: props.loggedUser}}>
                                Profile Details</Link>
                            {!props.loggedUser.isInstructor && <Link className="dropdown-item" to={`user/${props.loggedUser.id}/cart`}>
                                Shopping Cart</Link> }
                            <NavDropdown.Divider/>
                            <Button variant="link" onClick={logoutUser} className={"dropdown-item"}>Logout</Button>
                        </NavDropdown>}
                </Nav>
            </Navbar>
        </>
    )
}
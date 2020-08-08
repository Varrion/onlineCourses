import React, {useEffect, useState} from "react";
import axios from "../../../axiosConfig/axiosConfig"
import Button from "react-bootstrap/Button";
import StripeCheckout from 'react-stripe-checkout';
import Table from "react-bootstrap/Table";
import EmptyCart from "../../../assets/images/rsz_empty-cart.png"
import {Link} from "@reach/router";

export default function UserShoppingCart(props) {

    const [coursesInShoppingCart, setCoursesInShoppingCart] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [deleteCourse, setDeleteCourse] = useState(false);

    const initialRequest = {
        customerId: props.loggedUser?.id,
        email: '',
        token: '',
        amount: 0,
    }

    const publishableStripeKey = 'pk_test_51HCrb4D91Y2Imm1bXKM17hthwdzbY5W8r3e2bCXFQY0ifZHPnbptfL2hEHL1g4EoxBu3SRU2E5W0yVg8sewXHBsQ00fRpqLFzM';
    const [requestPayment, setRequestPayment] = useState(initialRequest)

    useEffect(() => {
        let total = 0;
        axios.get(`courses/cart/${props.userId}`)
            .then(res => {
                let data = res.data;
                setCoursesInShoppingCart(data);
                data.forEach(course => {
                    total += course.price;
                });
                setTotalPrice(total);
            })
            .catch(err => console.log(err))
        setDeleteCourse(false);
    }, [deleteCourse, props.loggedUser])

    const deleteCourseFromCart = course => {
        axios.put(`user/${props.userId}/cart`, course)
            .then(() => {
                setDeleteCourse(true);
            })
    }

    const onToken = token => {
        requestPayment.amount = totalPrice;
        requestPayment.email = props.loggedUser.email;
        requestPayment.token = token.id;
        requestPayment.customerId = props.loggedUser.id;
        axios.post("user/payment", requestPayment)
            .then(() => alert("success"))
    }

    return (
        <div className="container containerDiv">
            {coursesInShoppingCart && coursesInShoppingCart.length ?
            <>
                <h2>Shopping Cart</h2>

                <Table className="mt-3 mb-3" responsive bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Course Name</th>
                        <th>Course Price</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {coursesInShoppingCart.map((course, index) =>
                        <tr key={course.id}>
                            <td>{index + 1}</td>
                            <td>{course.name}</td>
                            <td>{course.price !== 0 ? course.price : "FREE"}</td>
                            <td><Button onClick={() => deleteCourseFromCart(course)} className="rounded-content"
                                        variant="danger">Remove from cart</Button></td>
                        </tr>)}
                    <tr>
                        <td colSpan={4} className="text-right"><p>Total: {totalPrice} <i className="fa fa-euro-sign"/>
                        </p></td>
                    </tr>
                    </tbody>
                </Table>

                <StripeCheckout
                    amount={totalPrice}
                    billingAddress
                    shippingAddress
                    description={`Total Price to pay is ${totalPrice}`}
                    locale="auto"
                    name="YourDomain.tld"
                    panelLabel="Pay Now"
                    currency="USD"
                    stripeKey={publishableStripeKey}
                    token={onToken}
                    zipCode
                />
            </> : <div>
                    <img src={EmptyCart} alt="empty cart"/>
                    <p>
                        Go to <Link to={"/courses"}>courses </Link>
                        to make a purchase
                    </p>
                </div>}
        </div>
    )
}
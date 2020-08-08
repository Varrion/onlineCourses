import React, {useEffect, useState} from "react";
import axios from "../../../axiosConfig/axiosConfig"
import Button from "react-bootstrap/Button";
import StripeCheckout from 'react-stripe-checkout';

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
        <div>
            Shopping Cart
            {coursesInShoppingCart && coursesInShoppingCart.length && coursesInShoppingCart.map((course) =>
                <div key={course.id}>
                    {course.name} <Button onClick={() => deleteCourseFromCart(course)} variant="danger">X</Button>
                </div>)}

            <p>Total Price: {totalPrice}$</p>

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
        </div>
    )
}
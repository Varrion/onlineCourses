import React, {useEffect, useState} from "react";
import axios from "../../../axiosConfig/axiosConfig"

export default function UserShoppingCart(props) {

    const [shoppingCart, setShoppingCart] = useState(null);

    useEffect(() => {
        axios.get(`user/${props.userId}/cart`)
            .then(res => setShoppingCart(res.data))
            .catch(err => console.log(err))
    },[])

    return (
        <div>
            Shopping Cart
        </div>
    )
}
import React, {useEffect, useState} from "react";
import axios from "../../axiosConfig/axiosConfig";
import Badge from "react-bootstrap/Badge";

export default function CustomerInfo(props) {

    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get(`user/${props.username}`)
            .then(res => {
                setUser(res.data);
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            User Info

            {user && <div>
                <p>{user.name} {user.isInstructor && <Badge variant="info">Instructor</Badge>} </p>
                <p>{user.surname}</p>
                <p>{user.email}</p>
                {user.username}
                {user.picture && <img src={"data:image/jpeg;base64," + user.picture} alt="user"/>}
            </div>}
        </div>)
}
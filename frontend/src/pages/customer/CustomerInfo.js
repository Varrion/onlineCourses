import React, {useEffect, useState} from "react";
import axios from "../../axiosConfig/axiosConfig";
import Badge from "react-bootstrap/Badge";

export default function CustomerInfo(props) {

    const [user, setUser] = useState(null);
    const [ownedCourses, setOwnedCourses] = useState(null);

    useEffect(() => {
        axios.get(`user/${props.username}`)
            .then(res => {
                setUser(res.data);
            })
            .catch(err => console.log(err))

        if (props.location.state.loggedUser) {
            axios.get(`user/${props.location.state.loggedUser.id}/owned-courses`)
                .then(res => {
                    setOwnedCourses(res.data)
                })
                .catch(err => console.log(err))
        }
    }, [props.location.state.loggedUser, props.username])

    return (
        <div>
            User Info

            {user && <div>
                <p>{user.name} {user.isInstructor && <Badge variant="info">Instructor</Badge>} </p>
                <p>{user.surname}</p>
                <p>{user.email}</p>
                Username: {user.username}
                {user.picture && <img src={"data:image/jpeg;base64," + user.picture} alt="user"/>}
            </div>}

            {ownedCourses && ownedCourses.length && ownedCourses.map(course =>
                <div key={course.id}>
                    Course : {course.name}
                </div>)}
        </div>)
}
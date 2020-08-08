import React, {useEffect, useState} from "react";
import ReactStars from "react-rating-stars-component/dist/react-stars";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "../axiosConfig/axiosConfig"

export default function AddUpdateReactRating(props) {

    const initialRating = {
        comment: '',
        rating: 0,
        customerId: props.loggedUser.id
    }
    const [rating, setRating] = useState(initialRating);

    const ratingChanged = newRating => {
        setRating({...rating, rating: newRating});
    }

    useEffect(() => {
        setRating(initialRating);
    }, [])

    const handleChange = name => event => {
        setRating({...rating, [name]: event.target.value});
    }

    const handleSubmit = event => {
        event.preventDefault();

        axios.post(`/courses/${props.course.id}/ratings`, rating)
            .then(() => {
                window.location.reload()
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <div className="flex-space_between">
                    <Form.Label>Rate:</Form.Label>
                    <ReactStars
                        onChange={ratingChanged}
                        count={5}
                        size={36}
                        value={rating.rating}
                        activeColor="#ffd700"
                    />
                </div>


                <Form.Control value={rating.comment} onChange={handleChange("comment")} as="textarea"
                              rows="5"
                              placeholder="Add Comment for this course"/>
                <Button className="float-right mt-3" variant="primary" type="submit">
                    Submit rating
                </Button>
            </Form>
        </div>
    )
}
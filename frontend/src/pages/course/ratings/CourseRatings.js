import React from "react";
import AddUpdateCourseRating from "../../../components/AddUpdateCourseRating";
import ReactStars from "react-rating-stars-component";
import RatingMapper from "../../../components/RatingMapper";
import axios from "../../../axiosConfig/axiosConfig"
import Button from "react-bootstrap/Button";

export default function CourseRatings(props) {

    const deleteRating = ratingId => () => {
        axios.delete(`courses/${props.course.id}/ratings/${ratingId}`)
            .then(() => window.location.reload())
            .catch(err => console.log(err))
    }

    return (
        <div>
            Course Ratings
            {props.ratings && props.ratings.length
                ? props.ratings.map((rating, index) => <div key={index}>
                        <ReactStars
                            count={5}
                            size={30}
                            edit={false}
                            value={RatingMapper(rating.rating)}
                            activeColor="#ffd700"
                        />
                        <div className="flex-space_between">
                            <p className="text-left">User: {rating.customer?.name}</p>
                            {props.loggedUser.id === rating.customer?.id
                            && <Button size="sm" variant="outline-secondary" onClick={deleteRating(rating.id)}
                                       className="text-right rounded-content">X</Button>}
                        </div>
                        <p className="text-left">Comment: {rating.comment}</p>
                    </div>
                )
                : <p>No ratings are available</p>}
            <hr width="650" align="center"/>
            {props.loggedUser && <AddUpdateCourseRating loggedUser={props.loggedUser} course={props.course}/>}
        </div>
    )
}
import React, {useEffect, useState} from "react";
import AddUpdateCourseRating from "../../../components/AddUpdateCourseRating";
import ReactStars from "react-rating-stars-component";
import RatingMapper from "../../../components/RatingMapper";
import axios from "../../../axiosConfig/axiosConfig"
import Button from "react-bootstrap/Button";

export default function CourseRatings(props) {

    const [courseRatings, setCourseRatings] = useState(null);

    useEffect(() => {
        axios.get(`courses/${props.courseId}/ratings`)
            .then(res => {
                setCourseRatings(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const deleteRating = ratingId => () => {
        axios.delete(`courses/${props.course.id}/ratings/${ratingId}`)
            .then(() => window.location.reload())
            .catch(err => console.log(err))
    }

    return (
        <div>
            Course Ratings
            {courseRatings && courseRatings.length
                ? courseRatings.map((rating, index) => <div key={index}>
                        <ReactStars
                            count={5}
                            size={30}
                            edit={false}
                            value={RatingMapper(rating.rating)}
                            activeColor="#ffd700"
                        />
                        <div className="flex-space_between">
                            <p className="text-left">User: {rating.customer?.name}</p>
                            {props.loggedUser && props.loggedUser.id === rating.customer?.id
                            && <Button size="sm" variant="outline-secondary" onClick={deleteRating(rating.id)}
                                       className="text-right rounded-content">X</Button>}
                        </div>
                        <p className="text-left">Comment: {rating.comment}</p>
                    </div>
                )
                : <p>No ratings are given yet</p>}

            {props.loggedUser && !props.loggedUser.isInstructor && (props.isCourseOwned || props.course.isFree)
            && <>
                <hr width="650" align="center"/>
                <AddUpdateCourseRating loggedUser={props.loggedUser} course={props.course}/>
            </>}
        </div>
    )
}
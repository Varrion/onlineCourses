import React, {useEffect} from "react";
import AddUpdateCourseRating from "../../../components/AddUpdateCourseRating";
import ReactStars from "react-rating-stars-component";
import Ratings from "../../../components/StarRating";
import RatingMapper from "../../../components/RatingMapper";

export default function CourseRatings(props) {

    useEffect(() => {
        console.log(props.ratings);
    },[])

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
                    <p className="text-left">Comment: {rating.comment}</p>
                    </div>
                )
                : <p>No ratings are available</p>}
                <hr width="650" align="center"/>
            <AddUpdateCourseRating courseId={props.courseId}/>
        </div>
    )
}
import React, {useEffect, useState} from "react";
import axios from "../../../axiosConfig/axiosConfig"
import AddUpdateCourse from "../../../components/AddUpdateCourse";
import Button from "react-bootstrap/Button";

export default function Category(props) {
    const [category, setCategory] = useState(null);
    const [courses, setCourses] = useState(null);

    const [showAddCourseModal, setShowAddCourseModal] = useState(false);

    useEffect(() => {
        axios.get(`category/${props.categoryId}`)
            .then(res => setCategory(res.data))
            .catch(err => console.log(err))

        axios.get(`courses/category/${props.categoryId}`)
            .then(res => setCourses(res.data))
            .catch(err => console.log(err))

    }, [props.categoryId, showAddCourseModal, props.loggedUser])

    return (
        <div>
            {category && <div>
                <p> Name: {category.name}</p>
                <p> Description : {category.description}</p>
                <Button onClick={() => setShowAddCourseModal(true)}>Add Course </Button>
                <AddUpdateCourse loggedUser={props.loggedUser} showModal={showAddCourseModal}
                                 setShowModal={setShowAddCourseModal} category={category}/>
            </div>}

            {courses && courses.length > 0 ? courses.map((course, index) => <div key={index}>
                <p>Name: {course.name}</p>
                <p>Description: {course.description}</p>
            </div>) : <p>No courses are added in this category</p>}
        </div>
    )
}
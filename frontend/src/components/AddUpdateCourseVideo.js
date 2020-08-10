import React, {useState} from "react";
import {Modal} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "../axiosConfig/axiosConfig";
import Dropzone from "react-dropzone";

function AddUpdateCourseVideo(props) {
    const initialCourseVideo = {
        title: '',
        video: null,
    }
    const [courseVideo, setCourseVideo] = useState(initialCourseVideo);

    const handleChange = name => event => {
        setCourseVideo({...courseVideo, [name]: event.target.value});
    };

    const handleDrop = files => {
        let file = files[0];
        setCourseVideo({...courseVideo, video: file});
    }

    const handleClearDropzone = event => {
        event.stopPropagation();

        setCourseVideo({...courseVideo, video: null})
    }

    const handleSubmit = event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("video", courseVideo.video);
        formData.append("title", courseVideo.title);
        axios.post(`courses/${props.courseId}/videos`, formData)
            .then(() => {
                props.setShowModal(false);
                setCourseVideo(initialCourseVideo);
            })
            .catch(err => console.log(err))
    }


    return (
        <Modal
            size="lg"
            show={props.showModal}
            onHide={() => props.setShowModal(false)}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Course Video
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group controlId="formCourseName">
                        <Form.Label>Title</Form.Label>
                        <Form.Control value={courseVideo.title} onChange={handleChange("title")} type="text"
                                      placeholder="Video title"/>
                    </Form.Group>

                    <div className="row">
                        <div className="col-md-12">
                            <Dropzone accept={".webm"} onDrop={acceptedFiles => handleDrop(acceptedFiles)}>
                                {({getRootProps, getInputProps}) => (
                                    <section className="custom_dropzone">
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            {courseVideo.video ?
                                                <div className="dropzone_text"><p>{courseVideo.video.path}</p>
                                                    <Button className="roundedButton" variant="danger" size="sm"
                                                            onClick={handleClearDropzone}>X</Button>
                                                </div> : <p>Drag & drop your .webm video file here </p>}
                                        </div>
                                    </section>
                                )}
                            </Dropzone>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary" className={"rounded-content"} type="submit">
                        Submit
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddUpdateCourseVideo
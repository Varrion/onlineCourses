import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import {Player} from "video-react";

export default function CourseVideos(props) {
    return (
        <div>
            <Accordion className="text-left" defaultActiveKey={0}>
                {props.videos && props.videos.length
                    ? props.videos.map((video, index) => <Card key={index}>
                        <Accordion.Toggle as={Card.Header} eventKey={video.id}>
                            {video.title}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={video.id}>
                            <Card.Body>
                                <Player
                                    playsInline
                                    src={process.env.PUBLIC_URL + '/videos/' + video.fileName}
                                />
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>)
                    : <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            No videos
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                {!props.course.isFree ? <p> Insert videos for this course</p> : <p> Wait for the instructor to upload videos </p> }
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>}
            </Accordion>
        </div>
    )
}
import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { dummyServices } from '../dummydata';

const HomeScreen = () => {
    return (
        <div>
            <Row>
                {dummyServices.map(service => (
                    <Col key={service._id} sm={12} md={6} lg={4} xl={3}>
                        <Card className="my-3 p-3 rounded h-100">
                            <Link to={`/service/${service._id}`}>
                                <Card.Img src={service.sample_image} variant="top" />
                            </Link>

                            <Card.Body>
                                <Link to={`/service/${service._id}`} className="text-decoration-none">
                                    <Card.Title as="div">
                                        <strong>{service.service_name}</strong>
                                    </Card.Title>
                                </Link>

                                <Card.Text as="div" className="my-3">
                                    <div className="my-2">
                                        {service.rating} / 5 Stars
                                    </div>
                                    <div>{service.description.substring(0, 60)}...</div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default HomeScreen;
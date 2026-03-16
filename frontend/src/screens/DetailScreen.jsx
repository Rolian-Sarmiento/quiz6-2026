import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Alert, Button } from 'react-bootstrap'; 
import { PayPalButtons } from '@paypal/react-paypal-js'; // Only import the Buttons
import { dummyServices } from '../dummydata';

const DetailScreen = () => {
    const { id } = useParams();
    const service = dummyServices.find(s => s._id === id);
    const [paymentSuccess, setPaymentSuccess] = useState(false); 

    if (!service) return <h2>Service not found</h2>;

    const createOrderHandler = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: service.price.toString(),
                    },
                    description: service.service_name, 
                    // Note: In Sandbox, "payee" email must be a valid Sandbox Business email 
                    // or just remove it to pay the default account linked to your Client ID
                },
            ],
        });
    };

    const onApproveHandler = (data, actions) => {
        return actions.order.capture().then((details) => {
            console.log('Transaction completed by', details.payer.name.given_name);
            console.log('Transaction ID:', details.id);
            setPaymentSuccess(true);
            
            // NEXT STEP: Call your Django backend here to save the order
            // axios.post('/api/v1/orders/create/', { orderID: details.id, serviceID: id })
        });
    };

    return (
        <div>
            <Link className="btn btn-light my-3" to="/">
                Go Back
            </Link>
            
            {paymentSuccess && (
                <Alert variant="success">
                    Payment successful! Your service has been booked.
                </Alert>
            )}

            <Row>
                <Col md={6}>
                    <Image src={service.sample_image} alt={service.service_name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{service.service_name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Expert:</strong> {service.name_of_the_expert}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Rating:</strong> {service.rating} / 5
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Description:</strong> {service.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>${service.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Duration:</Col>
                                    <Col>{service.duration_of_service}</Col>
                                </Row>
                            </ListGroup.Item>
                            
                            <ListGroup.Item className="pt-3">
                                {/* If payment isn't successful yet, show the buttons */}
                                {!paymentSuccess ? (
                                    <PayPalButtons 
                                        style={{ layout: "vertical" }}
                                        createOrder={createOrderHandler}
                                        onApprove={onApproveHandler}
                                        onError={(err) => {
                                            console.error("PayPal Error:", err);
                                        }}
                                    />
                                ) : (
                                    <Button variant="success" className="w-100" disabled>
                                        Booked Successfully
                                    </Button>
                                )}
                            </ListGroup.Item>
                            
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default DetailScreen;
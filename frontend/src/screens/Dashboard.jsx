import React, { useState } from 'react';
import { Form, Button, Table, Container, Row, Col, Card } from 'react-bootstrap';
import { dummyServices } from '../dummydata'; 

const Dashboard = () => {
    const [formData, setFormData] = useState({
        service_name: '',
        description: '',
        price: '',
        duration_of_service: '',
        sample_image: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('Adding new service:', formData);
    };

    return (
        <Container>
            <h1 className="my-4">Seller Dashboard</h1>
            <Row>
                <Col md={4}>
                    <Card className="p-3 mb-4">
                        <h3>Add New Service</h3>
                        <Form onSubmit={submitHandler}>
                            <Form.Group className="mb-2" controlId="service_name">
                                <Form.Label>Service Name</Form.Label>
                                <Form.Control type="text" name="service_name" onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} name="description" onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="price">
                                <Form.Label>Price ($)</Form.Label>
                                <Form.Control type="number" name="price" onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="duration_of_service">
                                <Form.Label>Duration (e.g., 2-3 Hours)</Form.Label>
                                <Form.Control type="text" name="duration_of_service" onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="sample_image">
                                <Form.Label>Image Path</Form.Label>
                                <Form.Control type="text" name="sample_image" placeholder="/images/sample.jpg" onChange={handleChange} required />
                            </Form.Group>
                            <Button type="submit" variant="primary" className="w-100">Add Service</Button>
                        </Form>
                    </Card>
                </Col>

                <Col md={8}>
                    <h3>My Listed Services</h3>
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>Service Name</th>
                                <th>Price</th>
                                <th>Duration</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dummyServices.map(service => (
                                <tr key={service._id}>
                                    <td>{service.service_name}</td>
                                    <td>${service.price}</td>
                                    <td>{service.duration_of_service}</td>
                                    <td>
                                        <Button variant="info" className="btn-sm me-2">Edit</Button>
                                        <Button variant="danger" className="btn-sm">Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
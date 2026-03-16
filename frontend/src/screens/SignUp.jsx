import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Container, Alert } from 'react-bootstrap';

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        phone_number: '',
        first_name: '',
        last_name: '',
        location: '',
        gender: '',
        password: '',
        confirm_password: ''
    });
    
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirm_password) {
            setMessage('Passwords do not match');
        } else {
            setMessage(null);
            console.log('Registration data:', formData);
        }
    };

    return (
        <Container className="mt-5" style={{ maxWidth: '600px' }}>
            <h1 className="mb-4">Register Account</h1>
            {message && <Alert variant="danger">{message}</Alert>}
            
            <Form onSubmit={submitHandler}>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="first_name">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" name="first_name" placeholder="First Name" onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="last_name">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" name="last_name" placeholder="Last Name" onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Email" onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="username" placeholder="Username" onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="phone_number">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="text" name="phone_number" placeholder="Phone Number" onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="gender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select name="gender" onChange={handleChange} required>
                                <option value="">Select Gender...</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                                <option value="Prefer not to say">Prefer not to say</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3" controlId="location">
                    <Form.Label>Location (City, State)</Form.Label>
                    <Form.Control type="text" name="location" placeholder="e.g. Angeles City, Pampanga" onChange={handleChange} required />
                </Form.Group>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-4" controlId="confirm_password">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" name="confirm_password" placeholder="Confirm Password" onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                </Row>

                <Button type="submit" variant="primary" className="w-100 mb-3">
                    Register
                </Button>
            </Form>

            <Row className="py-3">
                <Col>
                    Already have an account? <Link to="/login">Log In Here</Link>
                </Col>
            </Row>
        </Container>
    );
};

export default SignUp;
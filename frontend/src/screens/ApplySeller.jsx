import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const ApplySeller = () => {
    const [experience, setExperience] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        // LATER: Dispatch action to submit application to backend
        console.log('Application submitted with experience:', experience);
        setSubmitted(true);
    };

    return (
        <Container className="mt-5" style={{ maxWidth: '600px' }}>
            <h2 className="mb-4">Apply to be a Cleaning Expert (Seller)</h2>
            {submitted ? (
                <Alert variant="success">Your application has been submitted and is pending Admin approval.</Alert>
            ) : (
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="experience">
                        <Form.Label>Why do you want to join, and what is your cleaning experience?</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={5} 
                            placeholder="Detail your professional cleaning experience..." 
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button type="submit" variant="primary">Submit Application</Button>
                </Form>
            )}
        </Container>
    );
};

export default ApplySeller;
import React, { useState } from 'react';
import { Table, Button, Tabs, Tab, Modal, Form, Container } from 'react-bootstrap';

// Dummy Data for the Admin Screen
const dummyUsers = [
    { _id: '1', first_name: 'John', last_name: 'Doe', email: 'john@example.com', role: 'User' },
    { _id: '2', first_name: 'Jane', last_name: 'Smith', email: 'jane@example.com', role: 'Seller' }
];

const dummyApplications = [
    { _id: '101', first_name: 'Alice', last_name: 'Johnson', email: 'alice@example.com', status: 'Pending' }
];

const UserScreen = () => {
    // Modal States
    const [showApprove, setShowApprove] = useState(false);
    const [showDecline, setShowDecline] = useState(false);
    const [currentAppId, setCurrentAppId] = useState(null);
    
    // Form States
    const [merchantId, setMerchantId] = useState('');
    const [declineReason, setDeclineReason] = useState('');

    const handleApproveSubmit = () => {
        console.log(`Approving App ${currentAppId} with Merchant ID: ${merchantId}`);
        setShowApprove(false);
        setMerchantId('');
    };

    const handleDeclineSubmit = () => {
        console.log(`Declining App ${currentAppId} for Reason: ${declineReason}`);
        setShowDecline(false);
        setDeclineReason('');
    };

    return (
        <Container>
            <h1 className="my-4">Admin Dashboard</h1>
            <Tabs defaultActiveKey="users" id="admin-tabs" className="mb-4">
                
                {/* TAB 1: ALL USERS */}
                <Tab eventKey="users" title="Manage Users">
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dummyUsers.map(user => (
                                <tr key={user._id}>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <Button variant="info" className="btn-sm me-2">Edit</Button>
                                        <Button variant="danger" className="btn-sm">Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Tab>

                {/* TAB 2: SELLER APPLICATIONS */}
                <Tab eventKey="applications" title="Seller Applications">
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dummyApplications.map(app => (
                                <tr key={app._id}>
                                    <td>{app.first_name}</td>
                                    <td>{app.last_name}</td>
                                    <td>{app.email}</td>
                                    <td>{app.status}</td>
                                    <td>
                                        <Button 
                                            variant="success" 
                                            className="btn-sm me-2"
                                            onClick={() => { setCurrentAppId(app._id); setShowApprove(true); }}
                                        >
                                            Approve
                                        </Button>
                                        <Button 
                                            variant="danger" 
                                            className="btn-sm"
                                            onClick={() => { setCurrentAppId(app._id); setShowDecline(true); }}
                                        >
                                            Decline
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Tab>
            </Tabs>

            {/* APPROVE MODAL */}
            <Modal show={showApprove} onHide={() => setShowApprove(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Approve Seller Application</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="merchant_id">
                        <Form.Label>Assign PayPal Merchant ID / Email</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter Merchant ID" 
                            value={merchantId} 
                            onChange={(e) => setMerchantId(e.target.value)} 
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowApprove(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleApproveSubmit}>Confirm Approval</Button>
                </Modal.Footer>
            </Modal>

            {/* DECLINE MODAL */}
            <Modal show={showDecline} onHide={() => setShowDecline(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Decline Seller Application</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="decline_reason">
                        <Form.Label>Reason for Declining</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            placeholder="Enter reason..." 
                            value={declineReason} 
                            onChange={(e) => setDeclineReason(e.target.value)} 
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDecline(false)}>Cancel</Button>
                    <Button variant="danger" onClick={handleDeclineSubmit}>Confirm Decline</Button>
                </Modal.Footer>
            </Modal>

        </Container>
    );
};

export default UserScreen;
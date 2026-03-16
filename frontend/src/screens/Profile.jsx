import React from 'react';
import { Row, Col, Container, Card, Table } from 'react-bootstrap';

const dummyOrders = [
    { _id: '501', order_description: 'Deep Vacuum Cleaning', price_paid: 150.00, date_purchased: '2023-10-25' },
    { _id: '502', order_description: 'Kitchen & Appliance Deep Clean', price_paid: 120.00, date_purchased: '2023-11-02' }
];

const Profile = () => {
    return (
        <Container>
            <Row className="mt-4">
                <Col md={4}>
                    <Card className="p-3">
                        <h2>My Profile</h2>
                        <p><strong>Name:</strong> John Doe</p>
                        <p><strong>Email:</strong> john@example.com</p>
                        <p><strong>Phone:</strong> 555-1234</p>
                        <p><strong>Location:</strong> Angeles City, Pampanga</p>
                    </Card>
                </Col>
                <Col md={8}>
                    <h2>My Orders</h2>
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Description (Service Name)</th>
                                <th>Price Paid</th>
                                <th>Date Purchased</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dummyOrders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.order_description}</td>
                                    <td>${order.price_paid}</td>
                                    <td>{order.date_purchased}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
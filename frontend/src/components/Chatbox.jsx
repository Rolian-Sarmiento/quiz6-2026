import React, { useState } from 'react';
import { Card, Button, Form, InputGroup } from 'react-bootstrap';
import axios from 'axios';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'ai', text: 'Hi! I can answer questions about our Professional Cleaning platform. How can I help?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const toggleChat = () => setIsOpen(!isOpen);

    const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    
    const messageToSend = input; 
    
    setInput('');
    setLoading(true);

    try {
        const { data } = await axios.post('http://localhost:8000/api/v1/chat/ask/', { 
        message: messageToSend
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        const aiMessage = { 
            sender: 'ai', 
            text: data.reply 
        };
        setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
        console.error("Full Error Object:", error.response);
        setMessages((prev) => [...prev, { 
            sender: 'ai', 
            text: 'I can see the server, but it gave me an error. Check the terminal!' 
        }]);
    } finally {
        setLoading(false);
    }
};

    return (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
            {isOpen ? (
                <Card style={{ width: '300px', height: '400px', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
                    <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
                        <strong>ProClean AI</strong>
                        <Button variant="close" size="sm" onClick={toggleChat} style={{ filter: 'invert(1)' }}></Button>
                    </Card.Header>
                    
                    <Card.Body style={{ overflowY: 'auto', flex: 1, backgroundColor: '#f8f9fa' }}>
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`mb-2 d-flex ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                                <div style={{
                                    maxWidth: '80%',
                                    padding: '8px 12px',
                                    borderRadius: '15px',
                                    backgroundColor: msg.sender === 'user' ? '#007bff' : '#e9ecef',
                                    color: msg.sender === 'user' ? 'white' : 'black',
                                    fontSize: '0.9rem'
                                }}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {loading && <div className="text-muted small">AI is typing...</div>}
                    </Card.Body>

                    <Card.Footer className="p-2">
                        <Form onSubmit={sendMessage}>
                            <InputGroup>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Ask something..." 
                                    value={input} 
                                    onChange={(e) => setInput(e.target.value)}
                                    disabled={loading}
                                />
                                <Button type="submit" variant="primary" disabled={loading}>Send</Button>
                            </InputGroup>
                        </Form>
                    </Card.Footer>
                </Card>
            ) : (
                <Button 
                    variant="primary" 
                    style={{ borderRadius: '50%', width: '60px', height: '60px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
                    onClick={toggleChat}
                >
                    💬
                </Button>
            )}
        </div>
    );
};

export default Chatbot;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavMenu from './Navigation/NavMenu';
import { Container, Form, Button } from 'react-bootstrap';

const Edit = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
        billingAddress: '',
        homeAddress: '',
        phoneNumber: '',
        promoSubscription: false,
    });

    useEffect(() => {
        // Fetch user data and set it to state
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await fetch('http://localhost:5000/users/allUsers', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const userData = await response.json();
            console.log('Fetched user data:', userData); // Log fetched user data

            // Find user by first name (replace 'John' with the actual first name to search for)
            const user = userData.find(user => user.firstName === 'John');

            if (user) {
                console.log('Found user:', user); // Log the found user
                setUserData(user);
            } else {
                console.error('User not found'); // Log if user is not found
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Button clicked'); // Debug log for button click
    
        try {
            console.log('Starting user update request...'); // Debug log for starting request
    
            const response = await fetch(`http://localhost:5000/users/updateUser/${userData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    password: userData.password,
                    promoSubscription: userData.promoSubscription,
                    // Include other fields as needed
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update user');
            }
    
            const updatedUserData = await response.json();
            console.log('Updated user data:', updatedUserData); // Log updated user data
            
            // Redirect to homepage upon successful update
            navigate('/');
    
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };
    

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: newValue,
        }));
    };

    return (
        <div>
            <NavMenu />
            <Container>
                <h1>Edit Profile</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="firstName"
                            value={userData.firstName || ''}
                            onChange={handleChange}
                            placeholder="Enter your first name"
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="lastName"
                            value={userData.lastName || ''}
                            onChange={handleChange}
                            placeholder="Enter your last name"
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={userData.email || ''}
                            onChange={handleChange}
                            placeholder="Enter your email address"
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={userData.password || ''}
                            onChange={handleChange}
                            placeholder="Enter your password"
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPromoSubscription">
                        <Form.Label>Promo Subscription</Form.Label>
                        <Form.Control
                            as="select"
                            name="promoSubscription"
                            value={userData.promoSubscription || 'NO'}
                            onChange={handleChange}
                        >
                            <option value="YES">YES</option>
                            <option value="NO">NO</option>
                        </Form.Control>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

export default Edit;

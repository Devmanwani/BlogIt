import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';

const UserContext = createContext({
    user: {
        firstName: '',
        lastName: '',
        email: '',
        color: '',
        id: ''
    },
    loading: true
});

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        color: '',
        id: ''
    });
    const [loading, setLoading] = useState(true); // Initialize loading state to true

    useEffect(() => {
        const fetchUserDetails = async () => {
            const url = `${BACKEND_URL}/api/v1/user/getUser`;
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            } finally {
                setLoading(false); // Set loading to false regardless of success or failure
            }
        };

        fetchUserDetails();
    }, []);

    return (
        <UserContext.Provider value={{ user, loading }}>
            {children}
        </UserContext.Provider>
    );
};

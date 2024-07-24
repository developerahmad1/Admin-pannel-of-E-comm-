import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Nopage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/");
    }, [navigate]);

    return null; 
}

export default Nopage;

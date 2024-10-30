import React from 'react';
import { Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/experience.svg';

const { Title, Paragraph } = Typography;

const Home = () => {
    return (
        <div
            className='text-center'
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '80vh',
                textAlign: 'center'
            }}
        >
            <Title level={1}>Welcome to the Content Management Platform</Title>
            <img
                src={backgroundImage}
                alt="Experience Background"
                style={{ maxWidth: '100%', height: 'auto', marginBottom: '20px' }}
            />

            <Paragraph>
                This platform allows you to efficiently manage your content with ease.
                Create, edit, and organize your cards seamlessly.
            </Paragraph>

            <Paragraph>
                With the power of generative AI, you can generate content suggestions to enhance your creative process!
            </Paragraph>

            <Link to="/add-card">
                <Button type="primary" size="large">
                    Get Started
                </Button>
            </Link>
        </div>
    );
};

export default Home;

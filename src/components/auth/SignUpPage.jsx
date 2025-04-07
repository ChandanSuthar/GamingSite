import React from 'react';
import { SignUp } from '@clerk/clerk-react';
import { Container } from 'react-bootstrap';
import '../../styles/auth.css';

const SignUpPage = () => {
  return (
    <Container className="auth-container">
      <div className="auth-box">
        <h1>Create Account</h1>
        <SignUp 
          routing="path" 
          path="/sign-up" 
          signInUrl="/sign-in"
          redirectUrl="/"
          appearance={{
            elements: {
              rootBox: 'auth-form',
              card: 'auth-card',
              headerTitle: 'auth-title',
              headerSubtitle: 'auth-subtitle',
              socialButtonsBlockButton: 'auth-social-button',
              formButtonPrimary: 'auth-submit-button',
              footerActionLink: 'auth-link'
            },
          }}
        />
      </div>
    </Container>
  );
};

export default SignUpPage; 
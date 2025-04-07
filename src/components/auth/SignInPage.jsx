import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import { Container } from 'react-bootstrap';
import '../../styles/auth.css';

const SignInPage = () => {
  return (
    <Container className="auth-container">
      <div className="auth-box">
        <h1>Welcome Back</h1>
        <SignIn 
          routing="path" 
          path="/sign-in" 
          signUpUrl="/sign-up"
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

export default SignInPage; 
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, Form, Button, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../redux/gameSlice';
import { UserButton, useClerk, SignInButton, SignUpButton } from '@clerk/clerk-react';
import '../styles/NavBar.css';

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSignedIn, loaded } = useClerk();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(searchValue));
    navigate('/');
  };

  const handleClearSearch = () => {
    setSearchValue('');
    dispatch(setSearchQuery(''));
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="navbar-custom">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="brand">
          GameHub
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Form className="search-form d-flex mx-auto" onSubmit={handleSearch}>
            <InputGroup>
              <Form.Control
                type="search"
                name="search"
                placeholder="Search games..."
                className="search-input"
                aria-label="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              {searchValue && (
                <Button
                  variant="outline-secondary"
                  className="search-button"
                  onClick={handleClearSearch}
                >
                  Clear
                </Button>
              )}
            </InputGroup>
          </Form>
          <Nav>
            {!loaded ? (
              <div className="auth-loading">Loading authentication...</div>
            ) : isSignedIn ? (
              <>
                <Nav.Link as={Link} to="/library" className="nav-link">
                  Library
                </Nav.Link>
                <Nav.Link as={Link} to="/favorites" className="nav-link">
                  Favorites
                </Nav.Link>
                <div className="user-button-container">
                  <UserButton 
                    appearance={{
                      elements: {
                        userButtonBox: 'user-button-box',
                        userButtonTrigger: 'user-button-trigger',
                        userButtonAvatarBox: 'user-button-avatar-box'
                      }
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                <SignInButton mode="modal">
                  <button className="nav-link btn btn-link">Sign In</button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="nav-link btn btn-link">Sign Up</button>
                </SignUpButton>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar; 
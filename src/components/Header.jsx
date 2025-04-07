import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Navbar, Container, Button } from 'react-bootstrap';
import { searchGames } from '../services/api';
import { setGames, setLoading, setError } from '../redux/gameSlice';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    dispatch(setLoading(true));
    try {
      const data = await searchGames(searchQuery);
      dispatch(setGames(data.results));
      navigate('/');
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Navbar bg="light" expand="lg" className="header">
      <Container>
        <Navbar.Brand href="/" className="me-4">GameHub</Navbar.Brand>
        <Form className="d-flex search-bar" onSubmit={handleSearch}>
          <Form.Control
            type="search"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="outline-primary" type="submit" className="ms-2">
            Search
          </Button>
        </Form>
        <div className="ms-auto d-flex align-items-center">
          <Button variant="link" className="me-3" onClick={() => navigate('/library')}>
            Library
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header; 
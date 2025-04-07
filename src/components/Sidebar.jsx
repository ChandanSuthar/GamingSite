import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Card } from 'react-bootstrap';
import { setFilters, setCurrentPage } from '../redux/gameSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.games.filters);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilters({ [name]: value }));
    dispatch(setCurrentPage(1));
  };

  return (
    <div className="sidebar">
      <Card>
        <Card.Body>
          <h5>Filters</h5>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
              >
                <option value="">All Categories</option>
                <option value="action">Action</option>
                <option value="adventure">Adventure</option>
                <option value="rpg">RPG</option>
                <option value="strategy">Strategy</option>
                <option value="shooter">Shooter</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Release Year</Form.Label>
              <Form.Control
                type="number"
                name="releaseYear"
                value={filters.releaseYear}
                onChange={handleFilterChange}
                placeholder="Enter year"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Popularity</Form.Label>
              <Form.Select
                name="popularity"
                value={filters.popularity}
                onChange={handleFilterChange}
              >
                <option value="">All</option>
                <option value="popular">Popular</option>
                <option value="top-rated">Top Rated</option>
                <option value="new">New Releases</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Sidebar; 
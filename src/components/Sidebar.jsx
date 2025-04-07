import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { setFilters, resetFilters as resetReduxFilters } from '../redux/gameSlice';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const dispatch = useDispatch();
  const currentFilters = useSelector((state) => state.games.filters);
  
  const [filters, setLocalFilters] = useState(currentFilters);
  const [isDirty, setIsDirty] = useState(false);

  // Categories for games
  const categories = [
    'Action',
    'Adventure',
    'RPG',
    'Strategy',
    'Shooter',
    'Puzzle',
    'Racing',
    'Sports',
  ];

  // Popular tags
  const popularTags = [
    'Singleplayer',
    'Multiplayer',
    'Open World',
    'FPS',
    'Horror',
    'Fantasy',
    'Sci-fi',
    'Battle Royale',
  ];

  // Generate years from 2000 to current year
  const years = Array.from(
    { length: new Date().getFullYear() - 1999 },
    (_, i) => new Date().getFullYear() - i
  );

  // Sorting options
  const sortOptions = [
    { value: '-rating', label: 'Rating (High to Low)' },
    { value: 'rating', label: 'Rating (Low to High)' },
    { value: '-released', label: 'Release Date (Newest)' },
    { value: 'released', label: 'Release Date (Oldest)' },
    { value: '-added', label: 'Popularity' },
  ];

  const handleTagToggle = useCallback((tag) => {
    setLocalFilters(prev => {
      const newTags = prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag];
      
      return { ...prev, tags: newTags };
    });
    setIsDirty(true);
  }, []);

  const handleFilterChange = useCallback((key, value) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
    setIsDirty(true);
  }, []);

  const applyFilters = useCallback(() => {
    dispatch(setFilters(filters));
    setIsDirty(false);
  }, [dispatch, filters]);

  const resetFilters = useCallback(() => {
    const defaultFilters = {
      category: '',
      tags: [],
      releaseYear: '',
      ordering: '-rating',
    };
    setLocalFilters(defaultFilters);
    dispatch(resetReduxFilters());
    setIsDirty(false);
  }, [dispatch]);

  useEffect(() => {
    setLocalFilters(currentFilters);
  }, [currentFilters]);

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="filter-section">
          <h3>Categories</h3>
          <Form.Select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="filter-select"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category.toLowerCase()}>
                {category}
              </option>
            ))}
          </Form.Select>
        </div>

        <div className="filter-section">
          <h3>Popular Tags</h3>
          <div className="tags-container">
            {popularTags.map(tag => (
              <Button
                key={tag}
                variant={filters.tags.includes(tag.toLowerCase()) ? 'primary' : 'outline-primary'}
                className="tag-button"
                onClick={() => handleTagToggle(tag.toLowerCase())}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h3>Release Year</h3>
          <Form.Select
            value={filters.releaseYear}
            onChange={(e) => handleFilterChange('releaseYear', e.target.value)}
            className="filter-select"
          >
            <option value="">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Form.Select>
        </div>

        <div className="filter-section">
          <h3>Sort By</h3>
          <Form.Select
            value={filters.ordering}
            onChange={(e) => handleFilterChange('ordering', e.target.value)}
            className="filter-select"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Select>
        </div>

        <div className="filter-actions">
          <Button 
            variant="primary" 
            className="apply-button" 
            onClick={applyFilters}
            disabled={!isDirty}
          >
            Apply Filters
          </Button>
          <Button 
            variant="outline-secondary" 
            className="reset-button" 
            onClick={resetFilters}
            disabled={!Object.values(filters).some(value => 
              Array.isArray(value) ? value.length > 0 : Boolean(value)
            )}
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 
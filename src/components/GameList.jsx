import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Row, Col, Pagination, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getGames } from '../services/api';
import {
  setGames,
  setLoading,
  setError,
  setCurrentPage,
  setTotalPages,
  addToFavorites,
  removeFromFavorites,
} from '../redux/gameSlice';

const GameList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    games,
    loading,
    error,
    currentPage,
    totalPages,
    filters,
    favorites,
  } = useSelector((state) => state.games);

  useEffect(() => {
    const fetchGames = async () => {
      dispatch(setLoading(true));
      try {
        const data = await getGames(currentPage, filters);
        dispatch(setGames(data.results));
        dispatch(setTotalPages(Math.ceil(data.count / 20)));
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchGames();
  }, [currentPage, filters, dispatch]);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handleFavorite = (game, e) => {
    e.stopPropagation();
    if (favorites.some((fav) => fav.id === game.id)) {
      dispatch(removeFromFavorites(game.id));
    } else {
      dispatch(addToFavorites(game));
    }
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-danger">Error: {error}</div>;
  }

  return (
    <div>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {games.map((game) => (
          <Col key={game.id}>
            <Card
              className="game-card h-100"
              onClick={() => navigate(`/game/${game.id}`)}
            >
              <Card.Img
                variant="top"
                src={game.background_image}
                alt={game.name}
              />
              <Card.Body>
                <Card.Title>{game.name}</Card.Title>
                <Card.Text>
                  <small className="text-muted">
                    Released: {new Date(game.released).toLocaleDateString()}
                  </small>
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    {game.genres.map((genre) => (
                      <span key={genre.id} className="badge bg-secondary me-1">
                        {genre.name}
                      </span>
                    ))}
                  </div>
                  <button
                    className="btn btn-link"
                    onClick={(e) => handleFavorite(game, e)}
                  >
                    {favorites.some((fav) => fav.id === game.id) ? '❤️' : '🤍'}
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.Prev
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            />
            {[...Array(totalPages)].map((_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default GameList; 
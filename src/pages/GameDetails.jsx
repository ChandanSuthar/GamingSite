import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getGameDetails } from '../services/api';
import { addToFavorites, removeFromFavorites } from '../redux/gameSlice';

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.games.favorites);
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const data = await getGameDetails(id);
        setGame(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  const handleFavorite = () => {
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

  if (!game) {
    return <div className="text-center">Game not found</div>;
  }

  return (
    <Container>
      <Button variant="outline-primary" className="mb-4" onClick={() => navigate(-1)}>
        Back to Games
      </Button>

      <Card>
        <Row>
          <Col md={4}>
            <Card.Img
              variant="top"
              src={game.background_image}
              alt={game.name}
              className="h-100"
              style={{ objectFit: 'cover' }}
            />
          </Col>
          <Col md={8}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <Card.Title as="h1">{game.name}</Card.Title>
                <Button
                  variant="link"
                  onClick={handleFavorite}
                  className="fs-4"
                >
                  {favorites.some((fav) => fav.id === game.id) ? '❤️' : '🤍'}
                </Button>
              </div>

              <Card.Text className="mt-3">
                <strong>Released:</strong>{' '}
                {new Date(game.released).toLocaleDateString()}
              </Card.Text>

              <Card.Text>
                <strong>Rating:</strong> {game.rating} / 5
              </Card.Text>

              <div className="mb-3">
                <strong>Genres:</strong>
                <div className="mt-2">
                  {game.genres.map((genre) => (
                    <span key={genre.id} className="badge bg-secondary me-2">
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <strong>Platforms:</strong>
                <div className="mt-2">
                  {game.platforms.map((platform) => (
                    <span key={platform.platform.id} className="badge bg-info me-2">
                      {platform.platform.name}
                    </span>
                  ))}
                </div>
              </div>

              <Card.Text>
                <strong>Description:</strong>
                <div
                  className="mt-2"
                  dangerouslySetInnerHTML={{ __html: game.description }}
                />
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      {game.screenshots && game.screenshots.length > 0 && (
        <div className="mt-4">
          <h3>Screenshots</h3>
          <Row xs={1} md={2} lg={3} className="g-4">
            {game.screenshots.map((screenshot) => (
              <Col key={screenshot.id}>
                <Card>
                  <Card.Img
                    variant="top"
                    src={screenshot.image}
                    alt={`${game.name} screenshot`}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Container>
  );
};

export default GameDetails; 
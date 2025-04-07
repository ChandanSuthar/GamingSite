import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Library = () => {
  const favorites = useSelector((state) => state.games.favorites);
  const navigate = useNavigate();

  return (
    <Container>
      <h2 className="mb-4">My Library</h2>
      {favorites.length === 0 ? (
        <div className="text-center">
          <p>Your library is empty. Add some games to your favorites!</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/')}
          >
            Browse Games
          </button>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {favorites.map((game) => (
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
                  <div>
                    {game.genres.map((genre) => (
                      <span key={genre.id} className="badge bg-secondary me-1">
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Library; 
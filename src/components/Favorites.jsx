import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/Favorites.css';

const Favorites = () => {
  const favorites = useSelector((state) => state.games.favorites);
  const navigate = useNavigate();

  if (favorites.length === 0) {
    return (
      <Container className="favorites-empty">
        <div className="text-center">
          <h2>No Favorite Games Yet</h2>
          <p>Start adding games to your favorites by clicking the heart icon on any game!</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="favorites-container">
      <h1 className="favorites-title">My Favorite Games</h1>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {favorites.map((game) => (
          <Col key={game.id}>
            <Card 
              className="favorite-game-card" 
              onClick={() => navigate(`/game/${game.id}`)}
            >
              <div className="game-card-image">
                <img src={game.background_image} alt={game.name} />
                <div className="game-card-overlay">
                  <span className="rating-badge">
                    {game.rating ? `${Math.round(game.rating * 10) / 10}⭐` : 'N/A'}
                  </span>
                </div>
              </div>
              <Card.Body>
                <Card.Title>{game.name}</Card.Title>
                <div className="game-meta">
                  <span className="release-date">
                    {new Date(game.released).toLocaleDateString()}
                  </span>
                  <div className="genres">
                    {game.genres?.slice(0, 2).map((genre) => (
                      <span key={genre.id} className="genre-tag">
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Favorites; 
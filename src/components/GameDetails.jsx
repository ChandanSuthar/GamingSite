import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { getGameDetails } from '../services/api';
import '../styles/GameDetails.css';

const GameDetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        setLoading(true);
        const data = await getGameDetails(id);
        setGame(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

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
    <Container className="game-details-container">
      <Row className="game-details-header">
        <Col>
          <h1 className="game-title">{game.name}</h1>
          <div className="game-meta">
            <span className="release-date">
              Released: {new Date(game.released).toLocaleDateString()}
            </span>
            <span className="rating">
              Rating: {game.rating ? `${Math.round(game.rating * 10) / 10}/5` : 'N/A'}
            </span>
          </div>
        </Col>
      </Row>

      <Row className="game-details-content">
        <Col md={8}>
          <div className="game-image-container">
            <img
              src={game.background_image}
              alt={game.name}
              className="game-detail-image"
            />
          </div>
          <div className="game-description">
            <h2>About</h2>
            <div dangerouslySetInnerHTML={{ __html: game.description }} />
          </div>
        </Col>
        <Col md={4}>
          <div className="game-info-sidebar">
            <div className="info-section">
              <h3>Genres</h3>
              <div className="tags">
                {game.genres?.map(genre => (
                  <span key={genre.id} className="tag">{genre.name}</span>
                ))}
              </div>
            </div>

            <div className="info-section">
              <h3>Platforms</h3>
              <div className="tags">
                {game.platforms?.map(platform => (
                  <span key={platform.platform.id} className="tag">
                    {platform.platform.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="info-section">
              <h3>Developers</h3>
              <div className="tags">
                {game.developers?.map(developer => (
                  <span key={developer.id} className="tag">{developer.name}</span>
                ))}
              </div>
            </div>

            <div className="info-section">
              <h3>Publishers</h3>
              <div className="tags">
                {game.publishers?.map(publisher => (
                  <span key={publisher.id} className="tag">{publisher.name}</span>
                ))}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default GameDetails; 
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import GameCard from './GameCard';
import '../styles/Library.css';

const Library = () => {
  const { user } = useAuth();
  const favorites = useSelector((state) => state.games.favorites);
  const games = useSelector((state) => state.games.games);
  
  const favoriteGames = games.filter(game => favorites.includes(game.id));

  return (
    <Container fluid className="library-container">
      <Row>
        <Col>
          <div className="library-header">
            <h1>My Library</h1>
            <p>Welcome back, {user?.firstName || 'Gamer'}!</p>
          </div>
          {favoriteGames.length === 0 ? (
            <div className="no-games">
              <p>Your library is empty. Start adding some games!</p>
            </div>
          ) : (
            <div className="games-grid">
              {favoriteGames.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Library; 
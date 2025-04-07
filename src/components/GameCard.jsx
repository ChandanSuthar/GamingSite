import React from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleFavorite } from '../redux/gameSlice';
import '../styles/GameCard.css';

const GameCard = ({ game }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.games.favorites);
  const isFavorite = favorites.includes(game.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(game.id));
  };

  return (
    <Card 
      className="game-card" 
      onClick={() => navigate(`/game/${game.id}`)}
    >
      <div className="game-card-image">
        <img src={game.background_image} alt={game.name} />
        <div className="game-card-overlay">
          <div className="game-meta">
            <div className="genres">
              {game.genres?.slice(0, 2).map((genre) => (
                <span key={genre.id} className="genre-tag">
                  {genre.name}
                </span>
              ))}
            </div>
            <span className="rating-badge">
              {game.rating ? Math.round(game.rating * 10) / 10 : 'N/A'} ⭐
            </span>
          </div>
        </div>
        <button
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      <Card.Body>
        <Card.Title>{game.name}</Card.Title>
        <div className="game-meta">
          <span className="release-date">
            {game.released ? new Date(game.released).toLocaleDateString() : 'TBA'}
          </span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default GameCard; 
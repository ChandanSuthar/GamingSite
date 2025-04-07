import React, { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { getGames } from '../services/api';
import {
  setGames,
  appendGames,
  setLoading,
  setError,
  setCurrentPage,
  setHasMore,
} from '../redux/gameSlice';
import GameCard from './GameCard';
import Sidebar from './Sidebar';
import '../styles/GameList.css';

const GameList = () => {
  const dispatch = useDispatch();
  const {
    games,
    loading,
    error,
    currentPage,
    hasMore,
    searchQuery,
    filters,
  } = useSelector((state) => state.games);

  const observer = useRef();
  const loadingRef = useRef(false);

  const lastGameElementRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingRef.current) {
          dispatch(setCurrentPage(currentPage + 1));
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, currentPage, dispatch]
  );

  const loadGames = useCallback(async () => {
    if (loadingRef.current) return;
    
    try {
      loadingRef.current = true;
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await getGames({
        page: currentPage,
        search: searchQuery,
        ...filters,
      });
      
      if (currentPage === 1) {
        dispatch(setGames(response.results));
      } else {
        dispatch(appendGames(response.results));
      }
      dispatch(setHasMore(response.hasMore));
    } catch (err) {
      dispatch(setError('Failed to fetch games. Please try again later.'));
      dispatch(setHasMore(false));
    } finally {
      dispatch(setLoading(false));
      loadingRef.current = false;
    }
  }, [currentPage, searchQuery, filters, dispatch]);

  useEffect(() => {
    loadGames();
  }, [loadGames]);

  useEffect(() => {
    // Cleanup observer on unmount
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  if (error) {
    return (
      <Container fluid className="game-list-container">
        <Row>
          <Col md={3} className="sidebar-col">
            <Sidebar />
          </Col>
          <Col md={9} className="games-col">
            <div className="error-message">{error}</div>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid className="game-list-container">
      <Row>
        <Col md={3} className="sidebar-col">
          <Sidebar />
        </Col>
        <Col md={9} className="games-col">
          {games.length === 0 && !loading ? (
            <div className="no-results">No games found</div>
          ) : (
            <div className="games-grid">
              {games.map((game, index) => {
                if (games.length === index + 1) {
                  return (
                    <div ref={lastGameElementRef} key={game.id}>
                      <GameCard game={game} />
                    </div>
                  );
                }
                return <GameCard key={game.id} game={game} />;
              })}
            </div>
          )}
          {loading && (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading more games...</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default GameList; 
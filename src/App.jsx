import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

// Components
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import GameList from './components/GameList';
import GameDetails from './pages/GameDetails';
import Library from './pages/Library';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Header />
          <div className="main-content">
            <Sidebar />
            <main className="content">
              <Routes>
                <Route path="/" element={<GameList />} />
                <Route path="/game/:id" element={<GameDetails />} />
                <Route path="/library" element={<Library />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App; 
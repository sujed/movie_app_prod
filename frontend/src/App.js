import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Container from 'react-bootstrap/Container';

import HomeScreen from './screens/HomeScreen';
import NewMovieScreen from './screens/NewMovieScreen';
import EditMovieScreen from './screens/EditMovieScreen';
import MovieScreen from './screens/MovieScreen';

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <main className="mt-2">
          <Route path="/" component={HomeScreen} exact />
          <Route path="/movies/:id" component={MovieScreen} exact />
          <Route path="/movies/:id/edit" component={EditMovieScreen} />
          <Route path="/add" component={NewMovieScreen} />
        </main>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;

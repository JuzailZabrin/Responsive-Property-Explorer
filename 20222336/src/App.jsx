import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SearchPage from './components/SearchPage';
import PropertyDetails from './components/PropertyDetails';
import FavoritesList from './components/FavoritesList'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { FavoritesProvider } from './components/FavoritesContext'; 

function App() {
  return (
    <Router>
      <DndProvider backend={HTML5Backend}>
        <FavoritesProvider>
          <div className="min-h-screen flex flex-col bg-gray-100">
            {}
            <Navbar />

            {/* Main Content */}
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                {/* Route for the search page */}
                <Route path="/" element={<SearchPage />} />

                {/* Route for property details */}
                <Route path="/property/:id" element={<PropertyDetails />} />

                {/* Route for favorites list */}
                <Route path="/favorites" element={<FavoritesList />} />
              </Routes>
            </main>

            {}
            <Footer />
          </div>
        </FavoritesProvider>
      </DndProvider>
    </Router>
  );
}

export default App;

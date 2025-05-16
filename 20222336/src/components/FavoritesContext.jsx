import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for favorites
const FavoritesContext = createContext(null); // Initialized with null for safety

// Provider component to manage favorites state and functionality
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      // Retrieve saved favorites from localStorage, or default to an empty array
      const savedFavorites = localStorage.getItem('favorites');
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.error('Error parsing favorites from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      // Save updated favorites to localStorage
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }, [favorites]);

  const addToFavorites = (property) => {
    setFavorites((prev) => {
      if (!property || !property.id) {
        console.warn('Invalid property provided to addToFavorites:', property);
        return prev; // Prevent adding invalid data
      }
      // Add property to favorites if it doesn't already exist
      if (!prev.some((p) => p.id === property.id)) {
        return [...prev, property];
      }
      return prev;
    });
  };

  const removeFromFavorites = (propertyId) => {
    setFavorites((prev) => {
      // Filter out the property with the given ID
      return prev.filter((p) => p.id !== propertyId);
    });
  };

  const clearFavorites = () => {
    setFavorites([]); // Clear the favorites list
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

// Custom hook to access favorites context
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}

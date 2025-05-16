import React from 'react';
import { useDrop } from 'react-dnd';
import { Link } from 'react-router-dom';
import { useFavorites } from '../components/FavoritesContext';

function FavoritesList() {
  const { favorites, removeFromFavorites, clearFavorites, addToFavorites } = useFavorites();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'property',
    drop: (item) => addToFavorites(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`bg-white p-4 rounded-lg shadow-md ${
        isOver ? 'bg-blue-50' : ''
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Favorites</h2>
        {favorites && favorites.length > 0 && (
          <button
            onClick={clearFavorites}
            className="text-red-500 hover:text-red-600"
          >
            Clear All
          </button>
        )}
      </div>

      {(!favorites || favorites.length === 0) ? (
        <p className="text-gray-500">
          Drag properties here to add to favorites.
        </p>
      ) : (
        <div className="space-y-4">
          {favorites.map((property) => (
            <div
              key={property.id}
              className="flex items-center justify-between p-2 border rounded hover:shadow-lg transition-shadow"
            >
              <div>
                <Link
                  to={`/property/${property.id}`}
                  className="text-blue-500 hover:text-blue-600"
                >
                  {property.title || 'Untitled Property'}
                </Link>
                <p className="text-sm text-gray-600">
                  Rs {property.price ? property.price.toLocaleString() : 'N/A'}
                </p>
              </div>
              <button
                onClick={() => removeFromFavorites(property.id)}
                className="text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesList;

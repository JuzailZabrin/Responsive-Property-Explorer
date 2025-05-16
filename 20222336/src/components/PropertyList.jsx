import React from 'react';
import { Link } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { useFavorites } from '../components/FavoritesContext';

function PropertyCard({ property }) {
  const { addToFavorites, favorites } = useFavorites();
  const isInFavorites = favorites.some(fav => fav.id === property.id);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'property',
    item: property,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`bg-white rounded-lg shadow-md overflow-hidden ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <img
        src={property.images[0]}
        alt={property.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
        <p className="text-gray-600 mb-2">{property.shortDescription}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">Rs {property.price.toLocaleString()}</span>
          <Link
            to={`/property/${property.id}`}
            className="text-blue-500 hover:text-blue-600"
          >
            View Details
          </Link>
        </div>
        {!isInFavorites && (
          <button
            onClick={() => addToFavorites(property)}
            className="mt-2 w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add to Favorites
          </button>
        )}
      </div>
    </div>
  );
}

function PropertyList({ properties }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}

export default PropertyList;
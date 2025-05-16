import React, { useState } from 'react';
import SearchForm from './SearchForm';
import PropertyList from './PropertyList';
import FavoritesList from './FavoritesList';
import propertiesData from '../data/properties.json';

function SearchPage() {
  const [searchResults, setSearchResults] = useState(propertiesData.properties);
  const [showFavorites, setShowFavorites] = useState(false);

  const handleSearch = (criteria) => {
    let filtered = propertiesData.properties;

    if (criteria.type && criteria.type !== 'any') {
      filtered = filtered.filter(property => property.type === criteria.type);
    }

    if (criteria.minPrice) {
      filtered = filtered.filter(property => property.price >= criteria.minPrice);
    }

    if (criteria.maxPrice) {
      filtered = filtered.filter(property => property.price <= criteria.maxPrice);
    }

    if (criteria.minBedrooms) {
      filtered = filtered.filter(property => property.bedrooms >= criteria.minBedrooms);
    }

    if (criteria.maxBedrooms) {
      filtered = filtered.filter(property => property.bedrooms <= criteria.maxBedrooms);
    }

    if (criteria.dateFrom) {
      filtered = filtered.filter(property => new Date(property.dateAdded) >= new Date(criteria.dateFrom));
    }

    if (criteria.dateTo) {
      filtered = filtered.filter(property => new Date(property.dateAdded) <= new Date(criteria.dateTo));
    }

    if (criteria.postcode) {
      filtered = filtered.filter(property => 
        property.postcode.toLowerCase().startsWith(criteria.postcode.toLowerCase())
      );
    }

    setSearchResults(filtered);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3">
        <SearchForm onSearch={handleSearch} />
        <div className="mt-6">
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className="mb-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            {showFavorites ? 'Show Search Results' : 'Show Favorites'}
          </button>
          {showFavorites ? (
            <FavoritesList />
          ) : (
            <PropertyList properties={searchResults} />
          )}
        </div>
      </div>
      <div className="lg:col-span-1">
        <FavoritesList />
      </div>
    </div>
  );
}

export default SearchPage;
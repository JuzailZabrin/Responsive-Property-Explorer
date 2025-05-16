import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function SearchForm({ onSearch }) {
  const [formData, setFormData] = useState({
    type: 'any',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    dateFrom: null,
    dateTo: null,
    postcode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: date
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Property Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="any">Any</option>
            <option value="house">House</option>
            <option value="flat">Flat</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-grey-700">Min Price</label>
          <input
            type="number"
            name="minPrice"
            value={formData.minPrice}
            onChange={handleChange}
            min="0" 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Max Price</label>
          <input
            type="number"
            name="maxPrice"
            value={formData.maxPrice}
            onChange={handleChange}
            min="0" 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Min Bedrooms</label>
          <input
            type="number"
            name="minBedrooms"
            value={formData.minBedrooms}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Max Bedrooms</label>
          <input
            type="number"
            name="maxBedrooms"
            value={formData.maxBedrooms}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date From</label>
          <DatePicker
            selected={formData.dateFrom}
            onChange={(date) => handleDateChange(date, 'dateFrom')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date To</label>
          <DatePicker
            selected={formData.dateTo}
            onChange={(date) => handleDateChange(date, 'dateTo')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Postcode Area</label>
          <input
            type="text"
            name="postcode"
            value={formData.postcode}
            onChange={handleChange}
            placeholder="e.g. BR1, NW1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Search Properties
        </button>
      </div>
    </form>
  );
}

export default SearchForm;

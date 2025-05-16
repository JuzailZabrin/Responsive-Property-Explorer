import React from 'react';
import { useParams } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import propertiesData from '../data/properties.json';

function PropertyDetails() {
  const { id } = useParams();
  const property = propertiesData.properties.find((p) => p.id === parseInt(id));

  if (!property) {
    return <div>Property not found</div>;
  }

  const images = property.images.map((image) => ({
    original: image,
    thumbnail: image,
  }));

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-3xl font-bold mb-6">{property.title}</h1>

      {/* Image Gallery */}
      <div className="mb-8">
        <ImageGallery
          items={images}
          showPlayButton={false}
          showFullscreenButton={true}
          showNav={true}
          showThumbnails={true}
        />
      </div>

      {/* Tabs for Description, Floor Plan, and Map */}
      <Tabs>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Map</Tab>
        </TabList>

        {/* Description Tab */}
        <TabPanel>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Property Details</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p><strong>Type:</strong> {property.type}</p>
                <p><strong>Price:</strong> Rs. {property.price.toLocaleString()}</p>
                <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
              </div>
              <div>
                <p><strong>Postcode:</strong> {property.postcode}</p>
                <p><strong>Date Added:</strong> {new Date(property.dateAdded).toLocaleDateString()}</p>
              </div>
            </div>
            <p className="mt-4">{property.longDescription}</p>
          </div>
        </TabPanel>

        {/* Floor Plan Tab */}
        <TabPanel>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Floor Plan</h2>
            <img
              src={property.floorPlan}
              alt="Floor Plan"
              className="max-w-full h-auto"
            />
          </div>
        </TabPanel>

       
      </Tabs>
    </div>
  );
}

export default PropertyDetails;

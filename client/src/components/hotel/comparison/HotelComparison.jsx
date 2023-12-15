// client/src/components/hotel/comparison/HotelComparison.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { ComparisonButton, ComparisonContainer, ComparisonTitle, HotelCardPart } from '../../pagestyles/HotelListStyles';

const HotelComparison = ({ selectedHotelIds }) => {
  const [comparisonResults, setComparisonResults] = useState([]);

  const handleCompareHotels = async () => {
    try {
      const response = await axios.post('/api/compareHotels', {
        hotelIds: selectedHotelIds,
      });
      setComparisonResults(response.data);
    } catch (error) {
      console.error('Failed to compare hotels', error);
    }
  };

  return (
    <ComparisonContainer>
      <div>
        <ComparisonTitle>Hotel Comparison</ComparisonTitle>
        <ComparisonButton onClick={handleCompareHotels} disabled={selectedHotelIds.length < 2}>
        비교하기
        </ComparisonButton>
        {comparisonResults.map((hotel) => (
          <HotelCardPart key={hotel.hotel_id}>
            <h2>{hotel.hotelName}</h2>
            <p>Type: {hotel.hotelType}</p>
            <p>Address: {hotel.hotelAddress}</p>
            <p>Price: {hotel.price}</p>
          </HotelCardPart>
        ))}

      </div>
    </ComparisonContainer>
  );
};

export default HotelComparison;

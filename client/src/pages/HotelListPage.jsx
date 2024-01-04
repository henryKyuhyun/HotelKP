// client/src/pages/HotelListPage.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HotelListContainer, HotelListWrapper, HotelSortButton, HotelSortContainer, Line } from "../components/pagestyles/HotelListStyle";
import HotelCard from '../components/hotel/HotelCard';
import SearchBar from "../components/hotel/search/SearchBar";
import HotelComparison from "../components/hotel/comparison/HotelComparison";
import MainCategory from "../components/main/MainCategory";

export default function HotelListPage() {
  const { accommodationType } = useParams();
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHotelIds, setSelectedHotelIds] = useState([]);

  const fetchHotels = async (type) => {
    
    try {
      const response = await axios.get(`/api/hotelList?hotelType=${type}&searchTerm=${searchTerm}`);
      setHotels(response.data);
    } catch (error) {
      console.error(`Error fetching hotels: ${error}`);
      setError("호텔목록 불러오는데 실패");
    }
  };

  const handleHotelSelect = (hotelId, isSelected) => {
    setSelectedHotelIds((prevSelectedHotelIds) =>
      isSelected
        ? [...prevSelectedHotelIds, hotelId]
        : prevSelectedHotelIds.filter((id) => id !== hotelId)
    );
  };

  useEffect(() => {
    fetchHotels(accommodationType);
  }, [accommodationType, searchTerm]);

  useEffect(() => {
    fetchHotels("all");
  }, [searchTerm]);

  
  const sortHotels =(property)=> {
    let copy = [...hotels]
    copy.sort((a,b)=> {
      if(a[property] > b[property]) return -1
      if(a[property] < b[property]) return 1
      setHotels(copy)
    })
  }

  return (
    <HotelListContainer>
      <SearchBar onSearch={setSearchTerm} />
      <MainCategory />

      <Line />

      <HotelSortContainer>
        <HotelSortButton onClick={() => sortHotels('comments')}>댓글순</HotelSortButton>
        <HotelSortButton onClick={() => sortHotels('average_score')}>별점순</HotelSortButton>
        <HotelSortButton onClick={() => sortHotels('price')}>가격순</HotelSortButton>
      </HotelSortContainer>

      <HotelListWrapper>
      {hotels.map((hotel) => (
        <HotelCard
          key={hotel.hotel_id}
          hotel={hotel}
          showEditButton={true}
          onHotelSelect={handleHotelSelect}
          // average_score={true}
        />
      ))}
      {error && <p>{error}</p>}
      </HotelListWrapper>
      
        <HotelComparison selectedHotelIds={selectedHotelIds} />
    </HotelListContainer>
  );
}
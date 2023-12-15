import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import JoinPage from '../pages/JoinPage';
import UploadHotelPage from '../pages/UploadHotelPage';
import HotelListPage from '../pages/HotelListPage';
import HotelDetailPage from '../pages/HotelDetailPage';
import Mypage from '../pages/Mypage';
import EditHotel from '../components/hotel/EditHotel';
import CheckHotelAdminProfile from '../pages/CheckHotelAdminProfile';

const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/join" element={<JoinPage />} />
            <Route path="/uploadHotel" element={<UploadHotelPage />} />
            <Route path="/HotelList/:accommodationType" element={<HotelListPage />} />
            <Route path="/hotel/:hotelId" element={<HotelDetailPage/>}/> 
            <Route path="/mypage" element={<Mypage/>}/>
            <Route path="/editHotel/:hotelId" element={<EditHotel />}/>
            <Route path="/adminProfile/:userId" element={<CheckHotelAdminProfile />} />
          
        </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
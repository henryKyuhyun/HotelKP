import React, { useEffect, useState } from 'react';
import Header from '../../src/components/shared/header/Header';
import Footer from '../components/shared/footer/Footer';
import styled from "styled-components";
import { MainContiner, MainLayout } from '../components/pagestyles/MainPageStyle';
import MainCategory from '../components/main/MainCategory';
import MainNews from '../components/main/MainNews';
import Chat from '../components/chat/Chat';
import Banner from '../components/shared/banner/Banner';
import axios from 'axios';
import HotelCard from '../components/hotel/HotelCard';


export default function MainPage() {

    const [hotelList, setHotelList] = useState([]);
    const [isChatOpen, setIsChatOpen] = useState(true);
    useEffect(() => {
        axios.get('/api/hotelList')
            .then(response => {
                console.log(response.data,"반응값보자");
                setHotelList(response.data);
            })
            .catch(error => {
                console.error('There was an error', error);
                alert('데이터를 불러오는 데 실패하였습니다. 잠시 후 다시 시도해주세요.');
            });
    },[])
    
    return (
        <MainLayout>
            <MainContiner>
                {/* <Header/> */}
                <div>
                <Banner/>
                </div>
                <MainCategory />
                {/* <Sidebar/> */}
                <MainNews />
            </MainContiner>

            <div>
                {!isChatOpen && <button onClick={() => setIsChatOpen(true)}>채팅 열기</button>} 
                <Chat isChatOpen={isChatOpen} handleChatClose={() => setIsChatOpen(false)}/>
                {/* <Chat/> */}
                <div>
                    {hotelList.map((hotel, index) => (
                    <HotelCard key={index} hotel={hotel} />
                    ))}
                </div>

                <Footer/>
            </div>
        </MainLayout>
    );
}


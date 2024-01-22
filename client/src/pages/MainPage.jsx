import React, { useEffect, useState } from 'react';
import Footer from '../components/shared/footer/Footer';
import styled from "styled-components";
import axios from 'axios';
import { MainContainer, MainLayout, CardContainer, MainWapper, ChatButtonContainer, MainP } from '../components/pagestyles/MainPageStyle';
import MainCategory from '../components/main/MainCategory';
import Chat from '../components/chat/Chat';
import HotelCard from '../components/hotel/HotelCard';
import Banner from '../components/shared/banner/Banner';
import MainHeader from '../components/shared/header/MainHeader';

export default function MainPage() {

    const [hotelList, setHotelList] = useState([]);
    const [isChatOpen, setIsChatOpen] = useState(false);
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
            <MainWapper>
                <MainHeader/>
                <MainContainer>
                    <div>
                    <Banner/>
                    </div>
                    <MainCategory />
                </MainContainer>
            </MainWapper>
            <MainP>빠르고 간편하게 세우는 여행 계획<br/>
테마를 선택하고 대한민국 최고의 여행지로 떠나보세요</MainP>
            <CardContainer>
                
            <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%',margin: '50px 0' }}>
                    {hotelList.map((hotel, index) => (
                    // <HotelCard style={{width:'calc(100% / 5)', marginTop: '50px', marginRight: '50px', marginBottom: '50px', marginLeft: '50px'  }} key={index} hotel={hotel} />
                    <HotelCard style={{width:'calc(20% - 40px)', marginTop: '50px', marginRight: '20px', marginBottom: '50px', marginLeft: '20px'  }} key={index} hotel={hotel} />

                    ))}
                    
                </div>
                
            </CardContainer>
            <ChatButtonContainer>
                {!isChatOpen && 
                    <button onClick={() => setIsChatOpen(true)}>
                        <img src={require("../assets/b.png")}  alt="open chat" />
                    </button>
                }
                <Chat isChatOpen={isChatOpen} handleChatClose={() => setIsChatOpen(false)}/>
            </ChatButtonContainer>
            <Footer/>
        
        </MainLayout>
    );
}

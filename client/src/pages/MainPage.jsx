import React from 'react';
import Header from '../../src/components/shared/header/Header';
import Footer from '../components/shared/footer/Footer';
import styled from "styled-components";
import { MainContiner, MainLayout } from '../components/pagestyles/MainPageStyles';
import MainCategory from '../components/main/MainCategory';
import MainNews from '../components/main/MainNews';
import Chat from '../components/chat/Chat';
import Banner from '../components/shared/banner/Banner';


export default function MainPage() {

    return (
        <MainLayout>
            <MainContiner>
                <Header/>
                <div>
                <Banner/>
                </div>
                <MainCategory />
                {/* <Sidebar/> */}
                <MainNews />
            </MainContiner>

            <div>
            
                <Chat/>
            
                <Footer/>
            </div>
        </MainLayout>
    );
}


import React from 'react';
import { CategoryLayout, CategoryContainer, CategoryLink,CategoryTitle }from "./MainCategoryStyle";

export default function MainCategory({ bgColor }) {
    return (
        <CategoryLayout bgColor={bgColor}>
            <CategoryContainer>
            <CategoryLink to="/hotelList/all">
                <img src={require("../../assets/List.png")}  alt="List" />
                <CategoryTitle>전체 보기</CategoryTitle>
            </CategoryLink>
            </CategoryContainer>
            <CategoryContainer>
                <CategoryLink to="/hotelList/motel">
                    <img src={require("../../assets/Motel.png")}  alt="Motel" />
                    <CategoryTitle>모텔</CategoryTitle>
                </CategoryLink>
            </CategoryContainer>
            <CategoryContainer>
                <CategoryLink to="/hotelList/hotel">
                    <img src={require("../../assets/Hotel.png")}  alt="Hotel" />
                    <CategoryTitle>호텔</CategoryTitle>
                </CategoryLink>
            </CategoryContainer>
            <CategoryContainer>
                <CategoryLink to="/hotelList/pension">
                    <img src={require("../../assets/Pension.png")}  alt="Pension" />
                    <CategoryTitle>펜션</CategoryTitle>
                </CategoryLink>
            </CategoryContainer>
        </CategoryLayout>
    );
}
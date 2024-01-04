import React from 'react';
import { NewsLayout, NewsTitle, NewsList, NewsItem, NewsLink,FeedContainer, FeedTitle, FeedContent } from "./MainNewsStyle";

export default function MainNews() {
  const KANG_MAIN_IMG = process.env.REACT_APP_KANG_MAIN_IMG;
  const PARK_MAIN_IMG = process.env.REACT_APP_PARK_MAIN_IMG;

  return (
    <NewsLayout>
      <NewsTitle>누구업소 news</NewsTitle>

      <NewsList>
        <NewsItem>
          <NewsLink to="/">
            {/* <img src={require("../../assets/Park.jpeg")}  alt="news" /> */}
            <img src={PARK_MAIN_IMG} alt="kyuhyunPhoto" />
            <FeedContainer>
                <FeedTitle>누구업소??</FeedTitle>
                <FeedContent>똑똑 거기 누구업소</FeedContent>
            </FeedContainer>
          </NewsLink>
        </NewsItem>
        <NewsItem>
          <NewsLink to="/">
            {/* <img src={require("../../assets/Kang.jpeg")}  alt="news" /> */}
            <img src={KANG_MAIN_IMG} alt="DayaePhoto" />
            {/* <img src={TESTURI} alt="testuri" /> */}
            <FeedContainer>
                <FeedTitle>누구업소??</FeedTitle>
                <FeedContent>똑똑 거기 누구업소</FeedContent>
            </FeedContainer>
          </NewsLink>
        </NewsItem>
      </NewsList>

    </NewsLayout>
  );
}
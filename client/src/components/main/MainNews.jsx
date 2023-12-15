import React from 'react';
import { NewsLayout, NewsTitle, NewsList, NewsItem, NewsLink,FeedContainer, FeedTitle, FeedContent } from "./MainNewsStyle";

export default function MainNews() {
  return (
    <NewsLayout>
      <NewsTitle>누구업소 news</NewsTitle>

      <NewsList>
        <NewsItem>
          <NewsLink to="/">
            <img src={require("../../assets/Park.jpeg")}  alt="news" />
            <FeedContainer>
                <FeedTitle>누구업소??</FeedTitle>
                <FeedContent>똑똑 거기 누구업소</FeedContent>
            </FeedContainer>
          </NewsLink>
        </NewsItem>
        <NewsItem>
          <NewsLink to="/">
            <img src={require("../../assets/Kang.jpeg")}  alt="news" />
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
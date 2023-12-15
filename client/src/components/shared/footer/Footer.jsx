import React from 'react';
import {
    FooterLayout,
    DeveloperLink,
    LeftContainer,
    RightContainer,
  } from "./FooterStyle";
  


export default function Footer() {
    const developers = [
        {
          name: '박규현',
          github: 'https://github.com/henryKyuhyun'
        },
        {
            name: '강다예',
            github: 'https://github.com/dayaekang'
          },
        ];
    
    
    return (
        <FooterLayout>
            <LeftContainer>
                <span>누구업소👀</span>
                <span>©Who's Inn. ALL RIGHTS RESERVED</span>
            </LeftContainer>

            <RightContainer>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
              {developers.map((dev) => (
                <DeveloperLink to={dev.github} key={dev.name} >
                  {dev.name}
                </DeveloperLink>
              ))}
            </RightContainer>
        </FooterLayout>
    );
}

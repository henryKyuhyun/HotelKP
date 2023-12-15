import styled from "styled-components";
import { Link } from 'react-router-dom';

//CommentContainer Component

export const CommentLayout = styled.div`
    h1{
        font-size: 1.4rem;  
    }
`;

export const CommentTitle = styled.h1`
    font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;
    font-weight: 600;
    font-size: 1.4rem;
    line-height: 1.1rem;
`;

export const FormAndLinkContainer = styled.div`
    position:relative;
    display:flex;
    flex-direction:column;
    justify-content: space-between;
    margin: 2rem 2rem 0 2rem;
`;

export const LinkButton = styled(Link)`
    // position: relative;
    // left: 410px;
    width:110px;
    margin-top:2rem;
    color: #333;
    text-decoration: none;
    background-color: #f2f2f2;
    padding: 1rem ;
    border-radius: 5px;
    font-weight: 600;

    &:hover {
        background-color: #ddd;
        transition: background-color .3s ease-in-out;
    }`;


//CommentCard Component
export const CommentCardContainer = styled.div`
    max-width: 85%;
    margin: 2rem 0 0 2rem;
    flex-direction: column;
    justify-content: space-between;
`;

export const CommentHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    div{
        display: flex;
    }
`;

export const InfoContent = styled.div`
    display: flex;
    flex-direction: column;
`;

export const MemberName = styled.h1`
    font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;
    font-weight: 200;
    font-size: 1.3rem;
    line-height: 1.1rem;
    margin-right:1rem;
`;

export const DateText = styled.span`
    font-size: 0.8rem;
    color: gray;
`;

export const CommentAction = styled.div`
    display: flex;
`;


export const CardContent = styled.p`
    margin-top: 0.5rem;
`;

//CommentForm Component
export const CardFormLayout = styled.div`
    // display: flex;

`;

export const CardForm = styled.form`
    display: flex;
    flex-direction:column;
    div{
        margin-top:1rem;
        display: flex;
    }
`;

export const CardFormInput = styled.input`
    margin-right : 1rem;
    width:90%;
    padding:1rem;
`;

export const CommentButton = styled.button`
    background-color: #006ce4;
    color: #fff;
    border-radius: 10px;
    padding: 3px 20px;
    font-weight: 600;
    white-space: nowrap;
`;

export const CommentEditButton = styled.button`
    margin-right:3px;
    padding: 5px 5px;
    background-color: #006ce4;
    color: #fff;
    border-radius: 8px;
    font-size:10px;
    font-weight: 400;
    white-space: nowrap;
`;


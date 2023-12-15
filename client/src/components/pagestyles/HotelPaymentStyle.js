import styled from "styled-components";

export const PaymentContainer = styled.div`
    padding:30px;
`;

export const PaymentLabel = styled.label`
    font-weight: 600;
    font-size: 1.4rem;
    line-height: 2rem;
    margin-bottom: 15px;
`;

export const PaymentInfo = styled.div`
    display:flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content:space-around;
    font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif;
    font-weight: 500;
    font-size: 1.3rem;
    line-height: 1.1rem;
    border: 3px solid #006ce4; 
    margin-top: 15px;

    div {
        display:flex;
        align-items: center;
        border: 3px solid #006ce4; 
        padding:1.5rem 3rem;
        flex: 1; 
    }

    @media (max-width: 580px) {
        flex-direction: column;
        align-items: center;
        flex-wrap: wrap;

        div {
            width: 100%;
            text-align: center;
            padding: 1.5rem;
        }
    }
`;

export const PaymentLayout = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem 2rem;

`;


export const TotalPrice = styled.h2`
    color: #006ce4;
    font-size: 1.6rem;
    font-weight: 600;
    line-height: normal;
`;

export const SubmitButton = styled.button`
    background-color: #006ce4;
    color: #fff;
    border-radius: 10px;
    padding: 1rem 2rem;
    margin: 2rem;
    font-weight: 600;
    white-space: nowrap;
`;



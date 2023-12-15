import styled from "styled-components";

export const MapLayout = styled.div`
    position: relative;
    padding:30px 30px 50px;

    h1 {
        font-size: 1.4rem;
        line-height: 2rem;
        margin-bottom : 1rem;
    }

    p {
        font-family: Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif !important;
        font-weight: 500;
        font-size: 1rem;
        line-height: 1.25rem;      
        margin-bottom : 0.5rem;
    }

    ::before {
        content:'';
        display:block;
        width:100%;
        border-bottom: 2px solid #e3e3e3;
        position: absolute;
        left:1%;
        top:0;
    }

    ::after {
            content: '';
            display: block;
            width: 100%;
            border-bottom: 2px solid #e3e3e3;
            position: absolute;
            left: 0;
            bottom: 0;
        }
`;

export const MapContainer = styled.div`
    width: 100%;
    height: 350px;
    padding-bottom: 50px;
`;
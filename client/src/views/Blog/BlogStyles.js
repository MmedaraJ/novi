import styled from "styled-components";

export const MainDiv = styled.div`
    display: flex;

    @media screen and (max-width: 768px) {
        display: block;
    }
`;

export const BlogListDiv = styled.div`
    flex: 1;
    order: 0;
`;

export const BlogText = styled.div`
    flex: 3;
    order: 1;
`;

export const P = styled.p`
    font-size: small;
    color: black;
`;
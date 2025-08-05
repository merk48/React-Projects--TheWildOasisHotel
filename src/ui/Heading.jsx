import styled, { css } from "styled-components";

const Heading = styled.h1`
  line-height: 1.4;
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;

      @media (max-width: 768px) {
        font-size: 2.4rem;
      }

      @media (max-width: 640px) {
        font-size: 2rem;
      }
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;

      @media (max-width: 768px) {
        font-size: 1.8rem;
      }

      @media (max-width: 640px) {
        font-size: 1.6rem;
      }
    `}

  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 1.8rem;
      font-weight: 500;

      @media (max-width: 768px) {
        font-size: 1.6rem;
      }

      @media (max-width: 640px) {
        font-size: 1.4rem;
      }
    `}
`;

export default Heading;

import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}

     ${(props) =>
    props.type === "mix" &&
    css`
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1.6rem;

      @media (max-width: 768px) {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 1.6rem;
      }

      @media (max-width: 640px) {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 1.6rem;
      }
    `}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;

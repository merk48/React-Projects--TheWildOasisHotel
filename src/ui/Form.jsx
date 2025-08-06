import styled, { css } from "styled-components";

const Form = styled.form`
  overflow: hidden;
  font-size: 1.4rem;
  ${(props) =>
    props.type !== "modal" &&
    css`
      padding: 2.4rem 4rem;
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);

      @media (max-width: 768px) {
        padding: 1.6rem 2rem;
      }

      @media (max-width: 640px) {
        padding: 1.2rem 1.2rem;
      }
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
      @media (max-width: 1024px) {
        width: 100%;
      }
    `}
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;

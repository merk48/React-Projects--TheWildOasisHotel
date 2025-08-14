import styled, { css } from "styled-components";

/**
 * Props:
 *  - variant: "h1" | "h2" | "h3"   (controls visual size/weight)
 *  - center: boolean               (centers the text)
 *  - as: string (inherited from styled-components) - use for semantic tag
 *
 * Usage examples:
 *  <Heading variant="h1" as="h1" center>Centered H1</Heading>
 *  <Heading variant="h2" as="h2">Left H2</Heading>
 */

const sizes = {
  h1: css`
    font-size: 3rem;
    font-weight: 600;

    @media (max-width: 768px) {
      font-size: 2.4rem;
    }
    @media (max-width: 640px) {
      font-size: 2rem;
    }
  `,
  h2: css`
    font-size: 2rem;
    font-weight: 600;

    @media (max-width: 768px) {
      font-size: 1.8rem;
    }
    @media (max-width: 640px) {
      font-size: 1.6rem;
    }
  `,
  h3: css`
    font-size: 1.8rem;
    font-weight: 500;

    @media (max-width: 768px) {
      font-size: 1.6rem;
    }
    @media (max-width: 640px) {
      font-size: 1.4rem;
    }
  `,
};

const Heading = styled.h1`
  line-height: 1.4;
  margin: 0;

  /* default variant */
  ${(p) => (p.variant ? sizes[p.variant] : sizes.h1)}

  /* center alignment helper */
  ${(p) =>
    p.$center &&
    css`
      text-align: center;
    `}
`;

Heading.defaultProps = {
  variant: "h1",
};

export default Heading;

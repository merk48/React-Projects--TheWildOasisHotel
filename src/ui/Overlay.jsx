import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  inset: 0; /* top/right/bottom/left: 0 */
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
  ${(props) => props.type === "small"}
`;

const Backdrop = styled.div`
  @media (max-width: 640px) {
    display: block;
    position: fixed;
    inset: 0; /* top/right/bottom/left: 0 */
    background: rgba(0, 0, 0, 0.3);
    z-index: 40;
  }
`;

export default Overlay;

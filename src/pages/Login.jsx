import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  /* keep a single column with a fixed max width on large screens */
  grid-template-columns: minmax(0, 48rem);
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
  padding: 6rem 0;

  @media (max-width: 1024px) {
    grid-template-columns: minmax(0, 40rem);
    padding: 4rem 1.6rem;
    gap: 2.4rem;
  }

  @media (max-width: 640px) {
    grid-template-columns: 100%;
    padding: 3rem 1.2rem;
    gap: 1.6rem;
    align-items: start;
  }
`;

const FormWrap = styled.div`
  width: 100%;
  max-width: 48rem;
  margin: 0 auto;

  @media (max-width: 1024px) {
    max-width: 40rem;
  }

  @media (max-width: 640px) {
    max-width: 100%;
  }
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading variant="h1" as="h1" center>
        Log in to your account
      </Heading>
      <FormWrap>
        <LoginForm />
      </FormWrap>
    </LoginLayout>
  );
}

export default Login;

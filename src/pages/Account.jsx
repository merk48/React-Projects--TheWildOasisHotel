import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";

function Account() {
  return (
    <>
      <Row type="mix">
        <Heading as="h1" variant="h1">
          Update your account
        </Heading>
      </Row>
      <Row>
        <UpdateUserDataForm />
      </Row>
      <Row type="vertical">
        <Heading as="h2" variant="h2">
          Your password
        </Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;

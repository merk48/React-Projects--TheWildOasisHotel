import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";

function Account() {
  return (
    <>
      <Row type="mix">
        <Heading as="h1">Update your account</Heading>
      </Row>
      <Row>
        <UpdateUserDataForm />
      </Row>
      <Row>
        <Heading as="h1">Update your password</Heading>
      </Row>
    </>
  );
}

export default Account;

import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Heading from "../ui/Heading";

function Settings() {
  return (
    <Heading as="h1">
      <UpdateSettingsForm />
    </Heading>
  );
}

export default Settings;

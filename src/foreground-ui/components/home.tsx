import { Group, Space } from "@mantine/core";
import { useState } from "react";
import AccountSummary from "./account-details";
import EnvForm from "./env-form";
import License from "./license";

export const Home = () => {
  const [ci360RequiredProps, setCi360RequiredProps] = useState<{
    type: string;
    accountId: string;
  } | null>(null);

  return (
    <div>
      <EnvForm handleSubmit={setCi360RequiredProps} />

      <Space h="md" />
      {ci360RequiredProps && (
        <Group direction="column">
          <License {...ci360RequiredProps} />
          <AccountSummary {...ci360RequiredProps} />
        </Group>
      )}
    </div>
  );
};

export default Home;

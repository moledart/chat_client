import { Heading, Stack } from "@chakra-ui/react";
import { SendMessageForm } from "./SendMessageForm";
import { User } from "./App";
import { Inbox } from "./Inbox";

export const AdminPage = ({ user }: { user: User }) => {
  return (
    <Stack w="full" py="10">
      <Heading size="2xl">Hello {user.name}</Heading>
      <SendMessageForm user={user} />
      <Inbox user={user} />
    </Stack>
  );
};

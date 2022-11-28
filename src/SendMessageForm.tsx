import { useState } from "react";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  VStack,
  Textarea,
  Heading,
} from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { User, baseUrl } from "./App";

const defaultInputValue = {
  recipient: "",
  theme: "",
  messageBody: "",
};

export const SendMessageForm = ({ user }: { user: User }) => {
  const [input, setInput] = useState(defaultInputValue);
  const [optionsVisible, setOptionsVisible] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setInput((prev) => {
      return {
        ...prev,
        [e.target.name]: value,
      };
    });
  };

  const getRecipientId = (recipient: string) =>
    usersQuery?.data?.find((user) => user.name === recipient)?.id;

  const queryClient = useQueryClient();
  const usersQuery = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => fetch(`${baseUrl}/users`).then((res) => res.json()),
  });
  const sendMessage = useMutation({
    mutationFn: () =>
      fetch(`${baseUrl}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipientId: getRecipientId(input.recipient),
          theme: input.theme,
          content: input.messageBody,
          authorId: user.id,
        }),
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      setInput(defaultInputValue);
    },
  });

  return (
    <FormControl
      as="form"
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage.mutate();
      }}
    >
      <Heading size="lg" mt={10} mb={4}>
        Send message
      </Heading>
      <Box alignItems="flex-start" mb={3}>
        <FormLabel fontSize="md">Recipient</FormLabel>
        <Input
          type="text"
          name="recipient"
          value={input.recipient}
          onChange={handleInputChange}
          onFocus={() => {
            setOptionsVisible(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              setOptionsVisible(false);
            }, 400);
          }}
        />
        <VStack
          alignItems="flex-start"
          backgroundColor="white"
          position="absolute"
          w="full"
          zIndex={10}
          spacing="0"
          shadow="lg"
        >
          {optionsVisible &&
            usersQuery.data &&
            usersQuery.data
              .filter((user: User) => user.name.includes(input.recipient))
              .map((user: User) => (
                <Box
                  key={user.id}
                  px={4}
                  py={1}
                  margin="0"
                  w="full"
                  borderBottom="1px"
                  borderColor="gray.200"
                  _hover={{ background: "gray.200" }}
                  cursor="pointer"
                  onClick={() => {
                    setInput((prev) => {
                      return {
                        ...prev,
                        recipient: user.name,
                      };
                    });
                    setOptionsVisible(false);
                  }}
                >
                  {user.name}
                </Box>
              ))}
        </VStack>
      </Box>
      <Box alignItems="flex-start" mb={3}>
        <FormLabel fontSize="md">Theme</FormLabel>
        <Input
          type="text"
          name="theme"
          value={input.theme}
          onChange={handleInputChange}
        />
      </Box>
      <Box alignItems="flex-start" mb={4}>
        <FormLabel fontSize="md">Message</FormLabel>
        <Textarea
          name="messageBody"
          size="sm"
          resize={"both"}
          value={input.messageBody}
          onChange={handleInputChange}
        />
      </Box>
      <Button type="submit">Send message</Button>
    </FormControl>
  );
};

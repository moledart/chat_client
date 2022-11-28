import { useState } from "react";
import { Flex, Button, VStack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { User, baseUrl } from "./App";
import type { Message } from "./App";

export const Letter = (message: Message) => {
  const [isMessageVisible, setMessageVisible] = useState(false);
  const usersQuery = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => fetch(`${baseUrl}/users`).then((res) => res.json()),
  });

  return (
    <VStack w="full" alignItems="flex-start">
      <Flex gap={3} key={message.id} w="full" alignItems="center">
        <Text color="gray.500">
          {new Date(message.createdAt).toLocaleDateString()}
        </Text>
        <Text fontWeight="bold">
          {usersQuery.data?.find((user) => user.id === message.authorId)?.name}
        </Text>
        <Text noOfLines={1}>{message.theme}</Text>
        <Button
          size="sm"
          ml="auto"
          flexShrink="0"
          onClick={() => setMessageVisible((prev) => !prev)}
        >
          {isMessageVisible ? "Hide" : "Show"}
        </Button>
      </Flex>
      {isMessageVisible && <Text color="gray.500">{message.content}</Text>}
    </VStack>
  );
};

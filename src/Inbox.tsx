import { Heading, Stack, VStack, useToast, Box, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { User, baseUrl } from "./App";
import type { Message } from "./App";
import { Letter } from "./Letter";
import { useState } from "react";

export const Inbox = ({ user }: { user: User }) => {
  const toast = useToast();
  const [letterCount, setLetterCount] = useState<number | null>(null);
  const messagesQuery = useQuery<Message[]>({
    queryKey: ["messages"],
    queryFn: () =>
      fetch(`${baseUrl}/messages/${user.id}`).then((res) => res.json()),
    refetchInterval: 1000 * 5,
    onSuccess: (data) => {
      if (letterCount !== null && data.length > letterCount) {
        toast({
          duration: 3000,
          isClosable: true,
          position: "bottom-right",
          render: () => (
            <Box bg="white" boxShadow="xl" px="6" py="8">
              <Heading fontSize="md">{data.at(0)?.theme}</Heading>
              <Text noOfLines={2} color="gray.500">
                {data.at(0)?.content}
              </Text>
            </Box>
          ),
        });
      }
      setLetterCount(data.length);
    },
  });

  return (
    <Stack w="full">
      <Heading size="lg" mt={10} mb={4}>
        Your indbox
      </Heading>
      <VStack spacing="16px">
        {messagesQuery.data &&
          messagesQuery.data.map((message) => (
            <Letter {...message} key={message.id} />
          ))}
      </VStack>
    </Stack>
  );
};

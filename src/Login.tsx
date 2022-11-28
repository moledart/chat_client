import { useState } from "react";
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  HStack,
} from "@chakra-ui/react";
import { User, baseUrl } from "./App";

export const Login = ({
  setUser,
}: {
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}) => {
  const [input, setInput] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    const response = await fetch(`${baseUrl}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: input }),
    });
    const user: User = await response.json();
    setUser(user);
  };

  return (
    <FormControl my="auto" onSubmit={handleLogin} as="form">
      <FormLabel htmlFor="login">Hello there, enter your username</FormLabel>
      <HStack>
        <Input
          id="login"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit">Let me in</Button>
      </HStack>
      <FormHelperText>Just try Donald if you don't have one</FormHelperText>
    </FormControl>
  );
};

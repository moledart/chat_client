import { useState } from "react";
import { Container, HStack, Center } from "@chakra-ui/react";
import { Login } from "./Login";
import { AdminPage } from "./AdminPage";

// export const baseUrl = "http://localhost:3000";
export const baseUrl = "https://chat-backend-kappa.vercel.app/";

export type User = {
  id: number;
  name: string;
};

export type Message = {
  id: number;
  theme: string;
  content: string;
  authorId: number;
  recipientId: number;
  createdAt: Date;
};

function App() {
  const [user, setUser] = useState<User>();

  return (
    <Container minH={"100vh"} display="flex">
      {user ? <AdminPage user={user} /> : <Login setUser={setUser} />}
    </Container>
  );
}

export default App;

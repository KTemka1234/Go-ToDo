import { Button, Flex, Input, Spinner } from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function TodoForm() {
  const [newTodo, setNewTodo] = useState("");
  const [isPending, setIsPending] = useState(false);

  const createTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    alert("Todo added!");
  };
  return (
    <form onSubmit={createTodo}>
      <Flex gap={2}>
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          ref={(input) => input?.focus()}
          placeholder="Type your task here..."
          borderColor={"blue.400"}
        />
        <Button
          bg={"green.500"}
          borderRadius={"full"}
          type="submit"
          mx={2}
          _active={{ transform: "scale(0.97)" }}
        >
          {isPending ? <Spinner size={"md"} /> : <Plus />}
        </Button>
      </Flex>
    </form>
  );
}

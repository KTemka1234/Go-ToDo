import { BASE_URL } from "@/App";
import { Button, Flex, Input, Spinner } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function TodoForm() {
  const [newTodo, setNewTodo] = useState("");

  const queryClient = useQueryClient();
  const { mutate: createTodo, isPending: isCreating } = useMutation({
    mutationKey: ["createTodo"],
    mutationFn: async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const res = await fetch(BASE_URL + "/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ body: newTodo }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        }
        setNewTodo("");
        return data;
      } catch (error: any) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error: any) => {
      alert(error.message);
    },
  });

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
          {isCreating ? <Spinner size={"md"} /> : <Plus />}
        </Button>
      </Flex>
    </form>
  );
}

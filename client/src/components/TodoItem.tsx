import { Badge, Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { Check, Trash2 } from "lucide-react";
import { useColorModeValue } from "./ui/color-mode";
import { Todo } from "./TodoList";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "@/App";

export default function TodoItem({ todo }: { todo: Todo }) {
  const queryClient = useQueryClient();

  const { mutate: updateTodo, isPending: isUpdating } = useMutation({
    mutationKey: ["updateTodo"],
    mutationFn: async () => {
      if (todo.completed) return alert("Todo is already completed!");
      try {
        const res = await fetch(BASE_URL + `/todos/${todo._id}`, {
          method: "PATCH",
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        }
        return data;
      } catch (error) {
        console.error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const { mutate: deleteTodo, isPending: isDeleting } = useMutation({
    mutationKey: ["deleteTodo"],
    mutationFn: async () => {
      try {
        const res = await fetch(BASE_URL + `/todos/${todo._id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        }
        return data;
      } catch (error) {
        console.error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <Flex
      gap={2}
      alignItems={"center"}
      bg={useColorModeValue("gray.100", "gray.800")}
    >
      <Flex
        p={2}
        flex={1}
        justifyContent={"space-between"}
        alignItems={"center"}
        border={1}
        borderColor={"gray.200"}
        borderRadius={"lg"}
      >
        <Text
          color={useColorModeValue(
            todo.completed ? "green.600" : "black",
            todo.completed ? "green.600" : "white"
          )}
          textDecoration={todo.completed ? "line-through" : "none"}
        >
          {todo.body}
        </Text>
        {todo.completed ? (
          <Badge ml={1} colorPalette={"green"}>
            Done
          </Badge>
        ) : (
          <Badge ml={1} colorPalette={"yellow"}>
            In Progress
          </Badge>
        )}
      </Flex>
      <Flex gap={2} alignItems={"center"}>
        <Box
          p={1}
          color={"green.500"}
          cursor={"pointer"}
          _hover={{ bg: "green.200", borderRadius: "full" }}
          onClick={() => updateTodo()}
        >
          {isUpdating ? <Spinner size={"md"} /> : <Check />}
        </Box>
        <Box
          p={1}
          color={"red.500"}
          cursor={"pointer"}
          _hover={{ bg: "red.200", borderRadius: "full" }}
          onClick={() => deleteTodo()}
        >
          {isDeleting ? <Spinner size={"md"} /> : <Trash2 />}
        </Box>
      </Flex>
    </Flex>
  );
}

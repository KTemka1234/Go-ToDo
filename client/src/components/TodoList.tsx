import { Flex, Spinner, Stack, Text } from "@chakra-ui/react";
import TodoItem from "./TodoItem";
import { useQuery } from "@tanstack/react-query";

export type Todo = {
  _id: number;
  body: string;
  completed: boolean;
};

export default function TodoList() {
  const { data: todos, isLoading } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: async () => {
      try {
        const res = await fetch("http://localhost:3000/api/todos");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message);
        }
        return data || [];
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <>
      <Text
        bgGradient={"to-r"}
        gradientFrom={"cyan.300"}
        gradientTo={"blue.700"}
        bgClip={"text"}
        my={2}
        fontSize={"4xl"}
        textTransform={"uppercase"}
        fontWeight={"bold"}
        textAlign={"center"}
      >
        Today's Tasks
      </Text>
      {isLoading && (
        <Flex justifyContent={"center"} my={4}>
          <Spinner size={"xl"} />
        </Flex>
      )}
      {!isLoading && todos?.length === 0 && (
        <Stack alignItems={"center"} gap={3}>
          <img src="/rocket.svg" alt="Rocket image" width={128} height={128} />
          <Text
            fontSize={"xl"}
            textAlign={"center"}
            color={"green.600"}
            fontWeight={"bold"}
          >
            🎯🚀All tasks completed!🚀🎯
          </Text>
        </Stack>
      )}
      <Stack gap={3}>
        {todos?.map((todo) => (
          <TodoItem key={todo._id} todo={todo} />
        ))}
      </Stack>
    </>
  );
}

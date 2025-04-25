import { Flex, Spinner, Stack, Text } from "@chakra-ui/react";
import TodoItem from "./TodoItem";
import { useState } from "react";

export default function TodoList() {
  const [isLoading, setIsLoading] = useState(false);
  const todos = [
    { _id: 1, body: "Task 1", completed: true },
    { _id: 2, body: "Task 2", completed: true },
    { _id: 3, body: "Task 3", completed: false },
    { _id: 4, body: "Task 4", completed: false },
  ];

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

import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import { Check, Trash2 } from "lucide-react";
import { useColorModeValue } from "./ui/color-mode";

export default function TodoItem({ todo }: { todo: any }) {
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
          color={todo.completed ? "green.600" : "black"}
          textDecoration={todo.completed ? "line-through" : "none"}
        >
          {todo.body}
        </Text>
        {todo.completed && (
          <Badge ml={1} colorPalette={"green"}>
            Done
          </Badge>
        )}
        {!todo.completed && (
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
        >
          <Check />
        </Box>
        <Box
          p={1}
          color={"red.500"}
          cursor={"pointer"}
          _hover={{ bg: "red.200", borderRadius: "full" }}
        >
          <Trash2 />
        </Box>
      </Flex>
    </Flex>
  );
}

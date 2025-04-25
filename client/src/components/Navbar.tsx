import { Box, Button, Container, Flex, Text } from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "./ui/color-mode";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        my={4}
        borderRadius={5}
        borderColor={"blue.400"}
        borderWidth={3}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            gap={3}
            display={{ base: "none", md: "flex" }}
          >
            <img src="/logo.svg" alt="Go-ToDo logo" width={64} height={64} />
            <Text fontSize={"xl"}>Go-ToDo</Text>
          </Flex>
          <Flex alignItems={"center"} gap={3}>
            <Text fontSize={"lg"} fontWeight={500}>
              ToDo Tasks
            </Text>
            <Button
              bg={"yellow.400"}
              borderRadius={"full"}
              color={"black"}
              onClick={toggleColorMode}
            >
              {colorMode === "light" ? <Moon /> : <Sun />}
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Container>
  );
}

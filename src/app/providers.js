"use client";
import { ChakraProvider } from "@chakra-ui/react";
import system from "@/components/theme/theme";

export function Providers({ children }) {
  return <ChakraProvider value={system}>{children}</ChakraProvider>;
}

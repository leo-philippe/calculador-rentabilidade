"use client";
import { useState } from "react";
import {
  Box,
  Button,
  HStack,
  Stack,
  Heading,
  VStack,
  Text,
} from "@chakra-ui/react";
import PagamentoAVista from "../avista/page";
import PagamentoFinanciado from "../financiado/page";
import DREFinanciada from "@/components/DREFinanciada/page";
import DREDetalhada from "@/components/DREDetalhada/page";

const Simulacao = () => {
  const [activeTab, setActiveTab] = useState("vista");
  const [resultado, setResultado] = useState(null);

  return (
    <Box
      minH="100vh"
      bg={"#F1F1F1"}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      py={12}
      px={4}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box
        bg="white"
        boxShadow="lg"
        borderRadius="2xl"
        p={{ base: 6, md: 10 }}
        mb={5}
        w="full"
        maxW="960px"
      >
        <Heading
          textAlign="center"
          fontSize={{ base: "2xl", md: "3xl" }}
          color="#72171D"
          mb={8}
        >
          Calculadora de Rentabilidade
        </Heading>

        {/* Botões responsivos */}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={4}
          mb={6}
          w="full"
        >
          <Button
            onClick={() => {
              setActiveTab("vista");
              setResultado(null);
            }}
            bg={activeTab === "vista" ? "#72171D" : "gray.100"}
            color={activeTab === "vista" ? "white" : "black"}
            _hover={{ bg: activeTab === "vista" ? "#5d1218" : "gray.200" }}
            width="100%"
            borderRadius="md"
            fontWeight="bold"
          >
            Pagamento à Vista
          </Button>
          <Button
            onClick={() => {
              setActiveTab("financiado");
              setResultado(null);
            }}
            bg={activeTab === "financiado" ? "#72171D" : "gray.100"}
            color={activeTab === "financiado" ? "white" : "black"}
            _hover={{ bg: activeTab === "financiado" ? "#5d1218" : "gray.200" }}
            width="100%"
            borderRadius="md"
            fontWeight="bold"
          >
            Pagamento Financiado
          </Button>
        </Stack>

        <VStack spacing={6}>
          {activeTab === "vista" && (
            <PagamentoAVista onCalculoFinalizado={setResultado} />
          )}
          {activeTab === "financiado" && (
            <PagamentoFinanciado onCalculoFinalizado={setResultado} />
          )}
        </VStack>
      </Box>

      <Box
        bg="white"
        boxShadow="lg"
        borderRadius="2xl"
        p={{ base: 6, md: 10 }}
        w="full"
        maxW="960px"
      >
        {!resultado ? (
          <Text fontStyle="italic" color="gray.500" textAlign="center">
            Preencha os dados acima e clique em "Calcular" para ver o resultado.
          </Text>
        ) : (
          <Box p={2} shadow="lg" borderRadius={"10px"}>
            {activeTab === "vista" ? (
              <DREDetalhada r={resultado} />
            ) : (
              <DREFinanciada r={resultado} />
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Simulacao;

"use client";

import {
  Box,
  Text,
  VStack,
  Divider,
  Heading,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";

export default function DREDetalhada({ r }) {
  if (!r) return null;

  const {
    prazo_venda_meses,
    valor_arrematacao,
    custos_arrematacao,
    custos_posse_unico,
    custo_condominio_mensal,
    custo_iptu_proporcional,
    custos_venda,
    custo_total,
    valor_venda_estimado,
    lucro_liquido,
    roi,
    rent_anual,
    selic_equiv,
  } = r;

  const brl = (v) =>
    v.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });

  const Section = ({ title, children }) => (
    <Box p={5} borderWidth={1} borderRadius="md" w="full" bg="gray.50">
      <Heading size="sm" color="gray.700" mb={3}>
        {title}
      </Heading>
      <VStack align="start" spacing={1}>
        {children}
      </VStack>
    </Box>
  );

  return (
    <VStack spacing={6} mt={6} align="stretch" w="full">
      <Heading size="md" textAlign="center">
        📋 DRE Cronológica — Venda após {prazo_venda_meses} meses
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <Section title="🏁 Arrematação à Vista">
          <Text>
            Valor de Arrematação: <b>{brl(valor_arrematacao)}</b>
          </Text>
          <Text color="red.600">
            Custos da Arrematação: {brl(custos_arrematacao)}
          </Text>
        </Section>

        <Section title="📦 Pós-Posse (Custos únicos)">
          <Text color="red.600">Total: {brl(custos_posse_unico)}</Text>
        </Section>

        <Section title="📆 Durante a Posse">
          <Text color="red.600">
            Condomínios mensais: {brl(custo_condominio_mensal)}
          </Text>
          <Text color="red.600">
            IPTU proporcional: {brl(custo_iptu_proporcional)}
          </Text>
        </Section>

        <Section title="💰 Venda">
          <Text>
            Valor estimado de venda: <b>{brl(valor_venda_estimado)}</b>
          </Text>
          <Text color="red.600">Custos da venda: {brl(custos_venda)}</Text>
        </Section>
      </SimpleGrid>

      <Section title="📈 Resultado Final">
        <Stat>
          <StatLabel>Total Investido</StatLabel>
          <StatNumber>{brl(custo_total)}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Lucro Líquido</StatLabel>
          <StatNumber color="green.600">{brl(lucro_liquido)}</StatNumber>
        </Stat>
        <Text>
          ROI Real: <b>{roi.toFixed(2)}%</b>
        </Text>
        <Text>
          Rent. anualizada: <b>{(rent_anual * 100).toFixed(2)}%</b>
        </Text>
        <Text>SELIC equivalente: {(selic_equiv * 100).toFixed(2)}%</Text>
      </Section>

      <Box
        p={4}
        bg={rent_anual > selic_equiv ? "green.50" : "red.50"}
        border="1px solid"
        borderColor={rent_anual > selic_equiv ? "green.200" : "red.200"}
        borderRadius="md"
      >
        <Text
          fontWeight="bold"
          color={rent_anual > selic_equiv ? "green.700" : "red.700"}
        >
          {rent_anual > selic_equiv
            ? "✅ Rentabilidade superior à SELIC."
            : "⚠️ Rentabilidade inferior à SELIC."}
        </Text>
      </Box>
    </VStack>
  );
}

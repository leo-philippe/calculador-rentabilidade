"use client";

import {
  Box,
  Text,
  VStack,
  Heading,
  SimpleGrid,
  useBreakpointValue,
} from "@chakra-ui/react";

export default function DREDetalhada({ r }) {
  if (!r) return null;

  const {
    prazo_venda_meses,
    valor_arrematacao,
    custo_leiloeiro,
    custo_itbi,
    custo_cartorio,
    custo_assessoria,
    custos_arrematacao,
    iptu_atrasado,
    condominio_atrasado,
    custo_reformas,
    outros_custos_posse,
    total_pos_posse,
    custo_condominio_mensal,
    custo_iptu_proporcional,
    total_durante_posse,
    custo_corretagem,
    imposto_sobre_lucro,
    custos_venda,
    total_venda,
    valor_venda_estimado,
    custo_total,
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
    <Box
      p={5}
      borderWidth={1}
      borderRadius="md"
      w="full"
      bg="gray.50"
      minH="260px"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Heading
        size="sm"
        color="gray.700"
        mb={3}
        fontSize={{ base: "md", md: "lg" }}
      >
        {title}
      </Heading>
      <VStack spacing={1} align="start" fontSize={{ base: "sm", md: "md" }}>
        {children}
      </VStack>
    </Box>
  );

  return (
    <Box bg="white" p={6} rounded="xl" w="full">
      <Heading textAlign="center" size="md" mb={5}>
        📋 Descrição para venda após {prazo_venda_meses} meses
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
        <Section title="🏁 Arrematação à Vista">
          <Text>🔹 Valor da arrematação: {brl(valor_arrematacao)}</Text>
          <Text>🔻 Leiloeiro: {brl(custo_leiloeiro)}</Text>
          <Text>🔻 ITBI: {brl(custo_itbi)}</Text>
          <Text>🔻 Cartório: {brl(custo_cartorio)}</Text>
          <Text>🔻 Assessoria jurídica: {brl(custo_assessoria)}</Text>
          <Text fontWeight="bold" color="red.600" pt={2}>
            Total: {brl(custos_arrematacao)}
          </Text>
        </Section>

        <Section title="📦 Pós-Posse (Custos únicos)">
          <Text>🔻 IPTU atrasado: {brl(iptu_atrasado)}</Text>
          <Text>🔻 Condomínio atrasado: {brl(condominio_atrasado)}</Text>
          <Text>🔻 Reformas: {brl(custo_reformas)}</Text>
          <Text>🔻 Outros custos: {brl(outros_custos_posse)}</Text>
          <Text fontWeight="bold" color="red.600" pt={2}>
            Total: {brl(total_pos_posse)}
          </Text>
        </Section>

        <Section title="📆 Durante a Posse">
          <Text>🔻 Condomínio mensal: {brl(custo_condominio_mensal)}</Text>
          <Text>🔻 IPTU proporcional: {brl(custo_iptu_proporcional)}</Text>
          <Text fontWeight="bold" color="red.600" pt={2}>
            Total: {brl(total_durante_posse)}
          </Text>
        </Section>

        <Section title="💰 Venda">
          <Text>🔹 Valor estimado de venda: {brl(valor_venda_estimado)}</Text>
          <Text>🔻 Corretagem: {brl(custo_corretagem)}</Text>
          <Text>🔻 Imposto sobre lucro: {brl(imposto_sobre_lucro)}</Text>
          <Text fontWeight="bold" color="red.600" pt={2}>
            Total: {brl(total_venda)}
          </Text>
        </Section>
      </SimpleGrid>

      <Section title="📈 Resultado Final">
        <Text>🔹 Valor da venda: {brl(valor_venda_estimado)}</Text>
        <Text ml={4}>🔻 Arrematação: {brl(custos_arrematacao)}</Text>
        <Text ml={4}>🔻 Pós-posse: {brl(total_pos_posse)}</Text>
        <Text ml={4}>🔻 Durante posse: {brl(total_durante_posse)}</Text>
        <Text ml={4}>🔻 Venda: {brl(total_venda)}</Text>
        <Text mt={2}>🔹 Total investido: {brl(custo_total)}</Text>
        <Text fontSize="lg" color="green.600" fontWeight="bold">
          ✅ Lucro líquido: {brl(lucro_liquido)}
        </Text>
        <Text>📊 ROI total: {roi.toFixed(2)}%</Text>
        <Text>📈 Rent. anualizada: {(rent_anual * 100).toFixed(2)}%</Text>
        <Text>📉 SELIC equivalente: {(selic_equiv * 100).toFixed(2)}%</Text>
        <Text mt={3} fontSize="xs" color="gray.500">
          * ROI significa retorno total sobre o valor investido.
        </Text>
      </Section>

      <Box
        mt={4}
        bg={rent_anual > selic_equiv ? "green.50" : "red.50"}
        borderRadius="lg"
        p={4}
        boxShadow="sm"
        w="100%"
      >
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          📌 Conclusão
        </Text>
        <Text
          fontSize="md"
          fontWeight="semibold"
          color={rent_anual > selic_equiv ? "green.600" : "red.600"}
        >
          {rent_anual > selic_equiv
            ? "✅ Rentabilidade superior à SELIC."
            : "⚠️ Rentabilidade inferior à SELIC."}
        </Text>
      </Box>
    </Box>
  );
}

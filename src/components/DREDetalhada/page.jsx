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

  const Section = ({ title, children, total }) => (
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
      <Box>
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
      {total && (
        <Box mt={3}>
          <Text fontWeight="bold" color="red.600">
            {total}
          </Text>
        </Box>
      )}
    </Box>
  );

  return (
    <Box bg="white" p={6} rounded="xl" w="full">
      <Heading textAlign="center" size="md" mb={5}>
        📋 Simulação para venda após {prazo_venda_meses} meses
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
        <Section
          title="🏁 Custos da Compra no Leilão"
          total={`👉 Total da compra: ${brl(custos_arrematacao)}`}
        >
          <Text>🔹 Valor do imóvel no leilão: {brl(valor_arrematacao)}</Text>
          <Text>🔻 Taxa do leiloeiro: {brl(custo_leiloeiro)}</Text>
          <Text>🔻 ITBI (imposto da compra): {brl(custo_itbi)}</Text>
          <Text>🔻 Cartório (registro e escritura): {brl(custo_cartorio)}</Text>
          <Text>🔻 Assessoria jurídica: {brl(custo_assessoria)}</Text>
        </Section>

        <Section
          title="📦 Custos para tomar posse"
          total={`👉 Total pós-posse: ${brl(total_pos_posse)}`}
        >
          <Text>🔻 IPTU em atraso: {brl(iptu_atrasado)}</Text>
          <Text>🔻 Condomínio atrasado: {brl(condominio_atrasado)}</Text>
          <Text>🔻 Reformas e melhorias: {brl(custo_reformas)}</Text>
          <Text>
            🔻 Outros custos (chaves, limpeza etc.): {brl(outros_custos_posse)}
          </Text>
        </Section>

        <Section
          title="📆 Custos durante a espera para venda"
          total={`👉 Total nesse período: ${brl(total_durante_posse)}`}
        >
          <Text>🔻 Condomínio mensal: {brl(custo_condominio_mensal)}</Text>
          <Text>🔻 IPTU proporcional: {brl(custo_iptu_proporcional)}</Text>
        </Section>

        <Section
          title="💰 Venda do Imóvel"
          total={`👉 Total de custos na venda: ${brl(total_venda)}`}
        >
          <Text>🔹 Valor estimado de venda: {brl(valor_venda_estimado)}</Text>
          <Text>🔻 Comissão da corretagem: {brl(custo_corretagem)}</Text>
          <Text>🔻 Imposto sobre lucro: {brl(imposto_sobre_lucro)}</Text>
        </Section>
      </SimpleGrid>

      <Section title="📈 Resultado Final da Operação">
        <VStack align="start" spacing={1} fontSize={{ base: "sm", md: "md" }}>
          <Text>🔹 Valor de venda: {brl(valor_venda_estimado)}</Text>
          <Text>🔹 Valor da compra no leilão: {brl(valor_arrematacao)}</Text>
          <Text ml={4}>🔻 Custos do leilão: {brl(custos_arrematacao)}</Text>
          <Text ml={4}>🔻 Custos pós-posse: {brl(total_pos_posse)}</Text>
          <Text ml={4}>
            🔻 Custos durante posse: {brl(total_durante_posse)}
          </Text>
          <Text ml={4}>🔻 Custos da venda: {brl(total_venda)}</Text>

          <Text mt={2}>🔹 Total investido: {brl(custo_total)}</Text>
          <Text fontSize="lg" color="green.600" fontWeight="bold">
            ✅ Lucro líquido: {brl(lucro_liquido)}
          </Text>

          <Text mt={5}>📊 Retorno total (ROI): {roi.toFixed(2)}%</Text>
          <Text>
            📈 Rentabilidade anualizada: {(rent_anual * 100).toFixed(2)}%
          </Text>
          <Text>
            📉 Rentabilidade da SELIC no mesmo período:{" "}
            {(selic_equiv * 100).toFixed(2)}%
          </Text>

          <Text mt={3} fontSize="xs" color="gray.500">
            * ROI é o retorno percentual total considerando todo valor
            investido.
          </Text>
        </VStack>
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
            ? "✅ Este investimento rendeu mais que a SELIC."
            : "⚠️ Este investimento rendeu menos que a SELIC."}
        </Text>
      </Box>
    </Box>
  );
}

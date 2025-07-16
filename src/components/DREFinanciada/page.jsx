"use client";

import { Box, Text, VStack, Heading, SimpleGrid } from "@chakra-ui/react";

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
    <Heading size="sm" color="gray.700" mb={3}>
      {title}
    </Heading>
    {children}
  </Box>
);

export default function DREFinanciada({ r }) {
  if (!r) return null;

  const {
    prazo_venda_meses,
    entrada,
    valor_financiado,
    custo_leiloeiro,
    custo_itbi,
    custo_cartorio,
    custo_assessoria,
    custos_arrematacao,
    iptu_atrasado,
    condominio_atrasado,
    custo_reformas,
    outros_custos_posse,
    total_parcelas_pagas,
    custo_condominio_mensal,
    custo_iptu_proporcional,
    valor_venda_estimado,
    custo_corretagem,
    imposto_sobre_lucro,
    custos_venda,
    valor_liquido_venda,
    custo_total,
    lucro_liquido,
    roi_real,
    retorno_sobre_entrada,
    rentabilidade_anualizada,
    selic_equivalente_periodo,
    investimento_pre_arrematacao,
    investimento_pos_arrematacao,
    total_pos_posse,
    total_durante_posse,
    total_venda,
    valor_arrematacao,
    saldo_devedor,
  } = r;

  const brl = (v) =>
    v.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  return (
    <Box bg="white" p={6} rounded="xl" w="full">
      <Heading textAlign={"center"} size="md" mb={5}>
        📋 Descrição para venda após {prazo_venda_meses} meses
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
        <Section title="🏁 Arrematação">
          <Text fontWeight="semibold">
            🔹 Valor da arrematação: {brl(valor_arrematacao)}
          </Text>
          <Text>🔹 Entrada: {brl(entrada)}</Text>
          <Text>🔹 Valor Financiado: {brl(valor_financiado)}</Text>
          <Text fontWeight="semibold" mt={1}>
            🔻 Impostos de transferência:
          </Text>
          <Text ml={10}>• Leiloeiro: {brl(custo_leiloeiro)}</Text>
          <Text ml={10}>• ITBI (2,7%): {brl(custo_itbi)}</Text>
          <Text ml={10}>• Cartório: {brl(custo_cartorio)}</Text>
          <Text ml={10}>• Assessoria jurídica: {brl(custo_assessoria)}</Text>
          <Text fontSize={"22px"} fontWeight="semibold" color={"red.600"}>
            Total: {brl(custos_arrematacao)}
          </Text>
        </Section>

        <Section title="📦 Pós-Posse (Custos únicos)">
          <Box flex="1">
            <Text>🔻 IPTU atrasado: {brl(iptu_atrasado)}</Text>
            <Text>🔻 Condomínio atrasado: {brl(condominio_atrasado)}</Text>
            <Text>🔻 Reformas: {brl(custo_reformas)}</Text>
            <Text>🔻 Outros custos: {brl(outros_custos_posse)}</Text>
          </Box>
          <Box mt={2}>
            <Text fontSize={"22px"} fontWeight="semibold" color="red.600">
              Total: {brl(total_pos_posse)}
            </Text>
          </Box>
        </Section>

        <Section title="📆 Durante a Posse">
          <Text>🔻 Parcelas pagas: {brl(total_parcelas_pagas)}</Text>
          <Text>🔻 Condomínio: {brl(custo_condominio_mensal)}</Text>
          <Text>🔻 IPTU proporcional: {brl(custo_iptu_proporcional)}</Text>
          <Text fontSize={"22px"} fontWeight="semibold" color="red.600">
            Total: {brl(total_durante_posse)}
          </Text>
        </Section>

        <Section title="💰 Venda">
          <Text fontWeight="semibold">
            🔹 Valor estimado de venda: {brl(valor_venda_estimado)}
          </Text>
          <Text>🔻 % Corretagem: {brl(custo_corretagem)}</Text>
          <Text>🔻 Imposto sobre lucro: {brl(imposto_sobre_lucro)}</Text>

          <Text fontSize={"22px"} fontWeight="semibold" color="red.600">
            Total: {brl(total_venda)}
          </Text>
        </Section>
      </SimpleGrid>

      <Section title="📈 Resultado Final">
        <Text>🔹 Valor estimado de venda: {brl(valor_venda_estimado)}</Text>
        <Text>🔹 Valor da arrematação: {brl(valor_arrematacao)}</Text>
        <Text ml={10}>🔹 Entrada: {brl(entrada)}</Text>
        <Text ml={10}>🔹 Custo arrematação: {brl(custos_arrematacao)}</Text>
        <Text ml={10}>🔹 Custo pós-posse: {brl(total_pos_posse)}</Text>
        <Text ml={10}>🔹 Custo durante posse: {brl(total_durante_posse)}</Text>
        <Text ml={10}>🔹 Custo na venda: {brl(total_venda)}</Text>

        <Text mt={3}>🔹 Valor desembolsado: {brl(custo_total)}</Text>
        <Text>🔹 Saldo devedor restante: {brl(saldo_devedor)}</Text>

        <Text fontSize={"22px"} mt={1} color="green.600" fontWeight="semibold">
          ✅ Lucro líquido: {brl(lucro_liquido)}
        </Text>
        <Text mt={3}>📊 ROI total: {roi_real.toFixed(2)}%</Text>
        <Text>📊 ROI sobre entrada: {retorno_sobre_entrada.toFixed(2)}%</Text>

        <Text mt={3}>
          📈 Rent. anualizada: {rentabilidade_anualizada.toFixed(2)}%
        </Text>
        <Text>
          📉 Rent. da SELIC no mesmo período:{" "}
          {selic_equivalente_periodo.toFixed(2)}%
        </Text>
      </Section>

      <Box
        mt={4}
        bg={
          rentabilidade_anualizada > selic_equivalente_periodo
            ? "green.50"
            : "red.50"
        }
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
          color={
            rentabilidade_anualizada > selic_equivalente_periodo
              ? "green.600"
              : "red.600"
          }
        >
          {rentabilidade_anualizada > selic_equivalente_periodo
            ? "✅ Rentabilidade superior à SELIC."
            : "⚠️ Rentabilidade inferior à SELIC."}
        </Text>
      </Box>
    </Box>
  );
}

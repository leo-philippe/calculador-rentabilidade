"use client";

import { Box, Text, VStack, Heading, SimpleGrid } from "@chakra-ui/react";

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
  } = r;

  const brl = (v) =>
    v.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  return (
    <Box bg="white" p={6} rounded="xl" w="full">
      <Heading size="md" mb={5}>
        📋 DRE Cronológica — Venda após {prazo_venda_meses} meses
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
        <Section title="🏁 Arrematação">
          <Text>🔹 Entrada: {brl(entrada)}</Text>
          <Text>🔹 Valor Financiado: {brl(valor_financiado)}</Text>
          <Text fontWeight="medium" mt={1}>
            🔻 Custos:
          </Text>
          <Text>• Leiloeiro: {brl(custo_leiloeiro)}</Text>
          <Text>• ITBI: {brl(custo_itbi)}</Text>
          <Text>• Cartório: {brl(custo_cartorio)}</Text>
          <Text>• Assessoria: {brl(custo_assessoria)}</Text>
          <Text fontWeight="semibold">Total: {brl(custos_arrematacao)}</Text>
        </Section>

        <Section title="📦 Pós-Posse (Custos únicos)">
          <Text>🔻 IPTU atrasado: {brl(iptu_atrasado)}</Text>
          <Text>🔻 Condomínio atrasado: {brl(condominio_atrasado)}</Text>
          <Text>🔻 Reformas: {brl(custo_reformas)}</Text>
          <Text>🔻 Outros custos: {brl(outros_custos_posse)}</Text>
        </Section>

        <Section title="📆 Durante a Posse">
          <Text>🔻 Parcelas pagas: {brl(total_parcelas_pagas)}</Text>
          <Text>🔻 Condomínio: {brl(custo_condominio_mensal)}</Text>
          <Text>🔻 IPTU proporcional: {brl(custo_iptu_proporcional)}</Text>
        </Section>

        <Section title="💰 Venda">
          <Text>🔹 Valor estimado de venda: {brl(valor_venda_estimado)}</Text>
          <Text>🔻 Corretagem: {brl(custo_corretagem)}</Text>
          <Text>🔻 Imposto sobre lucro: {brl(imposto_sobre_lucro)}</Text>
          <Text>🔻 Custos totais da venda: {brl(custos_venda)}</Text>
          <Text fontWeight="semibold">
            Valor líquido: {brl(valor_liquido_venda)}
          </Text>
        </Section>
      </SimpleGrid>

      <Section title="📈 Resultado Final">
        <Text>🔹 Custo total real: {brl(custo_total)}</Text>
        <Text color="green.600" fontWeight="semibold">
          ✅ Lucro líquido: {brl(lucro_liquido)}
        </Text>
        <Text>📊 ROI total: {roi_real.toFixed(2)}%</Text>
        <Text>📊 Sobre entrada: {retorno_sobre_entrada.toFixed(2)}%</Text>
        <Text>📈 Rent. anualizada: {rentabilidade_anualizada.toFixed(2)}%</Text>
        <Text>📉 SELIC período: {selic_equivalente_periodo.toFixed(2)}%</Text>
      </Section>

      <Box mt={4}>
        <Section title="🧾 Investimento por Fase">
          <Text>🔸 Pré-arrematação: {brl(investimento_pre_arrematacao)}</Text>
          <Text>🔸 Pós-arrematação: {brl(investimento_pos_arrematacao)}</Text>
          <Text fontWeight="semibold">🔸 Total: {brl(custo_total)}</Text>
        </Section>
      </Box>

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
            ? "✅ Rentabilidade muito superior à SELIC."
            : "⚠️ Rentabilidade inferior à SELIC."}
        </Text>
      </Box>
    </Box>
  );
}

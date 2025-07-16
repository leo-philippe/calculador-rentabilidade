"use client";

import {
  Box,
  Text,
  VStack,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";

export default function DREDetalhada({ r }) {
  if (!r) return null;

  const {
    // Prazo
    prazo_venda_meses,

    // Arrematação
    valor_arrematacao,
    custo_leiloeiro,
    custo_itbi,
    custo_cartorio,
    custo_assessoria,
    custos_arrematacao,

    // Pós-posse (custos únicos)
    iptu_atrasado,
    condominio_atrasado,
    custo_reformas,
    outros_custos_posse,
    total_pos_posse,

    // Durante posse
    custo_condominio_mensal,
    custo_iptu_proporcional,
    total_durante_posse,

    // Venda
    custo_corretagem,
    imposto_sobre_lucro,
    custos_venda,
    total_venda,

    // Resultado final
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
      <Heading size="sm" color="gray.700" mb={3}>
        {title}
      </Heading>
      {children}
    </Box>
  );

  return (
    <Box bg="white" p={6} rounded="xl" w="full">
      <Heading textAlign="center" size="md" mb={5}>
        📋 Descrição para venda após {prazo_venda_meses} meses
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
        <Section title="🏁 Arrematação à Vista">
          <Text fontWeight="semibold">
            🔹 Valor da arrematação: {brl(valor_arrematacao)}
          </Text>
          <Text>🔻 Leiloeiro: {brl(custo_leiloeiro)}</Text>
          <Text>🔻 ITBI: {brl(custo_itbi)}</Text>
          <Text>🔻 Cartório: {brl(custo_cartorio)}</Text>
          <Text>🔻 Assessoria jurídica: {brl(custo_assessoria)}</Text>
          <Text fontSize="22px" fontWeight="semibold" color="red.600">
            Total: {brl(custos_arrematacao)}
          </Text>
        </Section>

        <Section title="📦 Pós-Posse (Custos únicos)">
          <Text>🔻 IPTU atrasado: {brl(iptu_atrasado)}</Text>
          <Text>🔻 Condomínio atrasado: {brl(condominio_atrasado)}</Text>
          <Text>🔻 Reformas: {brl(custo_reformas)}</Text>
          <Text>🔻 Outros custos: {brl(outros_custos_posse)}</Text>
          <Text fontSize="22px" fontWeight="semibold" color="red.600">
            Total: {brl(total_pos_posse)}
          </Text>
        </Section>

        <Section title="📆 Durante a Posse">
          <Text>🔻 Condomínio mensal: {brl(custo_condominio_mensal)}</Text>
          <Text>🔻 IPTU proporcional: {brl(custo_iptu_proporcional)}</Text>
          <Text fontSize="22px" fontWeight="semibold" color="red.600">
            Total: {brl(total_durante_posse)}
          </Text>
        </Section>

        <Section title="💰 Venda">
          <Text fontWeight="semibold">
            🔹 Valor estimado de venda: {brl(valor_venda_estimado)}
          </Text>
          <Text>🔻 Corretagem: {brl(custo_corretagem)}</Text>
          <Text>🔻 Imposto sobre lucro: {brl(imposto_sobre_lucro)}</Text>
          <Text fontSize="22px" fontWeight="semibold" color="red.600">
            Total: {brl(total_venda)}
          </Text>
        </Section>
      </SimpleGrid>

      <Section title="📈 Resultado Final">
        <Text>🔹 Valor estimado de venda: {brl(valor_venda_estimado)}</Text>
        <Text>🔹 Valor da arrematação: {brl(valor_arrematacao)}</Text>
        <Text ml={10}>🔹 Custo arrematação: {brl(custos_arrematacao)}</Text>
        <Text ml={10}>🔹 Custo pós-posse: {brl(total_pos_posse)}</Text>
        <Text ml={10}>🔹 Custo durante posse: {brl(total_durante_posse)}</Text>
        <Text ml={10}>🔹 Custo na venda: {brl(total_venda)}</Text>

        <Text mt={3}>🔹 Total investido: {brl(custo_total)}</Text>

        <Text fontSize="22px" mt={1} color="green.600" fontWeight="semibold">
          ✅ Lucro líquido: {brl(lucro_liquido)}
        </Text>
        <Text mt={3}>📊 ROI total: {roi.toFixed(2)}%</Text>
        <Text mt={3}>
          📈 Rent. anualizada: {(rent_anual * 100).toFixed(2)}%
        </Text>
        <Text>
          📉 Rent. da SELIC no mesmo período: {(selic_equiv * 100).toFixed(2)}%
        </Text>
        <Text mt={5} fontSize={"10px"} color={"#b8b8b8"}>
          ** ROI significa "Return on Investment" ou "Retorno sobre o
          investimento
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

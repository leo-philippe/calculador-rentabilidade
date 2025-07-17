// Código reestruturado com sugestões 1, 3 e 4 aplicadas

"use client";

import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Tooltip,
  VStack,
  Select,
  useToast,
  Stack,
  HStack,
  Text,
  Icon,
  Heading,
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { calculaRentabilidadeFinanciada } from "@/utils/calculaRentabilidadeFinanciada";

export default function PagamentoFinanciado({ onCalculoFinalizado }) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      valor_arrematacao: 0,
      valor_venda_estimado: 0,
      entrada_percentual: 10,
      taxa_financiamento_aa: 10.47,
      prazo_meses_total: 420,
      taxa_leiloeiro: 5,
      custas_cartorio: 5.5,
      assessoria_juridica: 0,
      custo_reformas: 0,
      outros_custos_posse: 0,
      iptu_atrasado: 0,
      condominio_atrasado: 0,
      condominio_mensal: 0,
      percentual_iptu_anual: 0.65,
      comissao_corretor: 6,
      imposto_renda_lucro: 15,
      selic_anual: 15,
      prazo_venda_meses: "6",
    },
  });

  const toast = useToast();
  const [resultado, setResultado] = useState(null);

  const onSubmit = (data) => {
    const numericos = Object.fromEntries(
      Object.entries(data).map(([k, v]) => [
        k,
        Number(v.toString().replace(",", ".")),
      ])
    );

    const camposObrigatorios = [
      "valor_arrematacao",
      "valor_venda_estimado",
      "entrada_percentual",
      "taxa_financiamento_aa",
      "prazo_meses_total",
    ];

    const nomesLegiveis = {
      valor_arrematacao: "Valor de arrematação",
      valor_venda_estimado: "Valor estimado de venda",
      entrada_percentual: "Entrada",
      taxa_financiamento_aa: "Taxa de financiamento anual",
      prazo_meses_total: "Prazo total (meses)",
    };

    const camposComErro = camposObrigatorios.filter(
      (campo) => !numericos[campo] || numericos[campo] <= 0
    );

    if (camposComErro.length > 0) {
      const camposTraduzidos = camposComErro.map((c) => nomesLegiveis[c] || c);

      toast({
        title: "Preencha todos os campos obrigatórios",
        description: `Os seguintes campos precisam ser preenchidos com valores maiores que zero: ${camposTraduzidos.join(
          ", "
        )}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    [
      "entrada_percentual",
      "taxa_leiloeiro",
      "custas_cartorio",
      "percentual_iptu_anual",
      "comissao_corretor",
      "imposto_renda_lucro",
      "selic_anual",
    ].forEach((c) => {
      if (!isNaN(numericos[c])) numericos[c] /= 100;
    });

    const res = calculaRentabilidadeFinanciada(numericos);
    setResultado(res);

    toast({
      title: "Cálculo financiado pronto!",
      status: "success",
      duration: 3000,
    });

    onCalculoFinalizado?.(res);
  };

  const renderField = (name, label, options = {}) => {
    const { prefix, suffix, decimalScale = 2, tooltip, obrigatorio } = options;

    return (
      <FormControl key={name} isRequired={obrigatorio}>
        <FormLabel>
          <HStack spacing={1} align="center">
            {tooltip && (
              <Tooltip
                label={tooltip}
                borderRadius="10px"
                fontSize="sm"
                placement="top"
                hasArrow
                bg="#f1f1f1"
                color="#505050ff"
              >
                <span>
                  <InfoOutlineIcon
                    color="gray.500"
                    boxSize={3}
                    cursor="pointer"
                  />
                </span>
              </Tooltip>
            )}
            <Text>{label}</Text>
          </HStack>
        </FormLabel>

        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <NumericFormat
              value={field.value}
              onValueChange={({ value }) => field.onChange(Number(value))}
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={decimalScale}
              fixedDecimalScale
              prefix={prefix}
              suffix={suffix}
              customInput={Input}
            />
          )}
        />
      </FormControl>
    );
  };

  return (
    <Box p={6} maxW="900px" mx="auto">
      <VStack
        align="stretch"
        as="form"
        spacing={4}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Heading as="h3" size="md" color="#72171D">
          🏠 Imóvel
        </Heading>
        <Stack direction={{ base: "column", md: "row" }} spacing={4} w="full">
          {renderField("valor_arrematacao", "Valor de arrematação", {
            prefix: "R$ ",
            tooltip: "Valor pago no leilão para adquirir o imóvel.",
          })}
          {renderField("valor_venda_estimado", "Valor estimado de venda", {
            prefix: "R$ ",
            tooltip: "Preço de venda esperado após reforma e regularização.",
          })}
        </Stack>

        <Divider />
        <Heading as="h3" size="md" color="#72171D">
          💳 Financiamento
        </Heading>
        <Stack direction={{ base: "column", md: "row" }} spacing={4} w="full">
          {renderField("entrada_percentual", "Entrada", {
            suffix: " %",
            tooltip: "Percentual da entrada que será pago à vista.",
          })}
          {renderField("taxa_financiamento_aa", "Taxa financiamento (a.a.)", {
            suffix: " %",
            tooltip: "Juros anuais do financiamento bancário.",
          })}
          {renderField("prazo_meses_total", "Prazo total (meses)", {
            tooltip: "Tempo total do financiamento.",
          })}
        </Stack>

        <Divider />
        <Heading as="h3" size="md" color="#72171D">
          📄 Custos de Aquisição
        </Heading>
        <Stack direction={{ base: "column", md: "row" }} spacing={4} w="full">
          {renderField("taxa_leiloeiro", "Taxa do leiloeiro", {
            suffix: " %",
            tooltip: "Custo do serviço do leiloeiro.",
          })}
          {renderField("custas_cartorio", "Custas cartoriais", {
            suffix: " %",
            tooltip: "Custos de escritura e registro.",
          })}
          {renderField("assessoria_juridica", "Assessoria jurídica", {
            prefix: "R$ ",
            tooltip: "Apoio jurídico durante o processo.",
          })}
        </Stack>

        <Divider />
        <Heading as="h3" size="md" color="#72171D">
          🔧 Custos Pós-Arrematação
        </Heading>
        <Stack direction={{ base: "column", md: "row" }} spacing={4} w="full">
          {renderField("custo_reformas", "Custo reformas", { prefix: "R$ " })}
          {renderField("outros_custos_posse", "Outros custos posse", {
            prefix: "R$ ",
          })}
        </Stack>

        <Divider />
        <Heading as="h3" size="md" color="#72171D">
          📑 Dívidas e Despesas Mensais
        </Heading>
        <Stack direction={{ base: "column", md: "row" }} spacing={4} w="full">
          {renderField("iptu_atrasado", "IPTU atrasado", { prefix: "R$ " })}
          {renderField("condominio_atrasado", "Condomínio atrasado", {
            prefix: "R$ ",
          })}
          {renderField("condominio_mensal", "Condomínio mensal", {
            prefix: "R$ ",
          })}
        </Stack>

        <Divider />
        <Heading as="h3" size="md" color="#72171D">
          📈 Rentabilidade e Venda
        </Heading>
        <Stack direction={{ base: "column", md: "row" }} spacing={4} w="full">
          {renderField("comissao_corretor", "Comissão corretor", {
            suffix: " %",
          })}
          {renderField("selic_anual", "SELIC anual", { suffix: " %" })}
        </Stack>

        <FormControl>
          <FormLabel>Prazo até venda</FormLabel>
          <Controller
            name="prazo_venda_meses"
            control={control}
            render={({ field }) => (
              <Select {...field}>
                <option value="4">4 meses</option>
                <option value="6">6 meses</option>
                <option value="12">12 meses</option>
                <option value="18">18 meses</option>
                <option value="24">24 meses</option>
              </Select>
            )}
          />
        </FormControl>

        <Button
          bg="#72171D"
          color="white"
          _hover={{ bg: "#5d1218" }}
          width="100%"
          borderRadius="md"
          fontWeight="bold"
          type="submit"
        >
          Calcular Rentabilidade
        </Button>
      </VStack>
    </Box>
  );
}

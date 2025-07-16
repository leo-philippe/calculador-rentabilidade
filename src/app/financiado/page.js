"use client";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  HStack,
  VStack,
  Select,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { calculaRentabilidadeFinanciada } from "@/utils/calculaRentabilidadeFinanciada";

export default function PagamentoFinanciado({ onCalculoFinalizado }) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      valor_arrematacao: 128000,
      valor_venda_estimado: 240000,
      entrada_percentual: 10,
      taxa_financiamento_aa: 10.47,
      prazo_meses_total: 420,
      taxa_leiloeiro: 5,
      custas_cartorio: 5.5,
      assessoria_juridica: 5000,
      custo_reformas: 10000,
      outros_custos_posse: 5000,
      iptu_atrasado: 4000,
      condominio_atrasado: 22000,
      condominio_mensal: 400,
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

    const percentuais = [
      "entrada_percentual",
      "taxa_leiloeiro",
      "custas_cartorio",
      "percentual_iptu_anual",
      "comissao_corretor",
      "imposto_renda_lucro",
      "selic_anual",
    ];
    percentuais.forEach((c) => {
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

  const renderField = (name, label, options = {}) => (
    <FormControl key={name}>
      <FormLabel>{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <NumericFormat
            value={field.value}
            onValueChange={({ value }) => field.onChange(Number(value))}
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={options.decimalScale || 2}
            fixedDecimalScale
            prefix={options.prefix}
            suffix={options.suffix}
            customInput={Input}
          />
        )}
      />
    </FormControl>
  );

  return (
    <Box p={6} maxW="900px" mx="auto">
      <VStack as="form" spacing={4} onSubmit={handleSubmit(onSubmit)}>
        <HStack spacing={4} w="full">
          {renderField("valor_arrematacao", "Valor de arrematação", {
            prefix: "R$ ",
          })}
          {renderField("valor_venda_estimado", "Valor estimado de venda", {
            prefix: "R$ ",
          })}
          {renderField("entrada_percentual", "Entrada", { suffix: " %" })}
        </HStack>

        <HStack spacing={4} w="full">
          {renderField("taxa_financiamento_aa", "Tx. financiamento anual", {
            suffix: " %",
          })}
          {renderField("prazo_meses_total", "Prazo total (meses)")}
          {renderField("taxa_leiloeiro", "Taxa do leiloeiro", { suffix: " %" })}
        </HStack>

        <HStack spacing={4} w="full">
          {renderField("custas_cartorio", "Custas cartoriais", {
            suffix: " %",
          })}
          {renderField("assessoria_juridica", "Assessoria jurídica", {
            prefix: "R$ ",
          })}
          {renderField("custo_reformas", "Custo reformas", { prefix: "R$ " })}
        </HStack>

        <HStack spacing={4} w="full">
          {renderField("outros_custos_posse", "Outros custos posse", {
            prefix: "R$ ",
          })}
          {renderField("iptu_atrasado", "IPTU atrasado", { prefix: "R$ " })}
          {renderField("condominio_atrasado", "Condomínio atrasado", {
            prefix: "R$ ",
          })}
        </HStack>

        <HStack spacing={4} w="full">
          {renderField("condominio_mensal", "Condomínio mensal", {
            prefix: "R$ ",
          })}
          {renderField("percentual_iptu_anual", "IPTU anual", { suffix: " %" })}
          {renderField("comissao_corretor", "Comissão corretor", {
            suffix: " %",
          })}
        </HStack>

        <HStack spacing={4} w="full">
          {renderField("imposto_renda_lucro", "IR sobre lucro", {
            suffix: " %",
          })}
          {renderField("selic_anual", "SELIC anual", { suffix: " %" })}
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
        </HStack>

        <Button
          bg={"#72171D"}
          color={"white"}
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

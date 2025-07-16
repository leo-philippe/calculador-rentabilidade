"use client";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  VStack,
  Select,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { calculaRentabilidadeAVista } from "@/utils/calcVista";

export default function PagamentoAVista({ onCalculoFinalizado }) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      valor_arrematacao: 128000,
      valor_venda_estimado: 240000,
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
    const camposNumericos = Object.fromEntries(
      Object.entries(data).map(([k, v]) => [
        k,
        Number(v.toString().replace(",", ".")),
      ])
    );

    const camposPercentuais = [
      "taxa_leiloeiro",
      "custas_cartorio",
      "percentual_iptu_anual",
      "comissao_corretor",
      "imposto_renda_lucro",
      "selic_anual",
    ];

    camposPercentuais.forEach((campo) => {
      if (!isNaN(camposNumericos[campo])) {
        camposNumericos[campo] = camposNumericos[campo] / 100;
      }
    });

    const res = calculaRentabilidadeAVista(camposNumericos);
    setResultado(res);
    toast({ title: "Cálculo pronto!", status: "success", duration: 3000 });
    onCalculoFinalizado?.(res);
  };

  const renderNumberField = (name, label, options = {}) => (
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
        <Stack direction={{ base: "column", md: "row" }} spacing={4} w="full">
          {renderNumberField("valor_arrematacao", "Valor de arrematação", {
            prefix: "R$ ",
          })}
          {renderNumberField(
            "valor_venda_estimado",
            "Valor estimado de venda",
            {
              prefix: "R$ ",
            }
          )}
          {renderNumberField("taxa_leiloeiro", "Taxa do leiloeiro", {
            suffix: " %",
          })}
        </Stack>

        <Stack direction={{ base: "column", md: "row" }} spacing={4} w="full">
          <FormControl>
            <FormLabel>Prazo estimado até venda</FormLabel>
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
          {renderNumberField("custas_cartorio", "Custas cartoriais", {
            suffix: " %",
          })}
        </Stack>

        <Stack direction={{ base: "column", md: "row" }} spacing={4} w="full">
          {renderNumberField("assessoria_juridica", "Assessoria jurídica", {
            prefix: "R$ ",
          })}
          {renderNumberField("custo_reformas", "Reforma", {
            prefix: "R$ ",
          })}
          {renderNumberField("outros_custos_posse", "Outros custos pós-posse", {
            prefix: "R$ ",
          })}
        </Stack>

        <Stack direction={{ base: "column", md: "row" }} spacing={4} w="full">
          {renderNumberField("iptu_atrasado", "IPTU atrasado", {
            prefix: "R$ ",
          })}
          {renderNumberField("condominio_atrasado", "Condomínio atrasado", {
            prefix: "R$ ",
          })}
          {renderNumberField("condominio_mensal", "Condomínio mensal", {
            prefix: "R$ ",
          })}
        </Stack>

        <Stack direction={{ base: "column", md: "row" }} spacing={4} w="full">
          {renderNumberField("percentual_iptu_anual", "Percentual IPTU anual", {
            suffix: " %",
          })}
          {renderNumberField("comissao_corretor", "Comissão do corretor", {
            suffix: " %",
          })}
          {renderNumberField("imposto_renda_lucro", "Imposto de renda", {
            suffix: " %",
          })}
        </Stack>

        <Stack direction={{ base: "column", md: "row" }} spacing={4} w="full">
          {renderNumberField("selic_anual", "Taxa Selic atual", {
            suffix: " %",
          })}
        </Stack>

        <Button
          bg="#72171D"
          color="white"
          _hover={{ bg: "#5d1218" }}
          width="100%"
          type="submit"
          borderRadius="md"
          fontWeight="bold"
        >
          Calcular Rentabilidade
        </Button>
      </VStack>
    </Box>
  );
}

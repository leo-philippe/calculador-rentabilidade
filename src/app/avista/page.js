"use client";

import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Stack,
  VStack,
  Select,
  useToast,
  HStack,
  Tooltip,
  Icon,
  Text,
  Heading,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { calculaRentabilidadeAVista } from "@/utils/calcVista";

export default function PagamentoAVista({ onCalculoFinalizado }) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      valor_arrematacao: 0,
      valor_venda_estimado: 0,
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
    const camposNumericos = Object.fromEntries(
      Object.entries(data).map(([k, v]) => [
        k,
        Number(v.toString().replace(",", ".")),
      ])
    );

    const camposObrigatorios = ["valor_arrematacao", "valor_venda_estimado"];
    const nomesLegiveis = {
      valor_arrematacao: "Valor de arrematação",
      valor_venda_estimado: "Valor estimado de venda",
    };

    const camposComErro = camposObrigatorios.filter(
      (campo) => !camposNumericos[campo] || camposNumericos[campo] <= 0
    );

    if (camposComErro.length > 0) {
      const camposTraduzidos = camposComErro.map(
        (campo) => nomesLegiveis[campo] || campo
      );

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
    <FormControl key={name} isRequired={options.required}>
      <FormLabel>
        <HStack spacing={1}>
          {options.tooltip && (
            <Tooltip
              borderRadius="10px"
              fontSize="sm"
              placement="top"
              bg={"#f1f1f1"}
              color={"#505050ff"}
              label={options.tooltip}
              hasArrow
            >
              <span>
                <Icon as={InfoOutlineIcon} boxSize={3} color="gray.500" />
              </span>
            </Tooltip>
          )}
          <span>
            {label}
            {options.required && <span style={{ color: "red" }}>*</span>}
          </span>
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={5} align="stretch">
          <Box>
            <Heading as="h3" size="md" mb={2} color="#72171D">
              🏠 Imóvel
            </Heading>
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing={4}
              w="full"
            >
              {renderNumberField("valor_arrematacao", "Valor de arrematação", {
                prefix: "R$ ",
                tooltip: "Valor pago no leilão para adquirir o imóvel.",
              })}
              {renderNumberField(
                "valor_venda_estimado",
                "Valor estimado de venda",
                {
                  prefix: "R$ ",
                  tooltip:
                    "Quanto você espera vender o imóvel após regularização e reforma.",
                }
              )}
            </Stack>
          </Box>

          <Divider />

          <Box>
            <Heading as="h3" size="md" mb={2} color="#72171D">
              💸 Custos de aquisição
            </Heading>
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing={4}
              w="full"
            >
              {renderNumberField("taxa_leiloeiro", "Taxa do leiloeiro", {
                suffix: " %",
                tooltip:
                  "Percentual cobrado pelo leiloeiro sobre o valor de arrematação.",
              })}
              {renderNumberField("custas_cartorio", "Custas cartoriais", {
                suffix: " %",
                tooltip:
                  "Percentual estimado com despesas de registro e escritura do imóvel.",
              })}
              {renderNumberField("assessoria_juridica", "Assessoria jurídica", {
                prefix: "R$ ",
                tooltip:
                  "Valor pago para auxílio jurídico na regularização do imóvel.",
              })}
            </Stack>
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing={4}
              w="full"
              mt={4}
            >
              {renderNumberField("custo_reformas", "Reforma", {
                prefix: "R$ ",
                tooltip:
                  "Estimativa de custos para deixar o imóvel em condições de venda.",
              })}
              {renderNumberField(
                "outros_custos_posse",
                "Outros custos pós-posse",
                {
                  prefix: "R$ ",
                  tooltip:
                    "Despesas extras para tomar posse, como mudança ou limpeza.",
                }
              )}
            </Stack>
          </Box>

          <Divider />

          <Box>
            <Heading as="h3" size="md" mb={2} color="#72171D">
              🧾 Dívidas e encargos
            </Heading>
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing={4}
              w="full"
            >
              {renderNumberField("iptu_atrasado", "IPTU atrasado", {
                prefix: "R$ ",
                tooltip:
                  "Dívida de IPTU que pode ser repassada ao novo proprietário.",
              })}
              {renderNumberField("condominio_atrasado", "Condomínio atrasado", {
                prefix: "R$ ",
                tooltip: "Dívida de condomínio deixada pelo antigo morador.",
              })}
              {renderNumberField("condominio_mensal", "Condomínio mensal", {
                prefix: "R$ ",
                tooltip:
                  "Valor do condomínio a ser pago enquanto o imóvel não for vendido.",
              })}
            </Stack>
          </Box>

          <Divider />

          <Box>
            <Heading as="h3" size="md" mb={2} color="#72171D">
              📊 Parâmetros da simulação
            </Heading>
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing={4}
              w="full"
            >
              {renderNumberField("comissao_corretor", "Comissão do corretor", {
                suffix: " %",
                tooltip: "Percentual pago ao corretor pela venda do imóvel.",
              })}
              {renderNumberField("selic_anual", "Taxa Selic atual", {
                suffix: " %",
                tooltip:
                  "Usada para estimar a rentabilidade do capital no período.",
              })}
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
            </Stack>
          </Box>

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
      </form>
    </Box>
  );
}

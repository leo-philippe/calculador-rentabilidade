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
  Divider,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { calculaRentabilidadeFinanciada } from "@/utils/calculaRentabilidadeFinanciada";

export default function PagamentoFinanciado({ onCalculoFinalizado }) {
  const { register, handleSubmit } = useForm({
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

  return (
    <Box p={6} maxW="900px" mx="auto">
      <VStack as="form" spacing={4} onSubmit={handleSubmit(onSubmit)}>
        <HStack spacing={4} w="full">
          <FormControl>
            <FormLabel>Valor de arrematação</FormLabel>
            <Input type="number" {...register("valor_arrematacao")} />
          </FormControl>
          <FormControl>
            <FormLabel>Valor estimado de venda</FormLabel>
            <Input type="number" {...register("valor_venda_estimado")} />
          </FormControl>
          <FormControl>
            <FormLabel>Entrada (%)</FormLabel>
            <Input
              type="text"
              inputMode="decimal"
              pattern="[0-9]*[.,]?[0-9]*"
              {...register("entrada_percentual")}
            />
          </FormControl>
        </HStack>

        <HStack spacing={4} w="full">
          <FormControl>
            <FormLabel>Tx. financiamento anual</FormLabel>
            <Input
              type="text"
              inputMode="decimal"
              pattern="[0-9]*[.,]?[0-9]*"
              {...register("taxa_financiamento_aa")}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Prazo total (meses)</FormLabel>
            <Input type="number" {...register("prazo_meses_total")} />
          </FormControl>
          <FormControl>
            <FormLabel>Taxa do leiloeiro (%)</FormLabel>
            <Input
              type="text"
              inputMode="decimal"
              pattern="[0-9]*[.,]?[0-9]*"
              {...register("taxa_leiloeiro")}
            />
          </FormControl>
        </HStack>

        <HStack spacing={4} w="full">
          <FormControl>
            <FormLabel>Custas cartoriais (%)</FormLabel>
            <Input
              type="text"
              inputMode="decimal"
              pattern="[0-9]*[.,]?[0-9]*"
              {...register("custas_cartorio")}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Assessoria jurídica (R$)</FormLabel>
            <Input type="number" {...register("assessoria_juridica")} />
          </FormControl>
          <FormControl>
            <FormLabel>Custo reformas (R$)</FormLabel>
            <Input type="number" {...register("custo_reformas")} />
          </FormControl>
        </HStack>

        <HStack spacing={4} w="full">
          <FormControl>
            <FormLabel>Outros custos posse (R$)</FormLabel>
            <Input type="number" {...register("outros_custos_posse")} />
          </FormControl>
          <FormControl>
            <FormLabel>IPTU atrasado (R$)</FormLabel>
            <Input type="number" {...register("iptu_atrasado")} />
          </FormControl>
          <FormControl>
            <FormLabel>Condomínio atrasado (R$)</FormLabel>
            <Input type="number" {...register("condominio_atrasado")} />
          </FormControl>
        </HStack>

        <HStack spacing={4} w="full">
          <FormControl>
            <FormLabel>Condomínio mensal (R$)</FormLabel>
            <Input type="number" {...register("condominio_mensal")} />
          </FormControl>
          <FormControl>
            <FormLabel>IPTU anual (%)</FormLabel>
            <Input
              type="text"
              inputMode="decimal"
              pattern="[0-9]*[.,]?[0-9]*"
              {...register("percentual_iptu_anual")}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Comissão corretor (%)</FormLabel>
            <Input
              type="text"
              inputMode="decimal"
              pattern="[0-9]*[.,]?[0-9]*"
              {...register("comissao_corretor")}
            />
          </FormControl>
        </HStack>

        <HStack spacing={4} w="full">
          <FormControl>
            <FormLabel>IR sobre lucro (%)</FormLabel>
            <Input
              type="text"
              inputMode="decimal"
              pattern="[0-9]*[.,]?[0-9]*"
              {...register("imposto_renda_lucro")}
            />
          </FormControl>
          <FormControl>
            <FormLabel>SELIC anual (%)</FormLabel>
            <Input
              type="text"
              inputMode="decimal"
              pattern="[0-9]*[.,]?[0-9]*"
              {...register("selic_anual")}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Prazo até venda</FormLabel>
            <Select {...register("prazo_venda_meses")}>
              <option value="4">4 meses</option>
              <option value="6">6 meses</option>
              <option value="12">12 meses</option>
              <option value="18">18 meses</option>
              <option value="24">24 meses</option>
            </Select>
          </FormControl>
        </HStack>

        <Button
          bg={"#72171D"}
          color={"white"}
          _hover={{
            bg: "#5d1218",
          }}
          width="100%"
          borderRadius="md"
          fontWeight="bold"
          type="submit"
        >
          Calcular Rentabilidade Financiada
        </Button>
      </VStack>
    </Box>
  );
}

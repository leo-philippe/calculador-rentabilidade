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
import { calculaRentabilidadeAVista } from "@/utils/calcVista";

export default function PagamentoAVista({ onCalculoFinalizado }) {
  const { register, handleSubmit } = useForm({
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
            <FormLabel>Taxa do leiloeiro</FormLabel>
            <Input type="number" {...register("taxa_leiloeiro")} />
          </FormControl>
        </HStack>

        <HStack spacing={4} w="full">
          <FormControl>
            <FormLabel>Taxa do leiloeiro</FormLabel>
            <Input type="number" {...register("taxa_leiloeiro")} />
          </FormControl>
          <FormControl>
            <FormLabel>Prazo estimado até venda</FormLabel>
            <Select {...register("prazo_venda_meses")}>
              <option value="4">4 meses</option>
              <option value="6">6 meses</option>
              <option value="12">12 meses</option>
              <option value="18">18 meses</option>
              <option value="24">24 meses</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Custas cartoriais</FormLabel>
            <Input
              type="text"
              inputMode="decimal"
              pattern="[0-9]*[.,]?[0-9]*"
              {...register("custas_cartorio")}
            />
          </FormControl>
        </HStack>

        <HStack spacing={4} w="full">
          <FormControl>
            <FormLabel>Assessoria jurídica</FormLabel>
            <Input type="number" {...register("assessoria_juridica")} />
          </FormControl>

          <FormControl>
            <FormLabel>Reforma</FormLabel>
            <Input type="number" {...register("custo_reformas")} />
          </FormControl>

          <FormControl>
            <FormLabel>Outros custos pós-posse</FormLabel>
            <Input type="number" {...register("outros_custos_posse")} />
          </FormControl>
        </HStack>

        <HStack spacing={4} w="full">
          <FormControl>
            <FormLabel>IPTU atrasado</FormLabel>
            <Input type="number" {...register("iptu_atrasado")} />
          </FormControl>

          <FormControl>
            <FormLabel>Condomínio atrasado</FormLabel>
            <Input type="number" {...register("condominio_atrasado")} />
          </FormControl>
          <FormControl>
            <FormLabel>Condomínio mensal</FormLabel>
            <Input type="number" {...register("condominio_mensal")} />
          </FormControl>
        </HStack>

        <HStack spacing={4} w="full">
          <FormControl>
            <FormLabel>Percentual IPTU anual</FormLabel>
            <Input
              type="text"
              inputMode="decimal"
              pattern="[0-9]*[.,]?[0-9]*"
              {...register("percentual_iptu_anual")}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Comissão do corretor</FormLabel>
            <Input type="number" {...register("comissao_corretor")} />
          </FormControl>

          <FormControl>
            <FormLabel>Imposto de renda</FormLabel>
            <Input type="number" {...register("imposto_renda_lucro")} />
          </FormControl>
        </HStack>

        <HStack spacing={4} w="full">
          <FormControl>
            <FormLabel>Taxa Selic atual</FormLabel>
            <Input type="number" {...register("selic_anual")} />
          </FormControl>
          <Box flex="1" /> {/* espaçador */}
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
          Calcular Rentabilidade
        </Button>
      </VStack>
    </Box>
  );
}

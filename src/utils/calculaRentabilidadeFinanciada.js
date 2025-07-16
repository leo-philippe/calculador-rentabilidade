// utils/calcFinanciado.js

export function calculaRentabilidadeFinanciada(data) {
  const {
    valor_arrematacao,
    valor_venda_estimado,
    entrada_percentual,
    taxa_financiamento_aa,
    prazo_venda_meses,
    prazo_meses_total,
    taxa_leiloeiro,
    custas_cartorio,
    assessoria_juridica,
    custo_reformas,
    outros_custos_posse,
    iptu_atrasado,
    condominio_atrasado,
    condominio_mensal,
    percentual_iptu_anual,
    comissao_corretor,
    imposto_renda_lucro,
    selic_anual,
  } = data;

  console.log("data", data);

  const entrada = valor_arrematacao * entrada_percentual;
  const valor_financiado = valor_arrematacao - entrada;
  const taxa_juros_mensal =
    Math.pow(1 + taxa_financiamento_aa / 100, 1 / 12) - 1;
  const amortizacao_mensal = valor_financiado / prazo_meses_total;

  const itbi = 0.027;

  const custo_leiloeiro = valor_arrematacao * taxa_leiloeiro;
  const custo_itbi = valor_arrematacao * itbi;
  const custo_cartorio = valor_arrematacao * custas_cartorio;
  const custo_assessoria = assessoria_juridica;

  const custos_arrematacao =
    custo_leiloeiro + custo_itbi + custo_cartorio + custo_assessoria;

  let saldo_devedor = valor_financiado;
  let total_parcelas_pagas = 0;
  let juros_pagos = 0;

  for (let mes = 1; mes <= prazo_venda_meses; mes++) {
    const juros_mes = saldo_devedor * taxa_juros_mensal;
    const parcela_mes = amortizacao_mensal + juros_mes;
    total_parcelas_pagas += parcela_mes;
    juros_pagos += juros_mes;
    saldo_devedor -= amortizacao_mensal;
  }

  const custo_condominio_mensal = condominio_mensal * prazo_venda_meses;
  const custo_iptu_proporcional =
    valor_arrematacao * percentual_iptu_anual * (prazo_venda_meses / 12);
  const custos_posse_unico =
    iptu_atrasado + condominio_atrasado + custo_reformas + outros_custos_posse;

  const custo_corretagem = valor_venda_estimado * comissao_corretor;
  // Base de cálculo do ganho de capital
  const base_calculo_lucro =
    valor_venda_estimado -
    (valor_arrematacao +
      custo_leiloeiro +
      custo_itbi +
      custo_cartorio +
      custo_assessoria +
      custo_reformas +
      custo_corretagem); // Se pago pelo vendedor

  // Função auxiliar para alíquota progressiva
  function calculaImpostoLucro(valorLucro) {
    if (valorLucro <= 0) return 0;
    if (valorLucro <= 5000000) return valorLucro * 0.15;
    if (valorLucro <= 10000000) return valorLucro * 0.175;
    if (valorLucro <= 30000000) return valorLucro * 0.2;
    return valorLucro * 0.225;
  }

  const imposto_sobre_lucro = calculaImpostoLucro(base_calculo_lucro);

  const custos_venda = custo_corretagem + imposto_sobre_lucro;

  const valor_liquido_venda = valor_venda_estimado - saldo_devedor;

  const custo_total =
    entrada +
    custos_arrematacao +
    custos_posse_unico +
    custo_condominio_mensal +
    custo_iptu_proporcional +
    custos_venda +
    total_parcelas_pagas;

  const lucro_liquido = valor_venda_estimado - saldo_devedor - custo_total;

  const capital_proprio_total = custo_total;
  const roi_real = (lucro_liquido / capital_proprio_total) * 100;

  const retorno_sobre_entrada =
    entrada > 0 ? (lucro_liquido / entrada) * 100 : 0;

  const rentabilidade_efetiva = lucro_liquido / capital_proprio_total;

  let rentabilidade_anualizada = null;
  if (rentabilidade_efetiva > -1 && prazo_venda_meses > 0) {
    rentabilidade_anualizada =
      (Math.pow(1 + rentabilidade_efetiva, 12 / prazo_venda_meses) - 1) * 100;
  }

  const selic_equivalente_periodo =
    (Math.pow(1 + selic_anual, prazo_venda_meses / 12) - 1) * 100;

  const total_pos_posse =
    iptu_atrasado + condominio_atrasado + custo_reformas + outros_custos_posse;
  const total_durante_posse =
    total_parcelas_pagas + custo_condominio_mensal + custo_iptu_proporcional;
  const total_venda = custo_corretagem + imposto_sobre_lucro;

  return {
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
    investimento_pre_arrematacao: entrada + custos_arrematacao,
    investimento_pos_arrematacao:
      custos_posse_unico +
      custo_iptu_proporcional +
      custo_condominio_mensal +
      custos_venda +
      total_parcelas_pagas,
    total_pos_posse,
    total_durante_posse,
    total_venda,
    valor_arrematacao,
    saldo_devedor,
  };
}

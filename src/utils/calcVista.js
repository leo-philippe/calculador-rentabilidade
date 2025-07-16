export function calculaRentabilidadeAVista(data) {
  const {
    valor_arrematacao,
    valor_venda_estimado,
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
    selic_anual,
    prazo_venda_meses,
  } = data;

  // ---------- ITBI fixo aplicado ----------
  const itbi = 0.027;

  // ---------- Etapa 1: Arrematação ----------
  const custo_leiloeiro = valor_arrematacao * taxa_leiloeiro;
  const custo_itbi = valor_arrematacao * itbi;
  const custo_cartorio = valor_arrematacao * custas_cartorio;
  const custo_assessoria = assessoria_juridica;
  const custos_arrematacao =
    custo_leiloeiro + custo_itbi + custo_cartorio + custo_assessoria;

  // ---------- Etapa 2: Pós-posse (custos únicos) ----------
  const total_pos_posse =
    iptu_atrasado + condominio_atrasado + custo_reformas + outros_custos_posse;

  // ---------- Etapa 3: Durante a posse ----------
  const custo_condominio_mensal = condominio_mensal * prazo_venda_meses;
  const custo_iptu_proporcional =
    valor_arrematacao * percentual_iptu_anual * (prazo_venda_meses / 12);
  const total_durante_posse = custo_condominio_mensal + custo_iptu_proporcional;

  // ---------- Etapa 4: Venda ----------
  const custo_corretagem = valor_venda_estimado * comissao_corretor;

  const base_lucro =
    valor_venda_estimado -
    (valor_arrematacao +
      custos_arrematacao +
      custo_reformas +
      custo_corretagem);

  // ---------- Imposto sobre lucro (alíquota progressiva) ----------
  function calculaImpostoLucro(valorLucro) {
    if (valorLucro <= 0) return 0;
    if (valorLucro <= 5000000) return valorLucro * 0.15;
    if (valorLucro <= 10000000) return valorLucro * 0.175;
    if (valorLucro <= 30000000) return valorLucro * 0.2;
    return valorLucro * 0.225;
  }

  const imposto_sobre_lucro = calculaImpostoLucro(base_lucro);
  const custos_venda = custo_corretagem + imposto_sobre_lucro;
  const total_venda = custos_venda;

  // ---------- Totais gerais ----------
  const custo_total =
    valor_arrematacao +
    custos_arrematacao +
    total_pos_posse +
    total_durante_posse +
    custos_venda;

  const lucro_liquido = valor_venda_estimado - custo_total;

  // ---------- Indicadores ----------
  const roi = (lucro_liquido / custo_total) * 100;
  const rent_efetiva = lucro_liquido / custo_total;

  let rent_anual = null;
  if (rent_efetiva > -1 && prazo_venda_meses > 0) {
    rent_anual = (1 + rent_efetiva) ** (12 / prazo_venda_meses) - 1;
  }

  const selic_equiv = (1 + selic_anual) ** (prazo_venda_meses / 12) - 1;

  return {
    // Prazo
    prazo_venda_meses,

    // Arrematação
    valor_arrematacao,
    custo_leiloeiro,
    custo_itbi,
    custo_cartorio,
    custo_assessoria,
    custos_arrematacao,

    // Pós-posse
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

    // Resultado
    valor_venda_estimado,
    custo_total,
    lucro_liquido,
    roi,
    rent_anual,
    selic_equiv,
  };
}

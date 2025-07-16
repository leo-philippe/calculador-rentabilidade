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
    imposto_renda_lucro,
    selic_anual,
    prazo_venda_meses,
  } = data;

  /* ---------- Custos de arrematação ---------- */
  const itbi =
    valor_arrematacao <= 100_000
      ? 0
      : valor_arrematacao <= 150_000
      ? 0.005
      : 0.027;

  const custo_leiloeiro = valor_arrematacao * taxa_leiloeiro;
  const custo_itbi = valor_arrematacao * itbi;
  const custo_cartorio = valor_arrematacao * custas_cartorio;
  const custos_arrematacao =
    custo_leiloeiro + custo_itbi + custo_cartorio + assessoria_juridica;

  /* ---------- Custos após posse ---------- */
  const custos_posse_unico =
    iptu_atrasado + condominio_atrasado + custo_reformas + outros_custos_posse;

  const custo_condominio_mensal = condominio_mensal * prazo_venda_meses;
  const custo_iptu_proporcional =
    valor_arrematacao * percentual_iptu_anual * (prazo_venda_meses / 12);

  /* ---------- Custos na venda ---------- */
  const custo_corretagem = valor_venda_estimado * comissao_corretor;
  const base_lucro =
    valor_venda_estimado -
    (valor_arrematacao + custos_arrematacao + custo_reformas);
  const imposto_lucro = Math.max(0, base_lucro) * imposto_renda_lucro;
  const custos_venda = custo_corretagem + imposto_lucro;

  /* ---------- Totais ---------- */
  const custo_total =
    valor_arrematacao +
    custos_arrematacao +
    custos_posse_unico +
    custo_condominio_mensal +
    custo_iptu_proporcional +
    custos_venda;

  const lucro_liquido = valor_venda_estimado - custo_total;
  const roi = (lucro_liquido / custo_total) * 100;
  const rent_efetiva = lucro_liquido / custo_total;
  const rent_anual = (1 + rent_efetiva) ** (12 / prazo_venda_meses) - 1;
  const selic_equiv = (1 + selic_anual) ** (prazo_venda_meses / 12) - 1;

  return {
    prazo_venda_meses,
    valor_arrematacao,
    custos_arrematacao,
    custos_posse_unico,
    custo_condominio_mensal,
    custo_iptu_proporcional,
    custos_venda,
    custo_total,
    valor_venda_estimado,
    lucro_liquido,
    roi,
    rent_anual,
    selic_equiv,
  };
}

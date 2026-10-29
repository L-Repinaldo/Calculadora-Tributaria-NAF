
export default function DadosSimulacao({
  resultado,
  renda,
  custos,
  profissao,
  nomesProfissoes,
  formatarMoeda,
}) {
  return (
    <section className="comparativo-secao">
      <h4 className="comparativo-titulo-secao">
        Dados da Simulação
      </h4>

      <div className="comparativo-dados">
        <div className="comparativo-dados-linha">
          <span>Profissão</span>
          <strong>{nomesProfissoes[profissao] ?? profissao}</strong>
        </div>

        <div className="comparativo-dados-linha">
          <span>Faturamento mensal</span>
          <strong>{formatarMoeda(Number(renda))}</strong>
        </div>

        <div className="comparativo-dados-linha">
          <span>Custos dedutíveis</span>
          <strong>{formatarMoeda(Number(custos))}</strong>
        </div>

        <div className="comparativo-dados-linha">
          <span>Regime recomendado</span>
          <strong>{resultado.siglaVencedora}</strong>
        </div>

        <div className="comparativo-dados-linha comparativo-dados-economia">
          <span>Economia mensal estimada</span>
          <strong>{formatarMoeda(resultado.diferenca)}</strong>
        </div>
      </div>
    </section>
  );
}

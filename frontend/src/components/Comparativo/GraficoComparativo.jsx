
export default function GraficoComparativo({
  resultado,
  maiorImposto,
  formatarMoeda,
}) {
  const larguraPF = Math.max(
    0,
    (resultado.pf.imposto / maiorImposto) * 100
  );

  const larguraPJ = Math.max(
    0,
    (resultado.pj.total / maiorImposto) * 100
  );

  return (
    <section className="comparativo-secao">
      <h4 className="comparativo-titulo-secao">
        Comparação dos Custos Mensais
      </h4>

      <div className="comparativo-grafico">
        <div className="comparativo-grafico-item">
          <div className="comparativo-grafico-info">
            <span>Pessoa Física (PF)</span>

            <span className="comparativo-valor-pf">
              {formatarMoeda(resultado.pf.imposto)}
            </span>
          </div>

          <div className="comparativo-barra-trilho">
            <div
              className="comparativo-barra comparativo-barra-pf"
              style={{
                width: `${larguraPF}%`,
              }}
            />
          </div>
        </div>

        <div className="comparativo-grafico-item">
          <div className="comparativo-grafico-info">
            <span>Pessoa Jurídica (PJ)</span>

            <span className="comparativo-valor-pj">
              {formatarMoeda(resultado.pj.total)}
            </span>
          </div>

          <div className="comparativo-barra-trilho">
            <div
              className="comparativo-barra comparativo-barra-pj"
              style={{
                width: `${larguraPJ}%`,
              }}
            />
          </div>
        </div>
      </div>

      <p className="comparativo-observacao comparativo-observacao-grafico">
        Comparação dos custos mensais informados no resultado da simulação.
      </p>
    </section>
  );
}

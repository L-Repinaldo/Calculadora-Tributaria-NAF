
export default function ResumoTributario({ resultado }) {
  const pfVencedor = resultado.siglaVencedora === "PF";
  const pjVencedor = resultado.siglaVencedora === "PJ";

  return (
    <>
      <section
        className={`comparativo-recomendacao ${
          pjVencedor ? "recomendacao-pj" : "recomendacao-pf"
        }`}
      >
        <h3 className="comparativo-recomendacao-titulo">
          A melhor opção para você é:
        </h3>

        <p className="comparativo-recomendacao-regime">
          {resultado.maisVantajoso}
        </p>

        <p className="comparativo-recomendacao-descricao">
          Atuando como {resultado.siglaVencedora}, você tem uma{" "}
          <strong>economia de R$ {resultado.diferenca.toFixed(2)}</strong>{" "}
          todos os meses.
        </p>
      </section>

      <h4 className="comparativo-resumo-titulo">
        Resumo Detalhado dos Cálculos
      </h4>

      <div className="comparativo-resumo-grid">
        <article
          className={`comparativo-resumo-card ${
            pfVencedor ? "comparativo-card-vencedor-pf" : ""
          }`}
        >
          <h3 className="comparativo-resumo-card-titulo">
            Pessoa Física (PF)
            {pfVencedor && (
              <span className="comparativo-badge-pf">
                Recomendado
              </span>
            )}
          </h3>

          <div className="comparativo-resumo-valores">
            <div className="comparativo-resumo-linha">
              <span>Base de Cálculo:</span>
              <strong>
                R$ {resultado.pf.base.toFixed(2)}
              </strong>
            </div>

            <div className="comparativo-resumo-linha">
              <span>Faixa IRPF:</span>
              <strong>{resultado.pf.faixa}</strong>
            </div>

            <div className="comparativo-resumo-linha">
              <span>Dedução Permitida:</span>
              <strong className="comparativo-deducao">
                - R$ {resultado.pf.parcelaDedutivel.toFixed(2)}
              </strong>
            </div>
          </div>

          <div className="comparativo-resumo-total">
            <span>Custo Mensal:</span>
            <strong>R$ {resultado.pf.imposto.toFixed(2)}</strong>
          </div>
        </article>

        <article
          className={`comparativo-resumo-card ${
            pjVencedor ? "comparativo-card-vencedor-pj" : ""
          }`}
        >
          <h3 className="comparativo-resumo-card-titulo">
            Pessoa Jurídica (PJ)
            {pjVencedor && (
              <span className="comparativo-badge-pj">
                Recomendado
              </span>
            )}
          </h3>

          <div className="comparativo-resumo-valores">
            <div className="comparativo-resumo-linha">
              <span>Simples ({resultado.pj.aliquota}):</span>
              <strong>
                R$ {resultado.pj.simples.toFixed(2)}
              </strong>
            </div>

            <div className="comparativo-resumo-linha">
              <span>Pró-labore base:</span>
              <strong>
                R$ {resultado.pj.salarioBase.toFixed(2)}
              </strong>
            </div>

            <div className="comparativo-resumo-linha">
              <span>INSS Mensal (11%):</span>
              <strong>
                R$ {resultado.pj.inss.toFixed(2)}
              </strong>
            </div>
          </div>

          <div className="comparativo-resumo-total">
            <span>Custo Mensal:</span>
            <strong>R$ {resultado.pj.total.toFixed(2)}</strong>
          </div>
        </article>
      </div>
    </>
  );
}

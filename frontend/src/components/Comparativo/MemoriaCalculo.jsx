
export default function MemoriaCalculo({
  resultado,
  renda,
  custos,
  formatarMoeda,
}) {
  const rendaMensal = Number(renda) || 0;
  const custosMensais = Number(custos) || 0;

  return (
    <section className="comparativo-secao">
      <h4 className="comparativo-titulo-secao">
        Memória de Cálculo
      </h4>

      <div className="comparativo-memoria-grid">
        {/* CARD PESSOA FÍSICA */}
        <div className="comparativo-card">
          <h5 className="comparativo-card-titulo">
            Pessoa Física (PF)
          </h5>

          <div className="comparativo-memoria-conteudo">
            <div className="comparativo-linha">
              <span>Renda mensal</span>
              <span>{formatarMoeda(rendaMensal)}</span>
            </div>

            <div className="comparativo-linha">
              <span>Custos dedutíveis</span>
              <span>{formatarMoeda(custosMensais)}</span>
            </div>

            <div className="comparativo-linha">
              <span>Base de cálculo</span>
              <span>{formatarMoeda(resultado.pf.base)}</span>
            </div>

            <div className="comparativo-linha">
              <span>Faixa de tributação</span>
              <span>{resultado.pf.faixa}</span>
            </div>

            <div className="comparativo-linha">
              <span>Parcela a deduzir</span>
              <span>
                {formatarMoeda(resultado.pf.parcelaDedutivel)}
              </span>
            </div>

            <div className="comparativo-bloco-calculo">
              <span className="comparativo-label-calculo">
                Imposto estimado (PF)
              </span>
              <span className="comparativo-total">
                {formatarMoeda(resultado.pf.imposto)}
              </span>
            </div>
          </div>
        </div>

        {/* CARD PESSOA JURÍDICA */}
        <div className="comparativo-card">
          <h5 className="comparativo-card-titulo">
            Pessoa Jurídica (PJ)
          </h5>

          <div className="comparativo-memoria-conteudo">
            <div className="comparativo-linha">
              <span>Faturamento mensal</span>
              <span>{formatarMoeda(rendaMensal)}</span>
            </div>

            <div className="comparativo-linha">
              <span>Alíquota do Simples</span>
              <span>{resultado.pj.aliquota}</span>
            </div>

            <div className="comparativo-linha">
              <span>Imposto do Simples</span>
              <span>{formatarMoeda(resultado.pj.simples)}</span>
            </div>

            <div className="comparativo-linha">
              <span>Salário-base considerado</span>
              <span>{formatarMoeda(resultado.pj.salarioBase)}</span>
            </div>

            <div className="comparativo-linha">
              <span>INSS estimado</span>
              <span>{formatarMoeda(resultado.pj.inss)}</span>
            </div>

            <div className="comparativo-bloco-calculo">
              <span className="comparativo-label-calculo">
                Total estimado (PJ)
              </span>
              <span className="comparativo-total">
                {formatarMoeda(resultado.pj.total)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <p className="comparativo-observacao comparativo-observacao-memoria">
        Valores e parâmetros apresentados conforme os dados disponíveis
        na simulação.
      </p>
    </section>
  );
}

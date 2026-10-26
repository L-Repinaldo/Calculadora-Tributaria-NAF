
import "../../styles/Comparativo.css";


import CabecalhoRelatorio from "./CabecalhoRelatorio";
import ResumoTributario from "./ResumoTributario";
import GraficoComparativo from "./GraficoComparativo";
import MemoriaCalculo from "./MemoriaCalculo";
import DadosSimulacao from "./DadosSimulacao";

export default function ResultadoComparativo({
  resultado,
  renda,
  custos,
  profissao,
  nomesProfissoes,
  formatarMoeda,
}) {
  const maiorImposto = Math.max(
    resultado.pf.imposto,
    resultado.pj.total,
    1
  );

  return (
    <div
      id="resultado-comparativo"
      className="comparativo-relatorio"
    >
      <CabecalhoRelatorio />

      <ResumoTributario resultado={resultado} />

      <GraficoComparativo
        resultado={resultado}
        maiorImposto={maiorImposto}
        formatarMoeda={formatarMoeda}
      />

      <MemoriaCalculo
        resultado={resultado}
        renda={renda}
        custos={custos}
        formatarMoeda={formatarMoeda}
      />

      <DadosSimulacao
        resultado={resultado}
        renda={renda}
        custos={custos}
        profissao={profissao}
        nomesProfissoes={nomesProfissoes}
        formatarMoeda={formatarMoeda}
      />
    </div>
  );
}

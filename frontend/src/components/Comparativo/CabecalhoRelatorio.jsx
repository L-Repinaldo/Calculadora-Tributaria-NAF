
export default function CabecalhoRelatorio() {
  const dataEmissao = new Date();

  const dataFormatada = dataEmissao.toLocaleDateString("pt-BR");
  const horaFormatada = dataEmissao.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <header className="comparativo-cabecalho">
      <div className="comparativo-cabecalho-identificacao">
        <h2>Núcleo de Apoio Contábil e Fiscal (NAF) | Universidade Christus</h2>
        <p>Relatório de Comparação Tributária</p>
      </div>

      <div className="comparativo-cabecalho-emissao">
        <span>Data de emissão: {dataFormatada}</span>
        <span>Horário de emissão: {horaFormatada}</span>
      </div>

      <p className="comparativo-aviso-estimativa">
        <strong>Aviso:</strong> os valores apresentados neste relatório são
        estimativas para fins informativos e podem diferir dos valores
        efetivamente devidos.
      </p>
    </header>
  );
}

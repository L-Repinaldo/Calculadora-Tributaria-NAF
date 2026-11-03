 import { formatarFatorR, formatarMoeda } from '../../utils/calculos';

export default function ResultadoCard({ resultado }) {
  if (typeof resultado === 'string') {
    return (
      <div className="bg-gray-50 border border-naf-gray/20 rounded-xl shadow-inner mt-4 p-5">
        <p className="text-naf-red font-medium">{resultado}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 border border-naf-gray/20 rounded-xl shadow-inner mt-4 p-5">
      {resultado.fatorR && resultado.anexo && (
        <div className="mb-3 p-3 bg-blue-50 rounded-lg border border-naf-blue/20">
          <p className="text-sm font-bold text-naf-blue">
            Fator R: {formatarFatorR(resultado.fatorR)}
          </p>
          <p className="text-sm font-bold text-naf-blue">
            Anexo Aplicado: {resultado.anexo}
          </p>
        </div>
      )}

      <div className="space-y-2 text-sm text-naf-blue">
        <p><strong>Base de cálculo:</strong> {formatarMoeda(resultado.base)}</p>
        {resultado.faixa && <p><strong>Faixa IRPF:</strong> {resultado.faixa}</p>}
        {resultado.deducao !== undefined && (
          <p><strong>Parcela a deduzir:</strong> {formatarMoeda(resultado.deducao)}</p>
        )}
      </div>
      <p className="text-lg font-bold text-naf-red mt-3 pt-3 border-t border-naf-gray/30">
        IR {resultado.tipo} a pagar: {formatarMoeda(resultado.imposto)}
      </p>
    </div>
  );
}
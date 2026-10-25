import { FATOR_R_THRESHOLD, ANEXOS } from '../constants/profissoes';

export const FAIXAS_IRPF = [
  { limite: 2428.80, faixa: 'Isento', deducao: 0 },
  { limite: 2826.65, faixa: '7,5%', deducao: 182.16 },
  { limite: 3751.05, faixa: '15%', deducao: 394.16 },
  { limite: 4664.68, faixa: '22,5%', deducao: 675.49 },
  { limite: Infinity, faixa: '27,5%', deducao: 908.73 },
];

export function calcularFaixaIRPF(base) {
  return FAIXAS_IRPF.find(f => base <= f.limite) || FAIXAS_IRPF[FAIXAS_IRPF.length - 1];
}

export function calcularFatorR(folhaMensal, rendaMensal) {
  const receitaBruta12Meses = rendaMensal * 12;

  if (receitaBruta12Meses === 0) {
    return {
      fatorR: 0,
      anexo: ANEXOS.V,
      receitaBruta12Meses: 0,
    };
  }

  const fatorR = folhaMensal / receitaBruta12Meses;
  const anexo = fatorR >= FATOR_R_THRESHOLD ? ANEXOS.III : ANEXOS.V;

  return { fatorR, anexo, receitaBruta12Meses };
}

export function formatarFatorR(fatorR) {
  return `${(fatorR * 100).toFixed(1).replace('.', ',')}%`;
}

export function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
import { useState } from 'react';
import api from '../services/api';
import { calcularFaixaIRPF } from '../utils/calculos';
import { RENDA_MAXIMA } from '../constants/profissoes';


export function useFormCalculo() {
  const [renda, setRenda] = useState('');
  const [custos, setCustos] = useState('');
  const [profissao, setProfissao] = useState('psicologo');
  const [proLabore, setProLabore] = useState('');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRendaChange = (e) => {
    const valor = parseFloat(e.target.value);
    if (valor > RENDA_MAXIMA) {
      setErro(`O valor máximo permitido é ${REnda_MAXIMA.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`);
      setRenda(REnda_MAXIMA);
    } else {
      setErro('');
      setRenda(e.target.value);
    }
  };

  const calcular = async (tipo) => {
    const rendaNum = parseFloat(renda);
    const custosNum = parseFloat(custos);

    if (isNaN(rendaNum) || isNaN(custosNum)) {
      setResultado('Por favor, insira valores válidos.');
      return;
    }

    const profissaoSelecionada = { usaFatorR: profissao === 'medico' || profissao === 'dentista' };

    if (profissaoSelecionada.usaFatorR && (!proLabore || parseFloat(proLabore) <= 0)) {
      setErro("O campo 'Pró-labore/Folha' é obrigatório para médicos e dentistas.");
      return;
    }

    setLoading(true);
    setErro('');

    try {
      const payload = {
        tipoProfissao: profissao,
        faturamento: rendaNum,
        custos: custosNum,
      };

      if (profissaoSelecionada.usaFatorR) {
        payload.proLabore = parseFloat(proLabore);
      }

      const response = await api.post('/calculos', payload);
      const { impostoPF, impostoPJ, fatorR, anexo } = response.data.calculo;
      const base = rendaNum - custosNum;
      const { faixa, deducao } = calcularFaixaIRPF(base);

      setResultado({
        base,
        faixa,
        deducao,
        imposto: tipo === 'PF' ? impostoPF : impostoPJ,
        tipo,
        fatorR,
        anexo,
      });
    } catch (error) {
      console.error(`Erro ao salvar cálculo ${tipo}:`, error);
      const msg = error.response?.data?.error || 'Erro ao processar cálculo no servidor.';
      setResultado(msg);
    } finally {
      setLoading(false);
    }
  };

  return {
    renda, setRenda,
    custos, setCustos,
    profissao, setProfissao,
    proLabore, setProLabore,
    resultado, setResultado,
    erro, setErro,
    loading,
    handleRendaChange,
    calcular,
  };
}
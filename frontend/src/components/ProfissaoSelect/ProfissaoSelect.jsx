import { PROFISSOES } from '../constants/profissoes';

function ProfissaoSelect({ value, onChange }) {
  return (
    <div>
      <label htmlFor="profissao" className="block mb-1 text-sm font-medium text-naf-blue">
        Profissão
      </label>
      <select
        id="profissao"
        value={value}
        onChange={onChange}
        className="w-full border border-naf-gray px-4 py-2 rounded-xl focus-visible:ring-2 focus-visible:ring-naf-blue focus:border-transparent transition bg-white"
      >
        {PROFISSOES.map((prof) => (
          <option key={prof.id} value={prof.id}>
            {prof.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ProfissaoSelect;
 export default function ProLaboreInput({ value, onChange, visible }) {
  if (!visible) return null;

  return (
    <div>
      <label htmlFor="proLabore" className="block mb-1 text-sm font-medium text-naf-blue">
        Despesa Mensal com Pró-labore/Folha (R$) *
      </label>
      <p className="text-xs text-naf-gray mb-2">
        * Campo obrigatório para médicos e dentistas. Usado para cálculo do Fator R.
      </p>
      <input
        type="number"
        id="proLabore"
        value={value}
        onChange={onChange}
        placeholder="Ex: 2000"
        className="w-full border border-naf-gray px-4 py-2 rounded-xl focus:ring-2 focus:ring-naf-red outline-none transition delay-[80ms] duration-[400ms] ease-in-out hover:shadow-sm"
      />
    </div>
  );
}
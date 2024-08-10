import { useState, ChangeEvent, useMemo, FormEvent } from "react";
import { useBudget } from "../hooks/useBudget";
const BudgetForm = () => {
  const [budget, setBudget] = useState<number>(0);
  const { dispatch } = useBudget();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(e.target.valueAsNumber)) {
      return;
    }
    setBudget(e.target.valueAsNumber);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "add-budget", payload: { budget } });
  };

  const isValid = useMemo(() => budget > 0, [budget]);

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-5">
        <label
          htmlFor="budget"
          className="text-4xl text-blue-600 font-bold text-center"
        >
          Definir presupuesto
        </label>
      </div>
      <input
        id="number"
        type="number"
        className={`w-full bg-white border border-gray-200 p-2 ${
          !isValid && "border border-red-600 focus-visible:outline-red-800"
        }`}
        placeholder="Define tu presupuesto"
        name="budget"
        value={budget}
        onChange={handleChange}
      />
      <input
        type="submit"
        disabled={!isValid}
        value="Definir presupesto"
        className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-bold disabled:opacity-40 disabled:hover:bg-blue-600 disabled:cursor-default"
      />
    </form>
  );
};

export default BudgetForm;

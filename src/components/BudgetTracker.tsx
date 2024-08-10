import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";

const BudgetTracker = () => {
  const { state } = useBudget();

  const spent = useMemo(
    () =>
      state.expenses.reduce((total, curr) => {
        return curr.amount + total;
      }, 0),
    [state.expenses]
  );

  const available = useMemo(() => state.budget - spent, [spent, state.budget]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <img src="./grafico.jpg" alt="Gráfica de gastos" />
      </div>
      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
        >
          Resetear App
        </button>
        <AmountDisplay label="Presupuesto" amount={state.budget} />

        <AmountDisplay label="Disponible" amount={available} />
        <AmountDisplay label="Gastado" amount={spent} />
      </div>
    </div>
  );
};

export default BudgetTracker;

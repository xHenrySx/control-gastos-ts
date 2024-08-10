import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import ExpenseListItem from "./ExpenseListItem";

const ExpenseList = () => {
  const { state } = useBudget();

  const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses]);

  return (
    <div className="mt-10">
      {isEmpty ? (
        <p className="text-gray-600 text-2xl font-bold">No hay gastos</p>
      ) : (
        <>
          <p className="text-gray-600 text-2xl font-bold my-5">
            Listado de Gastos
          </p>
          {state.expenses.map((expense) => (
            <ExpenseListItem key={expense.id} expense={expense} />
          ))}
        </>
      )}
    </div>
  );
};

export default ExpenseList;

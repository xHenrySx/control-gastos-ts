import { useEffect, useMemo } from "react";

import BudgetForm from "./components/BudgetForm";
import BudgetTracker from "./components/BudgetTracker";

import { useBudget } from "./hooks/useBudget";
import ExpenseModal from "./components/ExpenseModal";
import ExpenseList from "./components/ExpenseList";

function App() {
  const { state } = useBudget();

  const isValidBudget = useMemo(() => state.budget > 0, [state.budget]);

  useEffect(() => {
    localStorage.setItem("budget", state.budget.toString());
    localStorage.setItem("expenses", JSON.stringify(state.expenses));
  }, [state.budget, state.expenses]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <header className="bg-blue-600 py-8 max-h-72">
          <h1 className="uppercase text-center font-black text-4xl text-white">
            Planificador de gastos
          </h1>
        </header>
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
          {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
        </div>
        {isValidBudget && (
          <main className="max-w-3xl mx-auto py-10">
            <ExpenseList />
            <ExpenseModal />
          </main>
        )}
      </div>

      <footer className="p-2 bg-slate-600 text-center text-sm text-white">
        Realizado por{" "}
        <a
          className="text-green-300 underline"
          href="https://www.linkedin.com/in/henry-saldivar/"
          rel="author noopener external"
          target="_blank"
        >
          Enrique Saldivar
        </a>
      </footer>
    </div>
  );
}

export default App;

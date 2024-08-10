import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import type { DraftExpense, Expense, Value } from "../types";

import { categories } from "../data/categories";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

import ErrorMessage from "./ErrorMessage";

import { useBudget } from "../hooks/useBudget";

const defaultExpense: DraftExpense = {
  amount: 0,
  expenseName: "",
  category: "",
  date: new Date(),
};

const ExpenseForm = () => {
  const [expense, setExpense] = useState<DraftExpense | Expense>(
    defaultExpense
  );
  const [error, setError] = useState("");

  const { dispatch, state } = useBudget();

  useEffect(() => {
    if (!state.editingId) return;
    const editingExpense = state.expenses.find((e) => e.id === state.editingId);

    if (!editingExpense) return;

    setExpense(editingExpense);
  }, [state.expenses, state.editingId]);

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value,
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const isNumberField = ["amount"].includes(name);

    setExpense({
      ...expense,
      [name]: isNumberField ? +value : value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(expense).includes("")) {
      setError("Todos los campos son obligarios.");
      return;
    }

    if (state.editingId) {
      dispatch({
        type: "edit-expense",
        payload: { expense: { id: state.editingId, ...expense } },
      });
      return;
    }

    dispatch({ type: "add-expense", payload: { expense: expense } });
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
        Nuevo Gasto
      </legend>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="flex flex-col gap-2">
        <label className="text-xl" htmlFor="expenseName">
          Nombre Gasto
        </label>
        <input
          type="text"
          id="expenseName"
          placeholder="Añade el Nombre del gasto"
          className="bg-slate-100 p-2"
          name="expenseName"
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xl" htmlFor="amount">
          Fecha:
        </label>
        <DatePicker
          value={expense.date}
          className="bg-slate-100 p-2 border-0"
          onChange={handleChangeDate}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xl" htmlFor="amount">
          Cantidad
        </label>
        <input
          type="number"
          id="amount"
          placeholder="Añade la cantidad del gasto. Ej: 300"
          className="bg-slate-100 p-2"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xl" htmlFor="amount">
          Categoria:
        </label>
        <select
          title="Categoria"
          id="category"
          className="bg-slate-100 p-2"
          name="category"
          value={expense.category}
          onChange={handleChange}
        >
          <option value="">-- Seleccione --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <input
        type="submit"
        className="bg-blue-600 cursor-pointer p-2 text-white uppercase font-bold rounded-lg"
        value={state.editingId ? "Actualizar Gasto" : "Guardar Gasto"}
      />
    </form>
  );
};

export default ExpenseForm;

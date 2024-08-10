import { v4 as uuidv4 } from "uuid";

import { DraftExpense, Expense } from "../types";

interface AddBudget {
  type: "add-budget";
  payload: { budget: number };
}

interface ShowCLoseModal {
  type: "show-close-modal";
}

interface AddExpense {
  type: "add-expense";
  payload: { expense: DraftExpense };
}

interface GetExpenseById {
  type: "get-expense-by-id";
  payload: { id: Expense["id"] };
}

interface DeleteExpense {
  type: "delete-expense";
  payload: { id: Expense["id"] };
}

interface EditExpense {
  type: "edit-expense";
  payload: {
    expense: Expense;
  };
}

export type BudgetActions =
  | AddBudget
  | ShowCLoseModal
  | AddExpense
  | DeleteExpense
  | GetExpenseById
  | EditExpense;

export interface BudgetState {
  budget: number;
  modal: boolean;
  expenses: Expense[];
  editingId: Expense["id"];
}

const initialBudget = (): number => {
  const localStorageBudget = localStorage.getItem("budget");
  if (!localStorageBudget) return 0;
  return +localStorageBudget;
};

const localStorageExpenses = () : Expense[] => {
  const localStorageExpenses = localStorage.getItem('expenses');
  if (!localStorageExpenses) return [];
  return JSON.parse(localStorageExpenses);
}

export const initialState: BudgetState = {
  budget: initialBudget(),
  modal: false,
  expenses: localStorageExpenses(),
  editingId: "",
};

const createExpense = (draftExpense: DraftExpense): Expense => {
  return {
    ...draftExpense,
    id: uuidv4(),
  };
};

export const budgetReducer = (
  state: BudgetState = initialState,
  action: BudgetActions
) => {
  if (action.type === "add-budget") {
    return {
      ...state,
      budget: action.payload.budget,
    };
  }

  if (action.type === "show-close-modal") {
    if (state.modal) {
      return {
        ...state,
        modal: !state.modal,
        editingId: "",
      };
    }

    return {
      ...state,
      modal: !state.modal,
    };
  }

  if (action.type === "add-expense") {
    const expense = createExpense(action.payload.expense);

    return {
      ...state,
      expenses: [...state.expenses, expense],
      modal: false,
    };
  }

  if (action.type === "get-expense-by-id") {
    return {
      ...state,
      editingId: action.payload.id,
      modal: true,
    };
  }

  if (action.type === "delete-expense") {
    const expenses = state.expenses.filter((e) => e.id !== action.payload.id);

    return {
      ...state,
      expenses,
    };
  }

  if (action.type === "edit-expense") {
    const expenses = state.expenses.map((e) => {
      if (e.id === action.payload.expense.id) {
        return action.payload.expense;
      }
      return e;
    });

    return {
      ...state,
      expenses,
      modal: false,
      editingId: "",
    };
  }

  return state;
};

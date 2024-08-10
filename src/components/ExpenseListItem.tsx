import { useMemo } from "react";

// Types
import { Expense } from "../types";

// Dependencys
import {
  LeadingActions,
  SwipeableList,
  SwipeAction,
  SwipeableListItem,
  TrailingActions,
} from "react-swipeable-list";

// Components
import AmountDisplay from "./AmountDisplay";

// Data
import { categories } from "../data/categories";

// Utils
import { formatDate } from "../helpers";

// Hooks
import { useBudget } from "../hooks/useBudget";

// CSS
import "react-swipeable-list/dist/styles.css";

interface ExpenseListItemProps {
  expense: Expense;
}

const ExpenseListItem = ({ expense }: ExpenseListItemProps) => {
  const { dispatch } = useBudget();

  const categoryInfo = useMemo(
    () => categories.filter((cat) => cat.id === expense.category)[0],
    [expense]
  );

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() =>
          dispatch({ type: "get-expense-by-id", payload: { id: expense.id } })
        }
      >
        Actualizar
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() =>
          dispatch({ type: "delete-expense", payload: { id: expense.id } })
        }
        destructive
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={30}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center">
          <div>
            <img
              src={`/icono_${categoryInfo.icon}.svg`}
              alt="icono-gasto"
              className="w-20"
            />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-bold uppercase text-slate-500">
              {categoryInfo.name}
            </p>
            <p>{expense.expenseName}</p>
            <p className="text-slate-600 text-sm">
              {formatDate(expense.date!.toString())}
            </p>
          </div>
          <AmountDisplay amount={expense.amount} />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default ExpenseListItem;

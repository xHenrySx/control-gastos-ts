import { formatCurrency } from "../helpers";

interface AmountDisplayProps {
  label?: string;
  amount: number;
}

const AmountDisplay = ({ label, amount }: AmountDisplayProps) => {
  return (
    <p className="text-2xl text-blue-600 font-bold">
      {label && `${label} : `}
      <span
        className={`font-black  ${amount < 0 ? "text-red-500" : "text-black"}`}
      >
        {formatCurrency(amount)}
      </span>
    </p>
  );
};

export default AmountDisplay;

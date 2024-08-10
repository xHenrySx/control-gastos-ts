import { ReactNode } from "react";

interface ErrorMessageProps {
  children: ReactNode;
}

const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return (
    <p className="bg-red-600 p-2 text-white font-bold text-sm text-center">
      {children}
    </p>
  );
};

export default ErrorMessage;

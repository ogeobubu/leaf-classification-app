import React from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  href,
  onClick,
  disabled
}) => {
  return (
    <>
      {href ? (
        <Link to={href}>
          <button
            className={`${className} bg-white cursor-pointer rounded-lg px-6 py-2 text-[#083708] hover:bg-white-400`}
            disabled={disabled}
          >
            {children}
          </button>
        </Link>
      ) : (
        <button
          onClick={onClick}
          disabled={disabled}
          className={`${className} bg-white cursor-pointer rounded-lg px-6 py-2 text-[#083708] hover:bg-white-400`}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Button;

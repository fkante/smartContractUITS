import React from "react";

interface ButtonProps {
  color?: string;
  isDisabled?: boolean;
  onClick: () => void;
  style?: string;
  type: "button" | "submit" | "reset";
  value: string;
}

export default function Button({
  color,
  isDisabled = false,
  onClick,
  style,
  type,
  value,
}: ButtonProps) {
  return (
    <button
      className={`${
        isDisabled && "cursor-not-allowed opacity-50"
      } ${color ? color : `bg-gradient-to-br from-purple-400 via-green-400 to-blue-400 hover:from-green-400 hover:to-green-400`} flex self-center justify-center py-3 px-10 text-sm leading-5 font-medium rounded-lg transition duration-150 ease-in-out text-white ${style}`}
      disabled={isDisabled}
      onClick={onClick}
      type={type}
    >
      {value}
    </button>
  );
}

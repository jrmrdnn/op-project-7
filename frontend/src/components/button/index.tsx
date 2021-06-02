import { h } from "preact";
import "./style.scss";

type ButtonProps = {
  title: string;
  type?: "button" | "submit" | "reset";
  style?: "danger" | "succes";
  icon?: any;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: (e: any) => void;
};

export default function Button({
  title,
  type = "button",
  style,
  icon,
  disabled = false,
  isLoading = false,
  onClick,
}: ButtonProps) {
  const addAllClasses: string[] = ["btn"];

  if (style) addAllClasses.push(style);

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={addAllClasses.join(" ")}
    >
      {!isLoading && icon && icon}
      {isLoading ? "Chargement ..." : title}
    </button>
  );
}

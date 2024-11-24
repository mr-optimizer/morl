// app/components/Button/Button.tsx
import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  height?: string;
  width?: string;
  padding?: string;
  bgColor?: string;
  btnText?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  height = "auto",
  width = "auto",
  padding = "auto",
  bgColor = "#e63946",
  btnText = "Button Text",
  onClick,
}) => {
  return (
    <button
      className={styles.button}
      style={{ height, width, padding, backgroundColor: bgColor }}
      onClick={onClick}
    >
      {btnText}
    </button>
  );
};

export default Button;

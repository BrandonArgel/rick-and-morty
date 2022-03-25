import * as React from "react";
import styles from "./index.module.scss";

interface Props {
  defaultValue?: number;
  label?: string;
  max: number;
  min?: number;
  setValue: (value: number) => void;
  type: string;
}

const Input = ({ defaultValue = 1, label = "", max, min = 1, setValue, type }: Props) => {
  const [page, setPage] = React.useState(defaultValue); 

  return (
      <label className={styles.label}>
        {label}
        <input
        className={styles.input}
        min={min}
        max={max}
        onChange={(e) => {
          if(+e.target.value > max) {
            setPage(max);
          } else if(+e.target.value < min) {
            setPage(min);
          } else {
            setPage(+e.target.value);
          }
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            setValue(page);
          }
        }}
        type={type}
        value={page}
      />
      </label>
  );
}

export default Input;

import * as React from "react";
import styles from "./index.module.scss";

interface Props {
  defaultValue?: number;
  max: number;
  min?: number;
  setValue: (value: number) => void;
  type: string;
}

const Input = ({ defaultValue = 1, max, min = 1, setValue, type }: Props) => {
  const [page, setPage] = React.useState(defaultValue); 

  return (
      <input
        className={styles.input}
        defaultValue={defaultValue}
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
  );
}

export default Input;

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

  React.useEffect(() => {
    setPage(defaultValue);
  }, [defaultValue]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (+e.target.value > max) {
			setPage(max);
		} else if (+e.target.value < min) {
			setPage(min);
		} else {
			setPage(+e.target.value);
		}
	};

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setValue(page);
    }
  };

	return (
		<label className={styles.label}>
			{label}
			<input
				className={styles.input}
				min={min}
				max={max}
				onChange={handleChange}
        onKeyDown={handleKeyDown}
				type={type}
				value={page}
			/>
		</label>
	);
};

export default Input;

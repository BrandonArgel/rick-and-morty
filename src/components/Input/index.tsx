import * as React from "react";
import styles from "./index.module.scss";

interface Props {
	value: number;
	label: string;
	max?: number;
	min?: number;
	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	type: string;
}

const Input = ({
	value = 1,
	label = "",
	max,
	min = 1,
	type,
	onBlur,
	onChange,
	onKeyDown,
}: Props) => {
	return (
		<label className={styles.label}>
			{label}
			<input
				className={styles.input}
				min={min}
				max={max}
				onBlur={onBlur}
				onChange={onChange}
				onKeyDown={onKeyDown}
				type={type}
				value={value}
			/>
		</label>
	);
};

export default Input;

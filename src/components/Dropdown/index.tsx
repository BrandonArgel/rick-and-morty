import * as React from "react";
import styles from "./index.module.scss";

interface Props {
	title: string;
	options: string[];
	setValue: (value: string) => void;
	value: string;
	multiSelect?: boolean;
}

const Dropdown = ({ title = "", options = [], setValue, value }: Props) => {
	return (
		<label htmlFor={title} className={styles.dropdown}>
			<select
				className={styles.dropdown__select}
        id={title}
				onChange={(e) => setValue(e.target.value.toLowerCase())}
				title={title}
				value={value}
			>
				{title && <option value="">{title}</option>}
				{options.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		</label>
	);
};

export default Dropdown;

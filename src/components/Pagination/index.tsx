import * as React from "react";
import { Button, Input } from "components";
import { InfoModel } from "models";
import styles from "./index.module.scss";

interface Props {
	loading: boolean;
	page: number;
	setPage: (page: number) => void;
	info: InfoModel;
}

const Pagination: React.FC<Props> = ({ loading, page, setPage, info }) => {
	const [input, setInput] = React.useState(page);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(Number(e.target.value));
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			setPage(Number(e.currentTarget.value));
		}
	};

	const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		setPage(Number(e.currentTarget.value));
	};

	const handlePrev = () => {
		setPage(page - 1);
		setInput(page - 1);
	};

	const handleNext = () => {
		setPage(page + 1);
		setInput(page + 1);
	};

	return (
		<div className={styles.pagination}>
			<Button type="button" onClick={handlePrev} disabled={!info?.prev || loading}>
				Prev
			</Button>
			<span>
				<Input
					type="number"
					value={input}
					label="Page:"
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					onBlur={handleOnBlur}
					max={info?.pages || 1}
				/>{" "}
				/ {info?.pages || 0}
			</span>
			<Button type="button" onClick={handleNext} disabled={!info?.next || loading}>
				Next
			</Button>
		</div>
	);
};

export default Pagination;

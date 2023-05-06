import * as React from "react";
import { UserContext, FiltersContext } from "context";
import { Button, Input } from "components";
import styles from "./index.module.scss";

const Pagination = () => {
	const { info, loading } = React.useContext(UserContext);
	const { page, setPage } = React.useContext(FiltersContext);
	const [input, setInput] = React.useState(page);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.value) return;
		if (Number(e.target.value) > info?.pages) {
			setInput(info?.pages ?? 1);
			return;
		}
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

	React.useEffect(() => {
		setInput(page);
	}, [page]);

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
					max={info?.pages ?? 1}
					min={1}
				/>{" "}
				/ {info?.pages ?? 0}
			</span>
			<Button type="button" onClick={handleNext} disabled={!info?.next || loading}>
				Next
			</Button>
		</div>
	);
};

export default Pagination;

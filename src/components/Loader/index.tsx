import { Loader as LoaderIcon } from "assets/icons";
import styles from "./index.module.scss";

const Loader = () => {
	return (
		<div className={styles.loader}>
			<LoaderIcon />
		</div>
	);
};

export default Loader;

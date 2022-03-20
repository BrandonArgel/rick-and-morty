import { Close } from "assets/icons";
import styles from "./index.module.scss";

interface Props {
	children: React.ReactNode;
	open: boolean;
	setOpen: () => void;
}

const Modal = ({ children, open, setOpen }: Props) => {
	return (
		<>
			<button className={`${styles.overlay} ${open ? styles.visible : ""}`} onClick={() => setOpen()}>
				<aside className={`${styles.modal} ${open ? styles.open : ""}`} onClick={(e) => e.stopPropagation()}>
					<button className={styles.close} onClick={() => setOpen()} aria-label="Cerrar modal"><Close /></button>
					{children}
				</aside>
			</button>
		</>
	);
};

export default Modal;

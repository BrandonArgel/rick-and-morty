import styles from "./index.module.scss";

interface Props {
	children: React.ReactNode;
	open: boolean;
	setOpen: () => void;
}

const Modal = ({ children, open, setOpen }: Props) => {
	return (
		<>
			{open && (
				<>
					<button className={styles.overlay} onClick={() => setOpen()}>
            <dialog className={`${styles.modal} ${open ? styles.open : ""}`} onClick={(e) => e.stopPropagation()}>
              {children}
            </dialog>
          </button>
				</>
			)}
		</>
	);
};

export default Modal;

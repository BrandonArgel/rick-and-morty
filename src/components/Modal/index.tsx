import * as React from "react";
import * as ReactDOM from "react-dom";
import { Close } from "assets/icons";
import { CharacterModel } from "models";
import styles from "./index.module.scss";

interface Props {
	character: CharacterModel;
	open: boolean;
	close: () => void;
}

const Modal = ({
	character: { id, image, name, status, species, type, location, dimension, originName },
	open,
	close,
}: Props) => {
	const asideRef = React.useRef<HTMLButtonElement>(null);

	React.useEffect(() => {
		if (open) setTimeout(() => asideRef.current?.focus(), 100);
	}, [open]);

	return ReactDOM.createPortal(
		<>
			<button
				className={`${styles.overlay} ${open ? styles.visible : ""}`}
				onClick={() => close()}
				aria-hidden={!open}
				tabIndex={-1}
				type="button"
			/>
			<aside
				ref={asideRef}
				className={`${styles.modal} ${open ? styles.open : ""}`}
				aria-hidden={!open}
				tabIndex={0}
			>
				<button className={styles.close} onClick={() => close()} aria-label="Cerrar modal">
					<Close />
				</button>
				{id && (
					<>
						<img src={image} alt={name} width={200} height={200} />
						<div>
							<h2>{name}</h2>
							<p>
								<strong>Status:</strong> {status}{" "}
								<span>{status === "Alive" ? "🟢" : status === "Dead" ? "🔴" : "⚪"}</span>
							</p>
							<p>
								<strong>Species:</strong> {species}
							</p>
							{type && (
								<p>
									<strong>Type:</strong> {type}
								</p>
							)}
							<p>
								<strong>Location:</strong> {location}
							</p>
							<p>
								<strong>Origin:</strong> {originName}
							</p>
							<p>
								<strong>Dimension:</strong> {dimension}
							</p>
						</div>
					</>
				)}
			</aside>
		</>,
		document.getElementById("modal") as HTMLDivElement
	);
};

export default Modal;

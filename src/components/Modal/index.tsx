import * as React from "react";
import { Close } from "assets/icons";
import styles from "./index.module.scss";

interface Props {
	character: any;
	open: boolean;
	close: () => void;
}

const Modal = ({ character = {}, open, close }: Props) => {
	const asideRef = React.useRef<HTMLButtonElement>(null);

	React.useEffect(() => {
		if (open) setTimeout(() => asideRef.current?.focus(), 100);
	}, [open]);

	return (
		<>
			<button
				className={`${styles.overlay} ${open ? styles.visible : ""}`}
				onClick={() => close()}
				aria-hidden={!open}
				tabIndex={-1}
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
				{character.id && (
					<>
						<img src={character.image} alt={character.name} width={200} height={200} />
						<div>
							<h2>{character?.name}</h2>
							<p>
								<strong>Status:</strong> {character?.status}{" "}
								<span>
									{character?.status === "Alive"
										? "🟢"
										: character?.status === "Dead"
										? "🔴"
										: "⚪"}
								</span>
							</p>
							<p>
								<strong>Species:</strong> {character?.species}
							</p>
							{character?.type && (
								<p>
									<strong>Type:</strong> {character?.type}
								</p>
							)}
							<p>
								<strong>Location:</strong> {character?.location}
							</p>
							<p>
								<strong>Origin:</strong> {character?.originName}
							</p>
							<p>
								<strong>Dimension:</strong> {character?.dimension}
							</p>
						</div>
					</>
				)}
			</aside>
		</>
	);
};

export default Modal;

import { Close } from "assets/icons";
import styles from "./index.module.scss";

interface Props {
	character: any;
	open: boolean;
	setOpen: () => void;
}

const Modal = ({ character, open, setOpen }: Props) => {
	return (
		<>
			<button
				className={`${styles.overlay} ${open ? styles.visible : ""}`}
				onClick={() => setOpen()}
			/>
			<aside className={`${styles.modal} ${open ? styles.open : ""}`}>
				<button className={styles.close} onClick={() => setOpen()} aria-label="Cerrar modal">
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
								<strong>Location:</strong> {character?.location?.name}
							</p>
							<p>
								<strong>Origin:</strong> {character?.origin?.name}
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

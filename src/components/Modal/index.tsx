import * as React from "react";
import * as ReactDOM from "react-dom";
import { useUser } from "context";
import { Button } from "components";
import { Close } from "assets/icons";
import imgError from "assets/images/error.jpg";
import styles from "./index.module.scss";

const Modal = () => {
	const { character, setCharacter, modal, setModal, setFavorite, removeFavorite } = useUser();
	const {
		id,
		image,
		name,
		status,
		species,
		type,
		gender,
		location,
		dimension,
		originName,
		isFavorite,
	} = character;
	const asideRef = React.useRef<HTMLButtonElement>(null);

	React.useEffect(() => {
		if (modal) setTimeout(() => asideRef.current?.focus(), 100);
	}, [modal]);

	const handleCloseModal = () => {
		setModal(false);
	};

	const handleOnClickFavorite = () => {
		setCharacter({ ...character, isFavorite: !isFavorite });
		isFavorite ? removeFavorite(character) : setFavorite(character);
	};

	return ReactDOM.createPortal(
		<>
			<button
				className={`${styles.overlay} ${modal ? styles.visible : ""}`}
				onClick={handleCloseModal}
				aria-hidden={!modal}
				tabIndex={-1}
				type="button"
			/>
			<aside
				ref={asideRef}
				className={`${styles.modal} ${modal ? styles.open : ""}`}
				aria-hidden={!modal}
				tabIndex={0}
			>
				<div className={styles.modal__content}>
					{id && (
						<>
							<img src={image || imgError} alt={name} width={200} height={200} />
							<div>
								<h2>{name}</h2>
								<p>
									<strong>Status:</strong> {status}{" "}
									<span>{status === "Alive" ? "🟢" : status === "Dead" ? "🔴" : "⚪"}</span>
								</p>
								<p>
									<strong>Gender:</strong> {gender}
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
									<strong>Location:</strong> {location?.name}
								</p>
								<p>
									<strong>Origin:</strong> {originName}
								</p>
								<p>
									<strong>Dimension:</strong> {dimension}
								</p>
								<Button type="button" onClick={handleOnClickFavorite}>
									{isFavorite ? "Remove from favorites" : "Add to favorites"}
								</Button>
							</div>
						</>
					)}
					<button
						className={styles.modal__content_close}
						onClick={handleCloseModal}
						aria-label="Close modal"
						title="Close modal"
					>
						<Close />
					</button>
				</div>
			</aside>
		</>,
		document.getElementById("modal") as HTMLDivElement
	);
};

export default Modal;

import * as React from "react";
import styles from "./index.module.scss";

interface Props {
	characters: any[];
	changeModal: (character: any[], i: number) => void;
	lastFocus: number;
	modal: boolean;
}

const Characters: React.FC<Props> = ({ characters, changeModal, lastFocus, modal }) => {
	React.useEffect(() => {
		// If the modal is closed, focus on the last focused character
		if (!modal && lastFocus !== -1) {
			// Get the character element with the key of the last focused character
			const character = document.getElementById(`character-${lastFocus}`);
			// Focus on the character element
			character!.focus();
		}
	}, [lastFocus, modal]);
	return (
		<section className={styles.characters}>
			{characters &&
				characters.map((character: any, i) => (
					<button
						id={`character-${i}`}
						key={character.id}
						className={styles.character}
						onClick={() => changeModal(character, i)}
						aria-label={`Ver detalles de ${character.name}`}
					>
						<img
							src={character.image}
							alt={character.name}
							loading="lazy"
							width={200}
							height={200}
						/>
						<p>{character.name}</p>
					</button>
				))}
		</section>
	);
};

export default Characters;

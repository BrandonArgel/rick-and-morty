import * as React from "react";
import { Card } from "components";
import { CharacterModel } from "models";
import styles from "./index.module.scss";

interface CharactersProps {
	characters: CharacterModel[];
	changeModalCharacter: (e: React.SyntheticEvent<EventTarget>) => void;
	lastFocus: number;
	modal: boolean;
}

const Characters: React.FC<CharactersProps> = ({
	characters,
	changeModalCharacter,
	lastFocus,
	modal,
}) => {
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
		<section className={styles.characters} onClick={changeModalCharacter}>
			{characters &&
				characters.map((character, i) => (
					<Card
						character={character}
						changeModalCharacter={changeModalCharacter}
						lastFocus={lastFocus}
						modal={modal}
						key={i}
					/>
				))}
		</section>
	);
};

export default Characters;

import * as React from "react";
import { Card } from "components";
import { CharacterModel } from "models";
import styles from "./index.module.scss";

interface CharactersProps {
	characters: CharacterModel[];
	changeModalCharacter: (e: React.SyntheticEvent<EventTarget>) => void;
	lastFocus: number;
	modal: boolean;
	loading?: boolean;
}

const Characters: React.FC<CharactersProps> = ({
	characters,
	changeModalCharacter,
	lastFocus,
	modal,
	loading
}) => {
	return (
		<section id="characters" className={styles.characters} onClick={changeModalCharacter}>
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

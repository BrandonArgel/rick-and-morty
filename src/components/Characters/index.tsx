import * as React from "react";
import { useUser } from "context";
import { Card } from "components";
import styles from "./index.module.scss";

const Characters = () => {
	const { characters, changeModalCharacter } = useUser();
	
	return (
		<section id="characters" className={styles.characters} onClick={changeModalCharacter}>
			{characters && characters.map((character, i) => <Card character={character} key={i} />)}
		</section>
	);
};

export default Characters;

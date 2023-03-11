import * as React from "react";
import { UserContext } from "context";
import { Card } from "components";
import styles from "./index.module.scss";

const Characters = () => {
	const { characters, changeModalCharacter } = React.useContext(UserContext);
	return (
		<section id="characters" className={styles.characters} onClick={changeModalCharacter}>
			{characters && characters.map((character, i) => <Card character={character} key={i} />)}
		</section>
	);
};

export default Characters;

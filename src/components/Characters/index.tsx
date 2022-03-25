import styles from "./index.module.scss";

interface Props {
	characters: any[];
	changeModal: (character: any[]) => void;
}

const Characters: React.FC<Props> = ({ characters, changeModal }) => {
	return (
		<section className={styles.characters}>
			{characters &&
				characters.map((character: any) => (
					<div
						key={character.id}
						className={styles.character}
						onClick={() => changeModal(character)}
					>
						<img src={character.image} alt={character.name} loading="lazy" />
						<p>{character.name}</p>
					</div>
				))}
		</section>
	);
};

export default Characters;

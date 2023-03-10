import * as React from "react";
import { CharacterModel } from "models";
import { lazyLoading } from "utils";
import imgError from "assets/images/error.jpg";
import styles from "./index.module.scss";

interface Props {
	character: CharacterModel;
	lastFocus: number;
	modal: boolean;
}

const Characters: React.FC<Props> = ({ character, lastFocus, modal }) => {
	const imgRef = React.useRef<HTMLImageElement>(null);

	React.useEffect(() => {
		if (imgRef.current) {
			lazyLoading(imgRef);
		}
	}, [character]);

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
		<button
			id={`character-${character.id}`}
			key={character.id}
			className={`${styles.character} skeleton`}
			data-id={character.id}
			data-image={character?.image || imgError}
			aria-label={`Ver detalles de ${character.name}`}
			data-location={character?.location?.name}
			data-name={character?.name}
			data-origin-name={character?.origin?.name}
			data-origin-url={character?.origin?.url}
			data-status={character?.status}
			data-species={character?.species}
			data-type={character?.type}
			data-gender={character?.gender}
		>
			<img
				className="hide"
				data-src={character.image}
				alt={character.name}
				width={200}
				height={200}
				ref={imgRef}
			/>
			{character?.image && <p>{character.name}</p>}
		</button>
	);
};

export default Characters;

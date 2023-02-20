import * as React from "react";
import { CharacterModel } from "models";
import { lazyLoading } from "hooks";
import styles from "./index.module.scss";

interface Props {
	character: CharacterModel;
	changeModalCharacter: (e: React.SyntheticEvent<EventTarget>) => void;
	lastFocus: number;
	modal: boolean;
}

const Characters: React.FC<Props> = ({ character, changeModalCharacter, lastFocus, modal }) => {
	const imgRef = React.useRef<HTMLImageElement>(null);

	React.useEffect(() => {
		if (imgRef.current) {
			lazyLoading(imgRef);
		}
	}, [character]);

	return (
		<button
			id={`character-${character.id}`}
			key={character.id}
			className={`${styles.character} skeleton`}
			data-id={character.id}
			data-image={character?.image}
			aria-label={`Ver detalles de ${character.name}`}
			data-location={character?.location?.name}
			data-name={character?.name}
			data-origin-name={character?.origin?.name}
			data-origin-url={character?.origin?.url}
			data-status={character?.status}
			data-species={character?.species}
		>
			<img data-src={character.image} alt={character.name} width={200} height={200} ref={imgRef} />
			<p>{character.name}</p>
		</button>
	);
};

export default Characters;

import * as React from "react";
import { UserContext } from "context";
import { CharacterModel } from "models";
import { lazyLoading } from "utils";
import imgError from "assets/images/error.jpg";
import styles from "./index.module.scss";
const clicked = "favorite";

interface Props {
	favorite: CharacterModel;
}

const Badge: React.FC<Props> = ({ favorite }) => {
	const { lastFocus, modal } = React.useContext(UserContext);
	const imgRef = React.useRef<HTMLImageElement>(null);

	React.useEffect(() => {
		if (imgRef.current) {
			lazyLoading(imgRef);
		}
	}, [favorite]);

	React.useEffect(() => {
		if (!modal && lastFocus) {
			const character = document.getElementById(lastFocus);
			if (character) {
				character.focus();
			}
		}
	}, [lastFocus, modal]);

	return (
		<button
			id={`favorite-${favorite.id}`}
			key={favorite.id}
			className={`${styles.badge} skeleton`}
			data-id={favorite.id}
			data-image={favorite?.image || imgError}
			aria-label={`Ver detalles de ${favorite.name}`}
			data-location={favorite?.location?.name}
			data-name={favorite?.name}
			data-origin-name={favorite?.origin?.name}
			data-origin-url={favorite?.origin?.url}
			data-status={favorite?.status}
			data-species={favorite?.species}
			data-type={favorite?.type}
			data-gender={favorite?.gender}
			data-is-favorite={favorite?.isFavorite}
			data-clicked-from={clicked}
			title={`See details of ${favorite.name}`}
			type="button"
		>
			<img
				className={`${styles.badge__image} hide`}
				data-src={favorite.image}
				alt={favorite.name}
				ref={imgRef}
				width={100}
				height={100}
			/>
		</button>
	);
};

export default Badge;

import * as React from "react";
import { UserContext } from "context";
import imgError from "assets/images/error.jpg";
import styles from "./index.module.scss";

const clicked = "favorite";

const Favorites = () => {
	const sliderRef = React.useRef<HTMLDivElement>(null);
	const { lastFocus, modal, changeModalCharacter, favorites } = React.useContext(UserContext);
	React.useEffect(() => {
		if (!modal && lastFocus) {
			const character = document.getElementById(lastFocus);
			if (character) {
				character.focus();
			}
		}
	}, [lastFocus, modal]);

	React.useEffect(() => {
		const { current: slider } = sliderRef;
		let isDown = false;
		let startX = 0;
		let scrollLeft = 0;

		const onMouseDown = (e: MouseEvent) => {
			isDown = true;
			slider!.classList.add(styles.favorites__container_active);
			startX = e.pageX - slider!.offsetLeft;
			scrollLeft = slider!.scrollLeft;
		};

		const onMouseLeave = () => {
			isDown = false;
			slider!.classList.remove(styles.favorites__container_active);
		};

		const onMouseUp = () => {
			isDown = false;
			slider!.classList.remove(styles.favorites__container_active);
		};

		const onMouseMove = (e: MouseEvent) => {
			if (!isDown) return;
			e.preventDefault();
			const x = e.pageX - slider!.offsetLeft;
			const walk = (x - startX) * 1;
			slider!.scrollLeft = scrollLeft - walk;
		};

		if (slider) {
			slider.addEventListener("mousedown", onMouseDown);
			slider.addEventListener("mouseleave", onMouseLeave);
			slider.addEventListener("mouseup", onMouseUp);
			slider.addEventListener("mousemove", onMouseMove);
		}

		return () => {
			if (slider) {
				slider.removeEventListener("mousedown", onMouseDown);
				slider.removeEventListener("mouseleave", onMouseLeave);
				slider.removeEventListener("mouseup", onMouseUp);
				slider.removeEventListener("mousemove", onMouseMove);
			}
		};
	}, []);

	return (
		<div className={styles.favorites} onClick={changeModalCharacter}>
			<p className={styles.favorites__title}>Favorites:</p>
			{favorites.length > 0 ? (
				<div className={styles.favorites__container} ref={sliderRef}>
					{favorites.map((favorite, i) => (
						<button
							id={`favorite-${favorite.id}`}
							key={favorite.id}
							className={styles.favorites__character}
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
						>
							<img
								className={styles.favorites__character_image}
								src={favorite.image}
								alt={favorite.name}
								key={i}
							/>
						</button>
					))}
				</div>
			) : (
				<p className={styles.favorites__title}>No favorites yet</p>
			)}
		</div>
	);
};

export default Favorites;

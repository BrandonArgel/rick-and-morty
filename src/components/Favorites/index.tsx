import * as React from "react";
import { UserContext } from "context";
import { Badge } from "components";
import styles from "./index.module.scss";


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
						<Badge key={i} favorite={favorite} />
					))}
				</div>
			) : (
				<p className={styles.favorites__empty}>No favorites yet.</p>
			)}
		</div>
	);
};

export default Favorites;

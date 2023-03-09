import styles from "./index.module.scss";

import { Social } from "config";

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.footer__rights}>
				<p>
					Project created with the{" "}
					<a href="https://rickandmortyapi.com/" target="_blank" rel="noopener noreferrer">
						Rick and Morty API
					</a>{" "}
					and{" "}
					<a href="https://platzi.com/" target="_blank" rel="noopener noreferrer">
						Platzi
					</a>
					. 💚
				</p>
				<p>@BrandArgel • All rights reserved ©{new Date().getFullYear()}.</p>
			</div>
			<div className={styles.footer__social}>
				{Social.map(({ link, icon, title }) => (
					<a href={link} key={link} target="_blank" rel="noopener noreferrer" title={title}>
						{icon}
					</a>
				))}
			</div>
		</footer>
	);
};

export default Footer;

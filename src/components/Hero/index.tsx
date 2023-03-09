import Banner from "assets/images/banner.png";
import Banner2x from "assets/images/banner-2x.png";
import BannerSm from "assets/images/banner-sm.png";
import BannerSm2x from "assets/images/banner-sm-2x.png";
import styles from "./index.module.scss";

const Hero = () => (
	<picture>
		<source media="(min-width: 800px)" srcSet={`${Banner} 1x, ${Banner2x} 2x`} />
		<source media="(min-width: 400px)" srcSet={`${BannerSm} 1x, ${BannerSm2x} 2x`} />
		<img className={styles.hero} src={Banner} alt="Rick and Morty logo" width={800} height={251} />
	</picture>
);

export default Hero;

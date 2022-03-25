import BannerLg from "assets/images/banner-lg.png";
import BannerMd from "assets/images/banner-md.png";
import BannerSm from "assets/images/banner-sm.png";
import styles from "./index.module.scss";

const Hero = () => (
  <img
    className={styles.hero}
    srcSet={`${BannerSm} 320w, ${BannerMd} 768w, ${BannerLg} 1024w`}
    src={BannerLg}
    alt="Banner"
  />
)
export default Hero;

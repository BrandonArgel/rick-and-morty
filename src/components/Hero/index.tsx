import Banner from 'assets/images/banner.png';
import styles from './index.module.scss';

const Hero = () => <img className={styles.hero} src={Banner} alt="Logotipo de Rick y Morty" />;

export default Hero;
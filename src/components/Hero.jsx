import React from "react";

import Logotipo from "../assets/img/logotipo.png";
import "./styles/Hero.css";

export default function Hero() {
	return (
		<img className="hero__img" src={Logotipo} alt="Logotipo de Rick and Morty" />
	);
}

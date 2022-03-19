import Particles from "react-tsparticles";

const ParticlesBackground = () => {
	return (
		<Particles
			id="particles"
			params={{
				particles: {
					number: {
						value: 70,
						density: {
							enable: true,
							value_area: 800,
						},
					},
					color: {
						value: "rgba(134, 255, 75, 1)",
					},
					shape: {
						type: "circle",
						stroke: {
							width: 0,
							color: "rgba(134, 255, 75, 1)",
						},
					},
					opacity: {
						value: 1,
						random: false,
						anim: {
							enable: true,
							speed: .5,
							opacity_min: 0.1,
							sync: false,
						},
					},
					size: {
						value: 3,
						random: true,
						anim: {
							enable: false,
							speed: 40,
							size_min: 0.1,
							sync: false,
						},
					},
					line_linked: {
						enable: true,
						distance: 170,
						color: "rgba(134, 255, 75, 1)",
						opacity: 0.1,
						width: 1,
					},
					move: {
						enable: true,
						speed: 2,
						direction: "none",
						random: false,
						straight: false,
						out_mode: "out",
						bounce: false,
						attract: {
							enable: false,
							rotateX: 600,
							rotateY: 1200,
						},
					},
				},
				retina_detect: true,
			}}
			style={{
				width: "100vw",
				height: "100vh",
				position: "fixed",
				top: "0",
				left: "0",
				zIndex: "-1",
			}}
		/>
	);
}

export default ParticlesBackground;
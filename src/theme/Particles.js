import Particles from "react-tsparticles";

const ParticlesBackground = () => {
  const particlesInit = (main) => {
    //console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  };

  const particlesLoaded = (container) => {
    //console.log(container);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          image: "",
          position: "50% 50%",
          repeat: "no-repeat",
          size: "cover",
          opacity: 1
        },
        backgroundMask: {
          composite: "destination-out",
          cover: {
            color: {
              value: "#fff"
            },
          opacity: 1
          },
          enable: false
        },
        fullScreen: {
          enable: true,
          zIndex: 0
        },
        fpsLimit: 90,
        interactivity: {
          detect_on: "canvas",
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "grab",
            },
            resize: true,
          },
          modes: {
            grab: {
                distance: 100,
                line_linked:{
                    opacity: 0.5
                }
            },
            bubble: {
              distance: 200,
              duration: 0.4,
              opacity: 0.8,
              size: 40,
            },
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#000",
          },
          links: {
            color: "#000",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 0.6,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outMode: "bounce",
            random: false,
            speed: 15,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 70,
            limit: 200
          },
          opacity: {
            value: 0.6,
          },
          shape: {
            type: "circle",
          },
          size: {
            random: true,
            value: 3,
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticlesBackground;
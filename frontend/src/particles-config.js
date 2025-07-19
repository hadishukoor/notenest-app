const options = {
  fpsLimit: 60,
  particles: {
    number: {
      value: 200,
      density: {
        enable: true,
      },
    },
    color: {
      value: "#64748b",
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: { min: 0.1, max: 0.5 },
      animation: {
        enable: true,
        speed: 1,
        sync: false,
      },
    },
    size: {
      value: { min: 1, max: 3 },
    },
    move: {
      enable: true,
      speed: 0.5,
      direction: "none",
      straight: false,
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "grab",
      },
    },
    modes: {
      grab: {
        distance: 140,
        links: {
          opacity: 1,
        },
      },
    },
  },
  detectRetina: true,
};

export default options;
const PROJECTS = [
    {
        id: 0,
        title: "Bytebite Customer",
        short: "Mobile-first, white-labeled web application for restaurants, fully customizable through a management dashboard.",
        keyFeatures:["Session creation system through QR Code scanning", "White-labeled application, fully customizable", "Tag system (meat, vegan etc) with algorithm that detects what tags should be applied on the dish based on the ingredient", "Payment and cart system", "Extensive filtering"],
        tags: ["Blazor", "C#", ".NET", "Cloudinary API", "Stripe API"],
        cover: "./bbcustomer.png",
        images:["./bbcustomer.png", "./dionamite.png", "./dionamiteacademy.png"],
        timeline:"",
        link: "https://dionamite.com/",
        github: null
    },
    {
        id: 1,
        title: "Bytebite Management",
        short: "Modern, responsive platform showcasing services and portfolio with integrated contact functionality.",
        tags: ["Blazor", "C#", ".NET", "Cloudinary API", "Stripe API"],
        cover: "./dionamite.png",
        link: "https://dionamite.com/",
        github: null
    },
    {
        id: 2,
        title: "Dionamite",
        short: "Modern, responsive platform showcasing services and portfolio with integrated contact functionality.",
        tags: ["ReactJs", "TailwindCSS"],
        cover: "./dionamite.png",
        link: "https://dionamite.com/",
        github: null
    },
    {
        id: 3,
        title: "Dionamite Academy",
        short: "Online learning platform supporting diverse content types, user profiles, browsing features and payment processing.",
        tags: ["ReactJs", "NodeJs", "MongoDB", "ExpressJs", "TailwindCSS", "Stripe API"],
        cover: "./dionamiteacademy.png",
        link: "https://dionamite.academy/",
        github: null
    },
    {
        id: 4,
        title: "Mr Wipe",
        short: "Cross-platform mobile application for car cleaning services. Has scheduling featuring live map integration, user authentication, and analytics.",
        tags: ["React Native", "NodeJs", "MongoDB", "ExpressJs", "TailwindCSS", "Stripe API"],
        cover: "./mrwipe.png",
        link: null,
        github: null
    },
];

export const GetProjects = () => {
    return PROJECTS;
}

export const GetProject = (id) => {
  return PROJECTS.find(project => project.id === parseInt(id));
}
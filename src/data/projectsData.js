const PROJECTS = [
    {
        id: 0,
        title: "Bytebite Customer",
        description: "Mobile-first, white-labeled web application for restaurants, fully customizable through a management dashboard.",
        tags: ["Blazor", "C#", ".NET", "Cloudinary API", "Stripe API"],
        image: "./bbcustomer.png",
        link: "https://dionamite.com/",
        github: null
    },
    {
        id: 1,
        title: "Bytebite Management",
        description: "Modern, responsive platform showcasing services and portfolio with integrated contact functionality.",
        tags: ["Blazor", "C#", ".NET", "Cloudinary API", "Stripe API"],
        image: "./dionamite.png",
        link: "https://dionamite.com/",
        github: null
    },
    {
        id: 2,
        title: "Dionamite",
        description: "Modern, responsive platform showcasing services and portfolio with integrated contact functionality.",
        tags: ["ReactJs", "TailwindCSS"],
        image: "./dionamite.png",
        link: "https://dionamite.com/",
        github: null
    },
    {
        id: 3,
        title: "Dionamite Academy",
        description: "Online learning platform supporting diverse content types, user profiles, browsing features and payment processing.",
        tags: ["ReactJs", "NodeJs", "MongoDB", "ExpressJs", "TailwindCSS", "Stripe API"],
        image: "./dionamiteacademy.png",
        link: "https://dionamite.academy/",
        github: null
    },
    {
        id: 4,
        title: "Mr Wipe",
        description: "Cross-platform mobile application for car cleaning services. Has scheduling featuring live map integration, user authentication, and analytics.",
        tags: ["React Native", "NodeJs", "MongoDB", "ExpressJs", "TailwindCSS", "Stripe API"],
        image: "./mrwipe.png",
        link: null,
        github: null
    },
];

export const GetProjects = () => {
    return PROJECTS;
}
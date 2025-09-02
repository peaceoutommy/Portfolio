const PROJECTS = [
    {
        id: 1,
        title: "Bytebite Customer",
        short: "Mobile-first, white-labeled web application for restaurants, fully customizable through a management app.",
        description: [
            "Bytebite Customer is a mobile-first, white-labeled web application built for restaurants to deliver a fully customizable digital ordering experience.",
            "The app is tightly integrated with a management dashboard, allowing restaurant owners to control branding, content, and behavior.",
            "Developed as part of a collaborative team, we followed an Agile workflow with structured sprints, daily stand-ups, sprint reviews, and retrospectives.",
            "GitLab was used for version control and issue tracking.",
            "The application was developed using Blazor and .NET, with media assets managed via Cloudinary API and payments processed through Stripe.",
            "To ensure code reliability and maintainability, we wrote unit tests using xUnit and Moq."
        ],
        keyFeatures: [
            "Session management via QR code scanning for intuitive user experience",
            "Fully white-labeled, customizable application adaptable to client branding",
            "Intelligent tagging system (e.g., vegetarian, vegan, meat, gluten)",
            "Secure and user-friendly payment and cart system",
            "Filtering system for menu browsing"
        ],
        challenges: [
            "Real time updates without affecting performance.",
            "Slow image loading time."
        ],
        solutions: [
            "Used WebSockets and optimized the querying process.",
            "Stored the images on a cloud, implemented lazy loading and a skeleton placeholder."
        ],
        tags: ["Blazor", "C#", ".NET", "Cloudinary API", "Stripe API"],
        cover: "./bbcustomer/cover.png",
        images: ["./bbcustomer/menu.png", "./bbcustomer/filters.png", "./bbcustomer/filters.png", "./bbcustomer/filters.png", "./bbcustomer/filters.png"],
        link: null,
        github: null
    },
    {
        id: 2,
        title: "Bytebite Management",
        short: "Desktop-first management app for restaurants enabling full control over menu, stock, kitchen operations, and customer app branding.",
        description: [
            "Bytebite Management is a desktop-first web application designed to give restaurant owners control over their digital ecosystem.",
            "It enables configuration of the Customer app, including theme and branding settings, dish and ingredient management, and smart inventory automation.",
            "The platform features a stock management system: each dish can be linked to specific ingredients with defined quantities, enabling automatic restocking based on threshold and batch size.",
            "Business owners can define and manage intelligent food tags (e.g., vegan, gluten-free), which are applied on the customer side for filtering.",
            "A table management system generates and links QR codes for each table, allowing customers to initiate sessions quickly by scanning them.",
            "The application was developed using Blazor and .NET, with media assets managed via Cloudinary API and payments processed through Stripe.",
            "To ensure code reliability and maintainability, we wrote extensive unit tests using xUnit and Moq."
        ],
        keyFeatures: [
            "Desktop-first responsive admin interface",
            "Theme and branding configuration for the customer-facing app",
            "Ingredient and dish management system",
            "Automated stock tracking and restocking system",
            "Tag system management system",
            "Table creation with auto-generated and printable QR codes",
            "Kitchen dashboard with real-time order monitoring and status updates"
        ],
        challenges: [
            "Complex ingredient-dish relationships for stock tracking",
            "Maintaining real-time synchronization across multiple devices (admin, kitchen, customer)"
        ],
        solutions: [
            "Implemented a relational structure linking dishes to ingredients with quantity ratios",
            "Used WebSockets for real-time updates and state transitions across dashboards"
        ],
        tags: ["Blazor", "C#", ".NET", "Cloudinary API", "Stripe API", "WebSockets"],
        cover: "./bbmanagement/cover.png",
        images: [
            "./bbmanagement/dashboard.png",
            "./bbmanagement/stock.png",
            "./bbmanagement/tables.png",
            "./bbmanagement/kitchen.png",
            "./bbmanagement/themes.png"
        ],
        link: null,
        github: null
    },
    {
        id: 3,
        title: "Dionamite",
        short: "Modern, responsive platform showcasing services and portfolio with integrated contact functionality.",
        tags: ["ReactJs", "TailwindCSS", "Motion"],
        cover: "./dionamite.png",
        link: "https://dionamite.com/",
        github: null
    },
    {
        id: 4,
        title: "Dionamite Academy",
        short: "Online learning platform supporting diverse content types, user profiles, browsing features and payment processing.",
        tags: ["ReactJs", "NodeJs", "MongoDB", "ExpressJs", "TailwindCSS", "Stripe API"],
        cover: "./dionamiteacademy.png",
        link: "https://dionamite.academy/",
        github: null
    },
    {
        id: 5,
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
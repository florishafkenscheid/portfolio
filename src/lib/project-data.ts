import type { Project } from "@/types/api";

// Narratives are carried over verbatim from the original PHP project pages.
// Line breaks inside a narrative are preserved when rendered.
export const PROJECTS: Project[] = [
  {
    slug: "belt",
    title: "BELT",
    summary:
      "A cross-platform benchmarking and testing suite for measuring and comparing Factorio UPS performance.",
    image: "/projects/belt.png",
    githubUrl: "https://github.com/florishafkenscheid/belt",
    liveUrl: null,
    year: 2025,
    status: "archived",
    tags: ["Rust", "CLI", "Factorio"],
    order: 1,
    narrative: {
      what: "A benchmarking and testing suite for Factorio that helps measure UPS performance, batch-test save files, stamp blueprints into base saves, and analyze results through reports and generated charts. The goal is to make repeated performance testing and comparison easier, faster, and more reproducible.",
      why: "I wanted a more universal and reusable way to benchmark Factorio saves than the ad-hoc scripts I had seen before. Building BELT let me create a proper tool that works across platforms, is easy to automate, and is useful both for my own testing workflow and for other players who want clearer performance data.",
      how: "Built in Rust as a cross-platform CLI, BELT automates Factorio performance testing through a set of focused commands for benchmarking, blueprint stamping, chart generation, and sanitizer output parsing. It supports parallel execution, pattern-based save selection, CSV and Markdown report generation, SVG chart output, and optional verbose metrics so benchmark data can be inspected in much more detail.",
    },
  },
  {
    slug: "sharpfish",
    title: "Sharpfish",
    summary:
      "A .NET wrapper library for talking to UCI chess engines such as Stockfish.",
    image: "/projects/sharpfish.png",
    githubUrl: "https://github.com/florishafkenscheid/Sharpfish",
    liveUrl: null,
    year: 2023,
    status: "shipped",
    tags: ["C#", "Chess", "UCI"],
    order: 2,
    narrative: {
      what: "A .NET wrapper library for interacting with UCI chess engines such as Stockfish. Instead of manually handling low-level stdin and stdout communication every time, the library provides a cleaner interface for common engine tasks inside C# applications.",
      why: "I made Sharpfish to simplify engine integration in .NET projects. UCI engines are powerful, but the communication layer is repetitive and awkward to rebuild for every project. Wrapping that protocol in a small library makes experimentation and reuse much easier.",
      how: "Built in C# as a wrapper around a UCI chess engine process, Sharpfish focuses on turning raw engine communication into a simpler API. It manages the engine executable, sends commands such as setting a FEN position, and exposes intuitive asynchronous methods for reading the engine response and retrieving data like the best move.",
    },
  },
  {
    slug: "lobby",
    title: "Lobby",
    summary:
      "A Minecraft plugin that remembers where players were in each world and moves them between worlds and the lobby.",
    image: "/projects/lobby.png",
    githubUrl: "https://github.com/florishafkenscheid/lobby",
    liveUrl: null,
    year: 2024,
    status: "archived",
    tags: ["Java", "Spigot", "Plugin"],
    order: 3,
    narrative: {
      what: "A Minecraft server plugin that manages player world transitions and coordinates storage, built with Java and Maven. The plugin tracks players’ last known locations in different worlds and provides seamless teleportation between them, with a special focus on lobby functionality. Part of a two-plugin system working in tandem with the World Manager plugin to create a complete multi-world management solution.",
      why: "A friend of mine runs a Minecraft server where our friend group regularly plays together. To enhance our gaming experience, I developed this plugin to make navigating between different worlds smoother. Instead of losing our positions or having to remember coordinates when switching between survival, creative, or minigame worlds, the plugin automatically handles all of this for us. Since our group actively plays on the server, it was a perfect opportunity to create something that directly benefits our gaming sessions.",
      how: `Built using Java and the Bukkit/Spigot API, the plugin implements a custom command system and SQLite database integration. It features:
> A robust command architecture using abstract classes for standardized command handling
> SQLite database integration for persistent storage of player coordinates
> World-specific location tracking and restoration
> Smart teleportation that checks if players are already in their requested destination
> Configurable interval settings for server operations`,
    },
  },
  {
    slug: "worldmanager",
    title: "WorldManager",
    summary:
      "A companion plugin to Lobby for creating, closing, and managing multiple Minecraft worlds.",
    image: "/projects/worldmanager.png",
    githubUrl: "https://github.com/florishafkenscheid/worldmanager",
    liveUrl: null,
    year: 2023,
    status: "archived",
    tags: ["Java", "Spigot", "Plugin"],
    order: 4,
    narrative: {
      what: "A complementary Minecraft plugin to the Lobby system that provides comprehensive world management capabilities. It allows server administrators to create, delete, close, and manage multiple worlds dynamically, while maintaining player positions and managing world states. The plugin adds powerful commands for world manipulation and integrates seamlessly with the Lobby plugin for a complete multi-world management solution.",
      why: "While developing the Lobby plugin for our friend group’s server, we realized we needed more robust world management capabilities. A single lobby wasn’t enough - we needed the ability to create temporary worlds, close worlds for maintenance, and manage player transitions between different game environments. This plugin works in tandem with the Lobby plugin to create a complete world management ecosystem, giving our server admin (my friend) the tools needed to maintain multiple worlds efficiently.",
      how: `Built using Java and the Bukkit/Spigot API, the plugin offers extensive world management features:
> Dynamic world creation with support for different environments (Normal, Nether, End)
> World state management (open/close worlds without deletion)
> Coordinate-based teleportation system
> Persistent storage of player locations across worlds
> Automatic player redirection to lobby on world closure
> Integration with existing SQLite database from the Lobby plugin`,
    },
  },
  {
    slug: "pluginhider",
    title: "PluginHider",
    summary:
      "A Minecraft plugin for overriding default server commands with custom behaviour.",
    image: "/projects/pluginhider.png",
    githubUrl: "https://github.com/florishafkenscheid/pluginhider",
    liveUrl: null,
    year: 2023,
    status: "shipped",
    tags: ["Java", "Spigot", "Plugin"],
    order: 5,
    narrative: {
      what: "A Minecraft server plugin focused on replacing default commands with custom functionalities. Developed purely out of curiosity, it offers a framework to override and experiment with default commands, giving more control and flexibility to server admins. This plugin operates independently, allowing seamless command customization without the need for other plugins.",
      why: "I created this plugin to explore command overriding in Minecraft servers. Even though our server didn’t require custom commands, it provided a fun challenge and a chance to learn more about the Bukkit API. With friends on the server, it was a great environment to experiment and see how custom commands could make gameplay unique and enjoyable.",
      how: `Built with Java and the Bukkit/Spigot API, the plugin customizes default Minecraft commands with features such as:
> Command override functionality to replace standard server commands with custom actions
> Standalone deployment without the need for additional plugins
> Extensible command handling to easily add or modify actions
> Integration with server configuration for flexible command management and updates
> Lightweight implementation that doesn’t interfere with other server plugins`,
    },
  },
];

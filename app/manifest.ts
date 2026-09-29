import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "QuestAPIs Academy",
    short_name: "QuestAPIs",
    description: "Learn APIs through guided quests and save your progress.",
    start_url: "/learn?source=pwa",
    scope: "/",
    display: "standalone",
    background_color: "#08131c",
    theme_color: "#08131c",
    orientation: "portrait-primary",
    categories: ["education", "developer tools"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}

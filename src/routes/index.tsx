import { createFileRoute } from "@tanstack/react-router";
import NovaOSSite from "@/components/novaos-site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NovaOS — A New Kind of Desktop Experience" },
      {
        name: "description",
        content:
          "Meet NovaOS, an independent operating system in development, designed around efficiency, simplicity, and a familiar desktop experience.",
      },
      { property: "og:title", content: "NovaOS — A New Kind of Desktop Experience" },
      {
        property: "og:description",
        content:
          "Explore the vision, planned features, and interactive desktop concept for NovaOS.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NovaOSSite,
});
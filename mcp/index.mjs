#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REGISTRY_PATH = resolve(__dirname, "..", "registry", "components.json");

// --- Load the registry once at startup -------------------------------------
let registry;
try {
  registry = JSON.parse(readFileSync(REGISTRY_PATH, "utf8"));
} catch (err) {
  console.error(`[basil-ui-mcp] Failed to read registry at ${REGISTRY_PATH}:`, err.message);
  process.exit(1);
}

const components = Array.isArray(registry.components) ? registry.components : [];

const byName = new Map(
  components.map((c) => [String(c.name).toLowerCase(), c])
);

function summarize(c) {
  return {
    name: c.name,
    category: c.category ?? null,
    description: c.description ?? null,
  };
}

// Simple fuzzy score: substring hits weighted by field.
function scoreComponent(c, q) {
  const query = q.toLowerCase().trim();
  if (!query) return 0;
  const name = String(c.name ?? "").toLowerCase();
  const category = String(c.category ?? "").toLowerCase();
  const description = String(c.description ?? "").toLowerCase();

  let score = 0;
  if (name === query) score += 100;
  if (name.startsWith(query)) score += 40;
  if (name.includes(query)) score += 30;
  if (category.includes(query)) score += 15;
  if (description.includes(query)) score += 10;

  // token-level matching for multi-word / partial queries
  for (const token of query.split(/\s+/).filter(Boolean)) {
    if (name.includes(token)) score += 8;
    if (category.includes(token)) score += 4;
    if (description.includes(token)) score += 2;
  }
  return score;
}

function textResult(payload) {
  return {
    content: [
      {
        type: "text",
        text: typeof payload === "string" ? payload : JSON.stringify(payload, null, 2),
      },
    ],
  };
}

// --- Server ----------------------------------------------------------------
const server = new McpServer({
  name: "basil-ui-mcp",
  version: registry.version ? String(registry.version) : "0.1.0",
});

server.registerTool(
  "list_components",
  {
    title: "List components",
    description:
      "List every component in the Basil UI catalog with its name, category, and description.",
    inputSchema: {},
  },
  async () => {
    return textResult({
      count: components.length,
      components: components.map(summarize),
    });
  }
);

server.registerTool(
  "get_component",
  {
    title: "Get component",
    description:
      "Get the full registry entry for a single component by name, including props, variants, and source paths.",
    inputSchema: {
      name: z.string().describe("Component name, e.g. \"Button\" (case-insensitive)."),
    },
  },
  async ({ name }) => {
    const entry = byName.get(String(name).toLowerCase());
    if (!entry) {
      const suggestions = components
        .map((c) => c.name)
        .filter((n) => String(n).toLowerCase().includes(String(name).toLowerCase()))
        .slice(0, 5);
      return {
        isError: true,
        content: [
          {
            type: "text",
            text:
              `No component named "${name}".` +
              (suggestions.length ? ` Did you mean: ${suggestions.join(", ")}?` : ""),
          },
        ],
      };
    }
    return textResult(entry);
  }
);

server.registerTool(
  "search_components",
  {
    title: "Search components",
    description:
      "Fuzzy-search the catalog by name, description, or category. Returns matching components ranked by relevance.",
    inputSchema: {
      query: z.string().describe("Search text to match against name, description, and category."),
    },
  },
  async ({ query }) => {
    const results = components
      .map((c) => ({ c, score: scoreComponent(c, query) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((r) => summarize(r.c));

    return textResult({
      query,
      count: results.length,
      results,
    });
  }
);

// --- Boot ------------------------------------------------------------------
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(
    `[basil-ui-mcp] ready — ${components.length} components loaded from ${REGISTRY_PATH}`
  );
}

main().catch((err) => {
  console.error("[basil-ui-mcp] fatal:", err);
  process.exit(1);
});

# basil-ui-mcp

An [MCP](https://modelcontextprotocol.io) server that exposes the **Basil UI** component
catalog to any AI agent (Claude, Cursor, etc.). It reads
[`../registry/components.json`](../registry/components.json) at startup and serves it over
stdio.

## Tools

| Tool | Arguments | Returns |
| --- | --- | --- |
| `list_components` | _none_ | Every component's `name`, `category`, and `description`. |
| `get_component` | `name` (string) | The full registry entry for one component, including `props`, `variants`, and source paths. Name match is case-insensitive. |
| `search_components` | `query` (string) | Fuzzy match over name / description / category, ranked by relevance. |

## Install & run

```bash
cd mcp
npm install     # installs @modelcontextprotocol/sdk + zod
npm start       # runs: node index.mjs
```

The server speaks MCP over **stdio**, so running it directly just waits for a client to
connect — that's expected. Point an MCP client at it instead of running it by hand.

You can also run it without a local checkout via `npx` (once published):

```bash
npx -y basil-ui-mcp
```

## Client configuration

### Claude Desktop / Cursor

Add this to your MCP config (`claude_desktop_config.json`, or Cursor's
`~/.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "basil-ui": {
      "command": "npx",
      "args": ["-y", "basil-ui-mcp"]
    }
  }
}
```

### Running from a local clone

If you're developing against a checkout rather than the published package, point the
command at the local file instead:

```json
{
  "mcpServers": {
    "basil-ui": {
      "command": "node",
      "args": ["/absolute/path/to/basil/mcp/index.mjs"]
    }
  }
}
```

## How it resolves the registry

`index.mjs` resolves `components.json` relative to its own module location
(`../registry/components.json`), so it works regardless of the current working directory —
whether launched by `npx`, `npm start`, or an absolute `node` path. If the registry can't be
read, the server prints the resolved path and exits non-zero.

## Requirements

- Node.js >= 18

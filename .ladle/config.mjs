/** @type {import('@ladle/react').UserConfig} */
export default {
  stories: 'src/stories/**/*.stories.{ts,tsx}',
  defaultStory: 'foundations--colors',
  // Base path for GitHub Pages project site (set by CI); '/' for local dev.
  base: process.env.LADLE_BASE || '/',
  addons: {
    a11y: { enabled: true },
  },
};

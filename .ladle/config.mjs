/** @type {import('@ladle/react').UserConfig} */
export default {
  stories: 'src/stories/**/*.stories.{ts,tsx}',
  defaultStory: 'button--primary',
  addons: {
    a11y: { enabled: true },
  },
};

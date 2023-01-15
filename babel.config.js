module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          alias: {
            "@/assets": "./assets",
            "@/components": "./components",
            "@/redux": "./redux",
            "@/screens": "./screens",
            "@/stacks": "./stacks",
            "@/translations": "./translations",
            "@/types": "./types",
            "@/utils": "./utils",
          },
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      ],
    ],
  };
};

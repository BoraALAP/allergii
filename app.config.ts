import { ExpoConfig, ConfigContext } from "expo/config";

module.exports = ({ config }: ConfigContext): ExpoConfig => ({
  ...config,

  name: "Allergii",
  slug: "allergii",
});

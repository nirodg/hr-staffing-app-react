// craco.config.ts
import path from "path";

const config: any = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  // tsconfig: path.resolve(__dirname, "tsconfig.json"),
};

export default config;
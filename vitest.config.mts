import { defineConfig } from "vitest/config"
import circleDependency from "vite-plugin-circular-dependency"

export default defineConfig({
    plugins: [circleDependency()],
    test: {
        includeSource: ["src/**/*.ts"],
        include: ["src/**/*.test.ts"],
        globals: true,
        passWithNoTests: true,
        silent: false,
        reporters: ["basic", "junit"],
        outputFile: {
            junit: "./TestResult.xml"
        },
        coverage: {
            reporter: ["cobertura", "text"],
            provider: "v8",
            exclude: ["src/index.ts", "src/typeclass", "src/**/*.test.ts", "src/vite-env.d.ts"]
        }
    }
})

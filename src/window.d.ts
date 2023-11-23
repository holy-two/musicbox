interface Window {
    readonly theme: "dark" | "light"
}

declare const windos: Window & typeof globalThis

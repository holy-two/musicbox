import type { Component } from 'solid-js';
import moon from './../../assets/moon.svg?raw';
import sun from './../../assets/sun.svg?raw';
import "./index.scss";

const themeTuple = ["dark", "light"] as const;

export default (() => {
    return <button
        id="themeToggle"
        class="na-button"
        innerHTML={moon + sun}
        title="theme toggle"
        onclick={() => {
            const theme = themeTuple.at(themeTuple.indexOf(window.theme) - 1);
            document.documentElement.dataset["theme"] = theme;
            localStorage.setItem("theme", theme);
        }}
    />
}) as Component


import { useState, useEffect } from "react";

import { ReactComponent as DarkTheme } from "../images/dark-theme.svg"
import { ReactComponent as LightTheme } from "../images/light-theme.svg"

// add and remove "dark" class to the html tag - control tailwind css dark and light theme
// I didn't use local storage, so on each page refresh set to prefered theme

export default function ThemeChanger() {
    const [theme, setTheme] = useState(null)

    useEffect(() => {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme("dark")
        }
        else {
            setTheme("light")
        }
    }, [])

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [theme])

    const handleThemeSwitch = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }
    return (
        <div className="grid place-items-center">
            <button onClick={handleThemeSwitch}>
                <LightTheme className="hidden dark:block h-7 w-auto" />
                <DarkTheme className="dark:hidden block h-7 w-auto" />
            </button>
        </div>
        
    )
}

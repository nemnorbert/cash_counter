import useLocalStorage from "use-local-storage";
import "./DarkMode.scss";

export default function DarkMode({ translate }) {
    const bodyClass= document.querySelector("body").classList;
    const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [isDark, setIsDark] = useLocalStorage("isDark", preference);
    isDark ? bodyClass.add("darkmode") : null;

    const handleDarkButton = () => {
        setIsDark(d => !d);
        bodyClass.toggle("darkmode");
    }

    return (
        <div className="toggle-container">
            <input 
                type="checkbox"
                id="check"
                className="toggle"
                onChange={handleDarkButton}
                checked={isDark}
            />
            <label htmlFor="check">{ translate }</label>
        </div>
    )
}
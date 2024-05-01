import { useState } from "preact/hooks";

export default function DarkMode() {
    const [dark, setDark] = useState(false);

    const handleDarkButton = () => {
        setDark(d => !d);
        document.querySelector("body").classList.toggle("darkmode");
        console.log(dark);
    }

    return (
        <button onClick={handleDarkButton}>DarkMode</button>
    )
}
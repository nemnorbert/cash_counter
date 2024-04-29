export default function CurrencySwitcher({ languages, translate, onChangeLang }) {
    return (<>
        <select onChange={onChangeLang} value={translate.iso} name="language" id="language">
            {
                Object.keys(languages).map((key, i) => (
                    <option key={i} value={key}>{key.toUpperCase()}</option>
                ))
            }
        </select>
    </>)
}
export default function Saves({ translate, saves }) {
    return (
        <section className="saves">
            <div className="title">
                <h2>{ translate.title ?? "Saved" }</h2>
            </div>
            <div className="content">
                <div className="saves">
                    {
                        saves.map(save => {
                            return <div key={save.time}>
                                        {save.time} Total: {save.total}
                                    </div>;
                        })
                    }
                </div>
                <button>{ translate.purge ?? "Delete all data"}</button>
            </div>
        </section>
    );
}
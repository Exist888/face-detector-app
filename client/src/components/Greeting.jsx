export function Greeting({ user }) {
    const firstName = user.name.split(" ")[0];
    const entries = user.entries;

    return (
        <section className="rank-notification">
            <span>{`Hi, ${firstName}. Your photo count is `}<b>{`# ${entries}`}</b></span>
            <hr/>
        </section>
    );
}
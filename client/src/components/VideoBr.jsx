import video from "../assets/video-bg.mp4";

export function VideoBr() {
    return (
        <video
            className="video-background"
            autoPlay
            loop
            muted
            playsInline
            >
            <source src={video} type="video/mp4"/>
        </video>
    );
}
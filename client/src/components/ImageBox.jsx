export function ImageBox({ 
    imageUrl,
    imageRef,
    onImageLoad,
    isLoadingFaceBox,
    boxes,
}) {

    const loadingNotification = (
        <span className="loading-notification">
            Detecting faces...
        </span>
    );

    const boxesJsx = boxes.map((box, index) => {
        return (
            <div 
                key={index}
                className="bounding-box"
                style={{ 
                    position: "absolute",
                    top: `${box.top}px`,
                    left: `${box.left}px`,
                    width: `${box.width}px`,
                    height: `${box.height}px`,
                    border: "3px solid lime",
                }}
            >
            </div>
        );
    });

    return (
        <div className="elements-container">
            <div className="image-box">
                {isLoadingFaceBox ? loadingNotification : null}
                <img 
                    ref={imageRef}
                    src={imageUrl} 
                    alt="photo supplied by website user"
                    onLoad={onImageLoad}
                />
                {boxesJsx}
            </div>
        </div>
    );
}
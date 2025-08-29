export function calculateFaceBoxes(faces, width, height) {
    const faceBoxes = faces.map((face) => {
        const { topRow, leftCol, bottomRow, rightCol } = face.boundingBox;

        return {
            top: topRow * height,
            left: leftCol * width,
            width: (rightCol - leftCol) * width,
            height: (bottomRow - topRow) * height
        }
    });
    return faceBoxes;
}
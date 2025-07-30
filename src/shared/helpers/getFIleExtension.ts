export function getImageType(mimeType: string): string {
    let type = mimeType.split("/")[1].toUpperCase();
    return type.includes("+") ? type.split("+")[0] : type;
}

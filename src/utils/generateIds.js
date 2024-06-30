export const generateIDs = () => {
    const array = new Uint32Array(1);
    const value = window.crypto.getRandomValues(array);
    return value;
}

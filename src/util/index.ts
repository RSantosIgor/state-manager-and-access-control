export const indentationText = (x: number) => {
    let indentation = '';
    for (let index = 0; index < x; index++) {
        indentation = indentation + '\t';
    }
    return indentation;
}
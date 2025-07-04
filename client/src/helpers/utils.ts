export const appendComma = (
    str: string,
    i: number,
    arrLength: number
): string => {
    if (i != arrLength - 1) return (str += ',');
    return str;
};

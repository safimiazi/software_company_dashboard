export const textFormat = (text: string = "mohibulla miazi shafi", length: number = 2): string => {
    const splitedData = text.split(" ");
    if (splitedData.length > length) {
       return `${splitedData.slice(0, length).join(" ")}...`;
    } else {
       return text;
    }
 };
export const translate = (word: string): string => {
    const words = word.split(' ');
    if (words.length == 1) {
        return transformWord(word);
    }
    const quote = [];
    for (word of words) {
        quote.push(transformWord(word));
    }
    return quote.join(' ');
}

const transformWord = (word: string): string  => {
    const pattern = /^[AEIOUaeiou]|^(xr|yt)+/;
    const groups = /^(ch|squ|qu|thr|th|sch)+/;
    // If $word doesn't match a vowel or a vowel sound
    if (!word.match(pattern)) {
        // Check if it matches some group of letters
        const matches = word.match(groups);
        if (matches?.length) {
            const match = matches[0];
            word = moveMatch(word, match);
        } else {
            // If it doesn't match any of the validations, 
            // move the first letter to the end of the word.
            const char = word.substring(0, 1);
            word = moveMatch(word, char);
        }
    }

    return `${word}ay`;
}

const moveMatch = (word: string, match: string) : string =>
{
    const prefixLength = match.length;
    const prefix = word.substring(0, prefixLength);
    word = word.replace(prefix, '');
    word += match;   
    return word;
}
export function isPaired(input: string): boolean {
    let stack: string[] = [];
    let bracketPairs: { [key: string]: string } = {
        ')': '(',
        ']': '[',
        '}': '{'
    };
    
    for (let char of input) {
        if (Object.values(bracketPairs).includes(char)) {
            stack.push(char);
        } 
        else if (Object.keys(bracketPairs).includes(char)) {
            if (stack.length === 0 || stack.pop() !== bracketPairs[char]) {
                return false;
            }
        }
    }

    return stack.length === 0;
}
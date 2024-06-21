export const FormatFirebaseError = ( str ) => {
//Error (auth/email-already-in-use)
    const arr = str.split('/')
    const lastWord = arr[arr.length - 1];
    const newArr = lastWord.split('-');
    const word = newArr.join('');
    const newStr = [];
    for(let i = 0; i < word.length; i++){
        newStr.push(word[i])
    }
    return newArr.join(' ');
}
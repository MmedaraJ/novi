export function generateRandomNumbersString(length = 10) {
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomDigit = Math.floor(Math.random() * 10);
      result += randomDigit;
    }
    return result;
}

export function getRandomLetters(length=10) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }
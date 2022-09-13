const singleQuotePattern = /'/g;
export const escapeSingleQuotes = (str: string): string => str.replace(singleQuotePattern, '\\\'');

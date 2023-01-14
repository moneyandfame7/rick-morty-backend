/**
 * Приймає в параматрах URL и повертає id з цього URL `(последние цифры после "/")`.
 * @example
 *  https://website.com/123 >> 123
 */
export const getIdFromUrl = (url) => url.length ? parseInt(url.split('/')[url.split('/').length - 1]) : undefined;

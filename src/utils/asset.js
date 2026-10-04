// Путь к файлам из папки public с учётом base из vite.config.js
export const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

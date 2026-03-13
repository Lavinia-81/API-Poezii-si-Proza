// src/utils/normalizeAutor.js

export function normalizeAutor(autor) {
    return autor
        .replace(/\.txt$/i, "")
        .replace(/[_-]/g, " ")
        .replace(/\s+/g, " ")
        .trim()
}
export function normalizeAutor(autor) {
    return autor
        .normalize("NFD")                 // separă diacriticele
        .replace(/[\u0300-\u036f]/g, "")  // elimină diacriticele
        .replace(/\.txt$/i, "")
        .replace(/[_-]/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();
}
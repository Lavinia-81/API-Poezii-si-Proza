// src/utils/cache.js

export const cache = {
    autoriData: new Map(),        // cache pentru datele unui autor (poezii + proza)
    poezieText: new Map(),        // cache pentru textul unei poezii
    prozaText: new Map(),         // cache pentru textul unei proze
    bibliografieText: new Map(),  // cache pentru bibliografie
    pozaAutor: new Map()          // cache pentru poza autorului
};
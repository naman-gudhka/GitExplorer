import { loadFromStorage } from '../assets/scripts/utils.js';

export const favorites = loadFromStorage("favorites") || [];
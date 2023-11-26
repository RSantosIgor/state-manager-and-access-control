'use client'

export const set = (key: string, item: any) => {
    if (typeof document !== 'undefined')
    return localStorage.setItem(key, item);
}

export const get = (key: string) => {
    if (typeof document !== 'undefined')
    return localStorage.getItem(key);
}
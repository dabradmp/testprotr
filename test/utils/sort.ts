export function sortAsc(data: any) {
    return data.sort((a: string, b: string) => {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    });
}

export function sortDesc(data: any) {
    return sortAsc(data).reverse();
}

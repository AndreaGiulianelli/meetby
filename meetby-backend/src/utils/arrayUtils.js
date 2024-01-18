// A function to compare if two arrays have the same elements regardless of their order
exports.ignoreOrderCompare = (a, b) => {
    if (a.length !== b.length) return false;
    const elements = new Set([...a, ...b]);
    for (const x of elements) {
        const count1 = a.filter(e => e === x).length;
        const count2 = b.filter(e => e === x).length;
        if (count1 !== count2) return false;
    }
    return true;
}

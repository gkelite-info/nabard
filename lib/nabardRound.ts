export function nabardRound(value: number): number {
    const integer = Math.floor(value);
    const decimal = value - integer;

    if (decimal > 0.5) {
        return integer + 1;
    }

    return integer;
}

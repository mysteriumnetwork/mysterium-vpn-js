export interface BytesReadable {
    amount: string;
    units: string;
}
export declare class BytesFormatter {
    /**
     * @function
     * @param {number} bytes
     * @returns {{amount:number,units:string}} result - holds amount and units
     * @throws if argument is null
     */
    format(bytes: number): BytesReadable;
    formatOrDefault(bytes: number): BytesReadable;
}

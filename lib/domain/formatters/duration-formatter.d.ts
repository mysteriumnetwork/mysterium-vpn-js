export declare class DurationFormatter {
    /**
     * @function
     * @param {number} seconds
     * @returns {string} readable in --:--:-- format
     * @throws {Error} if argument is null
     */
    format(seconds: number): string;
    formatOrDefault(seconds: number): string;
    private formatTwoDigitNumber;
}

declare class TimeFormatter {
    private readonly minutesOffset;
    constructor(minutesOffset: number);
    formatDate(date: Date): string;
    formatTime(date: Date): string;
    formatISODateTime(date: Date): string;
    getCurrentISODateTime(): string;
    private getDateWithOffset;
    private formatTwoDigitNumber;
}
export { TimeFormatter };

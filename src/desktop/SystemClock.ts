export interface DateOverride {
    year: number;
    month: number;
    day: number;
}

export class SystemClock {
    private override: DateOverride | null = null;

    constructor() {
        const now = new Date();

        // Begin altijd op 1 januari 1970 wanneer de echte datum 5 september is.
        if (now.getMonth() === 8 && now.getDate() === 5) {
            this.override = { year: 1970, month: 1, day: 1 };
        }
    }

    getNow(): Date {
        const now = new Date();

        if (!this.override) {
            return now;
        }

        return new Date(
            this.override.year,
            this.override.month - 1,
            this.override.day,
            now.getHours(),
            now.getMinutes(),
            now.getSeconds(),
            now.getMilliseconds(),
        );
    }

    setDate(override: DateOverride): void {
        this.override = override;
    }
}

import { Metrics } from '../models/metrics';
import { QualityLevel } from '../models/quality-level';
export declare class QualityCalculator {
    /**
     * Calculates quality number for given metrics.
     *
     * @return number between 0 and 1. If metrics are empty, null is returned.
     */
    calculateValue(metrics: Metrics): number | null;
    calculateLevel(quality: number | null): QualityLevel;
}

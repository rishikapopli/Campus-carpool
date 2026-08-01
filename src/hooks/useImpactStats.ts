import { useMemo } from "react";
import { computeImpact, useCampusRide, type ImpactMetrics } from "../lib/rides";

/**
 * Live "Your impact" metrics. Subscribes to the ride store, so the values
 * recompute and re-render automatically whenever a ride is created, joined,
 * completed, or cancelled — no page refresh needed.
 */
export function useImpactStats(): ImpactMetrics {
  const { rides } = useCampusRide();
  return useMemo(() => computeImpact(rides), [rides]);
}


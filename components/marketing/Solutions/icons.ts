import {
  CylinderIcon,
  DropletsIcon,
  FunnelIcon,
  HeadsetIcon,
  RouteIcon,
  SnowflakeIcon,
  ThermometerSnowflakeIcon,
  type LucideIcon,
} from "lucide-react";

import type { SolutionIconKey } from "@/types/solution";

/** Resolve serializable solution icon keys to Lucide components. */
export const SOLUTION_ICONS: Record<SolutionIconKey, LucideIcon> = {
  compressor: CylinderIcon,
  treatment: DropletsIcon,
  piping: RouteIcon,
  service: HeadsetIcon,
  dryer: SnowflakeIcon,
  desiccant: ThermometerSnowflakeIcon,
  filter: FunnelIcon,
  separator: DropletsIcon,
};

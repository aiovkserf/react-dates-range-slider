import { forwardRef } from "react";
import DateRangeSlider from "./DateRangeSlider.tsx";
import { DateRangeSliderProps, Mode } from "./typings.ts";

export { Mode as DateRangeSliderMode };
export type { DateRangeSliderProps };

export default forwardRef<HTMLDivElement, DateRangeSliderProps>(
    DateRangeSlider,
);

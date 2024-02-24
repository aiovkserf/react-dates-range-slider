import { MomentInput } from "moment/moment";

enum Mode {
    YEARS,
    YEARS_AND_MONTHS,
}

type DateRangeSliderProps = {
    min: MomentInput;
    max: MomentInput;
};

export { Mode };
export type { DateRangeSliderProps };

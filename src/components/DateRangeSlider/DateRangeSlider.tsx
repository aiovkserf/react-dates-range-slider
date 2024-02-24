import moment, { MomentInput } from "moment";
import Slider from "rc-slider";
import * as React from "react";
import { useState } from "react";
import { MarkObj } from "rc-slider/es/Marks";

type DateRangeSliderProps = {
    min: MomentInput;
    max: MomentInput;
};

function DateRangeSlider(props: DateRangeSliderProps) {
    const minDate = moment(props.min).month(0),
        maxDate = moment(props.max).month(12),
        min = 0,
        max = maxDate.year() - minDate.year();

    const [selectedRange, setSelectedRange] = useState({
        start: minDate,
        end: maxDate,
    });

    const onChange = (newRange: number | number[]) => {
        if (typeof newRange == "number") {
            return;
        }

        setSelectedRange({
            start: minDate.clone().add(newRange[0], "y"),
            end: minDate.clone().add(newRange[1], "y"),
        });
    };

    const getMarks = (): Record<number, React.ReactNode | MarkObj> => {
        const marks: Record<number, React.ReactNode | MarkObj> = {};

        for (let i = 0; i < max + 1; i++) {
            marks[i] = minDate.clone().add(i, "y").year();
        }

        return marks;
    };

    return (
        <>
            <div className={"DateRangeSlider"} style={{ margin: "20px 0" }}>
                <Slider
                    min={min}
                    max={max}
                    defaultValue={[min, max]}
                    step={1}
                    range
                    marks={getMarks()}
                    allowCross={false}
                    pushable={1}
                    onChange={onChange}
                />
            </div>
        </>
    );
}

export default DateRangeSlider;

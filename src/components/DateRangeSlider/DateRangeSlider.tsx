import moment, { MomentInput } from "moment";
import Slider from "rc-slider";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { MarkObj } from "rc-slider/es/Marks";
import { Mode } from "./utils.ts";

type DateRangeSliderProps = {
    min: MomentInput;
    max: MomentInput;
};

function DateRangeSlider(props: DateRangeSliderProps) {
    const minDate = moment(props.min).month(0),
        maxDate = moment(props.max).month(1);

    const [mode, setMode] = useState(Mode.YEARS);
    const [min] = useState(0);
    const [max, setMax] = useState(0);

    const getMarks = useCallback((): Record<
        number,
        React.ReactNode | MarkObj
    > => {
        const marks: Record<number, React.ReactNode | MarkObj> = {};

        if (mode === Mode.YEARS) {
            for (let i = 0; i < max + 1; i++) {
                marks[i] = minDate.clone().add(i, "y").year();
            }
        } else {
            const currentDate = minDate.clone();
            const endDate = maxDate.clone();
            let i = 0;

            while (currentDate.isBefore(endDate)) {
                if (currentDate.month() === 0) {
                    marks[i] = currentDate.year();
                    currentDate.add(1, "month");
                    i++;
                    continue;
                }

                marks[i] = currentDate.format("MMMM");
                i++;
                currentDate.add(1, "month");
            }
        }

        return marks;
    }, [max, maxDate, minDate, mode]);

    const [marks, setMarks] = useState(getMarks());

    const recalcMax = () => {
        const yearsLength = maxDate.year() - minDate.year();

        if (mode == Mode.YEARS) {
            setMax(yearsLength);
            return;
        }

        setMax(yearsLength * 12);
    };

    const [selectedRange, setSelectedRange] = useState({
        start: minDate,
        end: maxDate,
    });

    const handleChangeRange = (newRange: number | number[]) => {
        if (typeof newRange == "number") {
            return;
        }

        const unit = mode === Mode.YEARS ? "y" : "months";
        setSelectedRange({
            start: minDate.clone().add(newRange[0], unit),
            end: minDate.clone().add(newRange[1], unit),
        });
    };

    const handleChangeMode = (mode: Mode) => {
        setMode(mode);
    };

    useEffect(() => {
        recalcMax();
        setMarks(getMarks());
    }, [mode, recalcMax, setMarks, getMarks]);

    return (
        <>
            <div className={"DateRangeSlider"} style={{ margin: "20px 0" }}>
                <div className={"DateRangeSliderMode"}>
                    <span
                        className={"DateRangeSliderModeOption"}
                        onClick={() => handleChangeMode(Mode.YEARS)}>
                        Все года
                    </span>
                    <span
                        className={"DateRangeSliderModeOption"}
                        onClick={() => handleChangeMode(Mode.YEARS_AND_MONTHS)}>
                        Месяца
                    </span>
                </div>
                <Slider
                    min={min}
                    max={max}
                    defaultValue={[min, max]}
                    step={1}
                    range
                    marks={marks}
                    allowCross={false}
                    pushable={1}
                    onChange={handleChangeRange}
                />
            </div>
        </>
    );
}

export default DateRangeSlider;

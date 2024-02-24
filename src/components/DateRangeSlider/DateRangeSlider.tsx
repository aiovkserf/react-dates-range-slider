import moment from "moment";
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";
import { ReactNode, Ref, useEffect, useState } from "react";
import { MarkObj } from "rc-slider/es/Marks";
import { DateRangeSliderProps, Mode } from "./typings.ts";
import styles from "./DateRangeSlider.module.scss";
import { HandlesProps } from "rc-slider/lib/Handles";
import Handle from "rc-slider/es/Handles/Handle";

function DateRangeSlider(
    props: DateRangeSliderProps,
    ref: Ref<HTMLDivElement>,
) {
    const minDate = moment(props.min).month(0),
        maxDate = moment(props.max).month(0),
        yearsLength = maxDate.year() - minDate.year();

    const [mode, setMode] = useState(Mode.YEARS);
    const [min] = useState(0);
    const [max, setMax] = useState(yearsLength);
    const [marks, setMarks] = useState({});

    const updateMarks = () => {
        const marks: Record<number, ReactNode | MarkObj> = {};

        const currentDate = minDate.clone();
        const endDate = maxDate.clone().add(1, "month");
        let i = 0;

        while (currentDate.isBefore(endDate)) {
            if (mode === Mode.YEARS) {
                marks[i] = {
                    label: (
                        <span className={styles.Year}>
                            {minDate.clone().add(i, "y").year()}
                        </span>
                    ),
                };
                currentDate.add(1, "y");
                i++;
                continue;
            }

            if (yearsLength < 5) {
                if (currentDate.month() === 0) {
                    marks[i] = {
                        label: (
                            <span className={styles.Year}>
                                {currentDate.year()}
                            </span>
                        ),
                    };
                    currentDate.add(1, "month");
                    i++;
                    continue;
                }

                marks[i] = {
                    label: (
                        <span className={styles.Month}>
                            {currentDate.format("MMM").replace(".", "")}
                        </span>
                    ),
                };
                i++;
                currentDate.add(1, "month");
            }
        }

        setMarks(marks);
    };

    const recalculateMax = () => {
        if (mode == Mode.YEARS) {
            setMax(yearsLength);
            return;
        }

        setMax(yearsLength * 12);
    };

    useEffect(() => {
        recalculateMax();
        updateMarks();
    }, [mode]);

    const [, setSelectedRange] = useState({
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

    const customTooltip: HandlesProps["handleRender"] = (
        _origin,
        { value, dragging, index, ...restProps },
    ) => (
        <Tooltip
            overlay={`${minDate
                .clone()
                .add(value, mode === Mode.YEARS ? "y" : "month")
                .format("MMMM YYYY")}`}
            visible={dragging || true}
            overlayInnerStyle={{
                color: "#1A76BD",
                backgroundColor: "white",
                boxShadow: "0 5px 10px 0 rgba(91,176,240,0.53)",
            }}
            placement={"top"}
            key={value + index}
            showArrow={{ className: styles.TooltipArrow }}
            destroyTooltipOnHide>
            <Handle
                valueIndex={0}
                dragging={false}
                onStartMove={() => {}}
                onOffsetChange={() => {}}
                value={value}
                {...restProps}
            />
        </Tooltip>
    );

    return (
        <>
            <div className={styles.DateRangeSlider} ref={ref}>
                <div className={styles.DateRangeSliderMode}>
                    <span
                        className={
                            styles.DateRangeSliderModeOption +
                            " " +
                            (mode === Mode.YEARS ? styles.Active : "")
                        }
                        onClick={() => handleChangeMode(Mode.YEARS)}>
                        Все года
                    </span>
                    <span
                        className={
                            styles.DateRangeSliderModeOption +
                            " " +
                            (mode === Mode.YEARS_AND_MONTHS
                                ? styles.Active
                                : "")
                        }
                        onClick={() => handleChangeMode(Mode.YEARS_AND_MONTHS)}>
                        Месяца
                    </span>
                </div>
                <Slider
                    className={styles.Slider}
                    min={min}
                    max={max}
                    step={1}
                    marks={marks}
                    handleRender={customTooltip}
                    onChange={handleChangeRange}
                    dotStyle={{
                        display: "none",
                    }}
                    classNames={{
                        track: styles.Track,
                        handle: styles.Handle,
                    }}
                    range
                    allowCross={false}
                    draggableTrack={false}
                    pushable={1}
                />
            </div>
        </>
    );
}

export default DateRangeSlider;

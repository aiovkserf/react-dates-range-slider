import DateRangeSlider from "./components/DateRangeSlider/DateRangeSlider.tsx";
import moment from "moment";

function App() {
    return (
        <div style={{ padding: "20px" }}>
            <DateRangeSlider min={moment()} max={moment().add(23, "y")} />
        </div>
    );
}

export default App;

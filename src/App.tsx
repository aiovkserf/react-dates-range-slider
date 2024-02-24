import moment from "moment";
import DateRangeSlider from "./components/DateRangeSlider";

function App() {
    return (
        <div style={{ padding: "20px" }}>
            <DateRangeSlider min={moment()} max={moment().add(3, "y")} />
        </div>
    );
}

export default App;

import { StyledCardDate } from "../Styles";
import { getMonth } from "../utils";

export const CardDate = ({ date, flag }) => {
    let dateArray = date.split("-");
    return (
        <StyledCardDate
            style={{ borderTop: `5px solid ${flag ? "green" : "red"}` }}
        >
            <div style={{ fontSize: "30px", fontWeight: "bold" }}>
                {dateArray[2]}
            </div>
            <div
                style={{ fontSize: "12px", color: "gray", fontWeight: "bold" }}
            >
                {getMonth(dateArray[1]) + " " + dateArray[0]}
            </div>
        </StyledCardDate>
    );
};

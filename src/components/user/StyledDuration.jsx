import React from 'react'
import { CardDate } from './CardDate';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export const StyledDuration = ({startDate,endDate}) => {
  return (
      <div
          style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
          }}
      >
          <CardDate date={startDate} flag={true} />
          <div>
              <ArrowForwardIcon />
          </div>
          <CardDate date={endDate} />
      </div>
  );
}

import React from 'react'
import { CardDate } from './CardDate';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export const StyledDuration = ({start_date,end_date}) => {
  return (
      <div
          style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
          }}
      >
          <CardDate date={start_date} flag={true} />
          <div>
              <ArrowForwardIcon />
          </div>
          <CardDate date={end_date} />
      </div>
  );
}

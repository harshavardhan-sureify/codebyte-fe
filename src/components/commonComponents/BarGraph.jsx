import React from 'react'

const BarGraph = (barData) => {
  return (
      <ResponsiveBar
          data={barData}
          keys={["count"]}
          margin={{ top: 50, right: 10, bottom: 50, left: 60 }}
          padding={0.4}
          innerPadding={1}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          valueFormat=" <-"
          colors={{ scheme: "category10" }}
          indexBy="option"
          theme={{
              axis: {
                  domain: {
                      line: {
                          stroke: "lightgrey",
                      },
                  },
                  legend: {
                      text: {
                          fill: "black",
                      },
                  },
                  ticks: {
                      line: {
                          stroke: "lightgrey",
                          strokeWidth: 1,
                      },
                      text: {
                          fill: "black",
                      },
                  },
              },
              legends: {
                  text: {
                      fill: "black",
                  },
              },
              tooltip: {
                  container: {
                      background: "blue",
                      color: "black",
                  },
              },
          }}
          defs={[
              {
                  id: "fiil",
                  size: 4,
                  padding: 1,
                  color: "#38bcb2",
              },
          ]}
          fill={[
              {
                  match: {
                      id: "count",
                  },
                  id: "fiil",
              },
          ]}
          axisTop={null}
          axisRight={null}
          axisBottom={{
              tickSize: 5,
              tickPadding: 7,
              tickRotation: 8,
              legend: "Polls",
              legendPosition: "middle",
              legendOffset: 40,
              justify: true,
          }}
          axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "No of users",
              legendPosition: "middle",
              legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
              from: "color",
              modifiers: [["darker", 1.6]],
          }}
          legends={[
              {
                  dataFrom: "keys",
                  anchor: "bottom-right",
                  direction: "column",
                  justify: true,
                  translateX: 120,
                  translateY: 0,
                  itemsSpacing: 6,
                  itemWidth: 50,
                  itemHeight: 20,
                  itemDirection: "bottom-to-top",
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  effects: [
                      {
                          on: "hover",
                          style: {
                              itemOpacity: 1,
                          },
                      },
                  ],
              },
          ]}
          useMesh={true}
          animate={true}
          reverseAnimation={true}
          motionStiffness={120}
          motionDamping={10}
          role="application"
          ariaLabel="Nivo bar chart demo"
          barAriaLabel={function (e) {
              return (
                  e.id +
                  ": " +
                  e.formattedValue +
                  " in country: " +
                  e.indexValue
              );
          }}
      />
  );
}

export default BarGraph;
import { ResponsivePie } from "@nivo/pie";
export const PieGraph = ({ data }) => (
    <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        sortByValue={true}
        innerRadius={0.5}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "nivo" }}
        borderColor={{
            from: "color",
            modifiers: [["darker", "0"]],
        }}
        enableArcLinkLabels={false}
        transitionMode="pushIn"
        legends={[
            {
                anchor: "right",
                direction: "column",
                justify: false,
                translateX: 80,
                translateY: 150,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: "#999",
                itemDirection: "left-to-right",
                itemOpacity: 1,
                symbolSize: 15,
                symbolShape: "circle",
                effects: [
                    {
                        on: "hover",
                        style: {
                            itemTextColor: "#000",
                        },
                    },
                ],
            },
        ]}
    />
);

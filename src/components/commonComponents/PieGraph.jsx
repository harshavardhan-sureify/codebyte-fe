import { Box } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
export const PieGraph = ({ data }) => {
    const CustomToolTip = ({ id, value, color }) => {
        return (
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                    padding: "5px",
                    background: "white",
                    borderRadius: "10px",
                    border: "1px solid",
                }}
            >
                <Box
                    sx={{
                        width: "12px",
                        height: "12px",
                        background: color,
                    }}
                ></Box>
                <Box>
                    {id}: {value}%
                </Box>
            </Box>
        );
    };
    return (
        <ResponsivePie
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            sortByValue={true}
            innerRadius={0.5}
            activeOuterRadiusOffset={8}
            colors={{ datum: "data.color" }}
            tooltip={({ datum: { id, value, color } }) => (
                <CustomToolTip id={id} color={color} value={value} />
            )}
            borderColor={{
                from: "color",
                modifiers: [["darker", "0"]],
            }}
            enableArcLinkLabels={false}
            arcLabel={(d) => `${d.value}%`}
            transitionMode="pushIn"
        />
    );
};

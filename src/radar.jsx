import React from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";

function TDRadar({ value }) {
    return (
        <div id="radar">
            <h2>Turorials Performance</h2>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} data={value}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="module" />
                    <PolarRadiusAxis angle={30} domain={[0, 20]} />
                    <Tooltip />
                    <Radar name="Tutorials" dataKey="tutorials" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default TDRadar;

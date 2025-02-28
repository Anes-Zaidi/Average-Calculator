import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

function GradePie({ value }) {
    const gradeRanges = [
        { name: "0-5", count: value.filter((item) => item.note >= 0 && item.note < 5).length, color: "#ff4d4d" },
        { name: "5-10", count: value.filter((item) => item.note >= 5 && item.note < 10).length, color: "#ffa500" },
        { name: "10-15", count: value.filter((item) => item.note >= 10 && item.note < 15).length, color: "#ffff66" },
        { name: "15-20", count: value.filter((item) => item.note >= 15 && item.note <= 20).length, color: "#66cc66" },
    ];

    return (
        <div id="pie">
            <h2>Grade Distribution</h2>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie data={gradeRanges} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
                        {gradeRanges.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default GradePie;

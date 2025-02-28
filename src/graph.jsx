import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

function ExamGraph({ value }) {
    return (
        <div id="graph">
            <h2>Exam Distribution</h2>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={value}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="module" />
                    <YAxis domain={[0, 20]} />
                    <Tooltip />
                    <Bar dataKey="exam" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ExamGraph;

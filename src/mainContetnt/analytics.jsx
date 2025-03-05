import React, { useEffect, useState } from "react";
import ExamGraph from "./graph";
import GradePie from "./pie";
import TDRadar from "./radar";

function Analytics({ value }) {
  const [best, setBest] = useState(-Infinity);
  const [bestN, setBestN] = useState("N/A");
  const [worst, setWorst] = useState(Infinity);
  const [worstN, setWorstN] = useState("N/A");

  useEffect(() => {

    let tempBest = -Infinity;
    let tempBestN = "N/A";
    let tempWorst = Infinity;
    let tempWorstN = "N/A";

    value.forEach(({ module, note }) => {
      const numericNote = parseFloat(note);
      if (!isNaN(numericNote)) {
        if (numericNote > tempBest) {
          tempBest = numericNote;
          tempBestN = module;
        }
        if (numericNote < tempWorst) {
          tempWorst = numericNote;
          tempWorstN = module;
        }
      }
    });

    setBest(tempBest);
    setBestN(tempBestN);
    setWorst(tempWorst);
    setWorstN(tempWorstN);
  }, [value]);

  return (
    <div className="analyticsContainer">
      <h1 id="Atitle">Average Analysis :</h1>
      <div className="BestWorst">
        <div className="best Mcontainer">
          <p id="pp">Best module:</p>
          <h2>{best !== -Infinity ? bestN : "N/A"}</h2>
          <p id="pp">Grade :</p>
          <h2>{best !== -Infinity ? best : "N/A"}</h2>
        </div>
        <div className="worst Mcontainer">
          <p id="pp">Worst module:</p>
          <h2>{worst !== Infinity ? worstN : "N/A"}</h2>
          <p id="pp">Grade :</p>
          <h2>{worst !== Infinity ? worst : "N/A"}</h2>
        </div>
      </div>
      <div className="examGraph">
        <ExamGraph value={value} />
      </div>
      <div className="lower">
          <GradePie value={value}/>
          <TDRadar value={value} />   
      </div>

    </div>
  );
}

export default Analytics;

import React, {useRef , useEffect, useState } from "react";
import "./App.css";
import Side from "./side";

function MainContent({semester , setUni}) {

   
  const [coefficeintSum, setCoefSum] = useState(semester.reduce((acc, item) => acc + item[1], 0));
  const [average , setAverage] = useState(0)


  const [value, setValue] = useState(
    semester.map((module)=>({
      module: module[0],
      tutorials: 0,
      practicalWork: 0,
      exam: 0,
      coefficient: module[1], 
      note: 0,
      finalNote: 0,
    }))
  )
  const sideRef = useRef(null)


  const handleValueChange = (index, field, newValue) => { 
    setValue((prevsValues) =>{
      const updatedValues = prevsValues.map((item, i) => {
        if (i === index) {
          const tutorials = field === "tutorials" ? parseFloat(newValue) || 0 : parseFloat(item.tutorials);
          // const practicalWork = parseFloat(item.practicalWork) || 0;
          const exam = field === "exam" ? parseFloat(newValue) || 0 : parseFloat(item.exam);
          const note = (tutorials  * 0.4 + exam * 0.6);
          const coefficient = field === "coefficient" ? parseFloat(newValue) || 0 : parseFloat(item.coefficient);
          const finalNote = note * coefficient;

          return {
            ...item,
            [field]: newValue,
            note: note.toFixed(2),
            finalNote: finalNote.toFixed(2),
            coefficient : coefficient,
          };
        }
        return item;
      })

      const Fsum = updatedValues.reduce((sum, item) => sum + parseFloat(item.finalNote) , 0);
      const Csum = updatedValues.reduce((sum, item) => sum + parseFloat(item.coefficient), 0)
      
      setCoefSum(Csum)
      setAverage(Fsum / Csum)
      return updatedValues
    });
  }


  return (
    <div className="mainContent">
      <div className="noteWraper">
        <div className="noteContainer">
          <div className="NT">
            <p>Module</p>
            <p>Tutorials</p>
            {/* <p>Practical Work</p> */}
            <p>Exam</p>
            <p>Coefficient</p>
            <p>Note</p>
            <p>Final note</p>
          </div>
          <div className="modules">
            {value.map((module, index) => (
              <div key={index} className="ab">
                <h3>{module.module}</h3>
                <input type="number" value={module.tutorials}  onChange={(e)=>{handleValueChange(index, "tutorials" ,e.target.value)}} className="input" step={0.25} max={20} min={0}/>
                {/* <input type="number" value={module.practicalWork} onChange={(e)=>{handleValueChange(index, "practicalWork" , e.target.value)}} className="input"/> */}
                <input type="number" value={module.exam} onChange={(e)=>{handleValueChange(index, "exam" , e.target.value)}} className="input" step={0.25} max={20} min={0}/>
                <input type="number" value={module.coefficient} onChange={(e)=>{handleValueChange(index, "coefficient" , e.target.value)}} className="input" step={1} max={20} min={0}/>
                <h3>{module.note}</h3>
                <h3>{module.finalNote}</h3>
              </div>
            ))}
          </div>
          <div className="mainBottom">
              <div className="average avg">{average.toFixed(2)}</div>
              <div className="Bmodule avg"></div>
           </div>
        </div>
      </div>
      <Side setUni = {setUni}/>
    </div>
  );

}
export default MainContent;


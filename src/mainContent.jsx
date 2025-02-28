import React, {useRef , useEffect, useState } from "react";
import "./App.css";
import Side from "./side";

function MainContent({semester , uni , setValue , value , setAverage ,average}) {

   
  const [coefficeintSum, setCoefSum] = useState(semester.reduce((acc, item) => acc + item[1], 0));
  const [notChecked , setNChecked ] = useState(value.map(()=>true))
  const [width , setWidth] = useState(0)
  const [bg , setBG] = useState("")
  const checkboxRef = useRef(null)

  useEffect(() => {
    setValue(semester.map((module) => ({
      module: module[0],
      tutorials: 0,
      practicalWork: 0,
      exam: 0,
      coefficient: module[1],
      note: 0,
      finalNote: 0,
    })));
    setNChecked(semester.map(()=>true))
  }, [semester]);

  useEffect(()=>{
    setWidth(average * 100 / 20)
    setBG(()=>{
      if(average < 10){
        return "red"
      }
      else if(average < 16){
        return "green"
      }else{
        return "cyan"
      }
    })
  },[average])
  


  const handleValueChange = (index, field, newValue) => { 
    setValue((prevsValues) =>{
      const updatedValues = prevsValues.map((item, i) => {
        if (i === index) {
          const tutorials = field === "tutorials" ? parseFloat(newValue) || 0 : parseFloat(item.tutorials);
          const practicalWork = parseFloat(item.practicalWork) || 0;
          const exam = field === "exam" ? parseFloat(newValue) || 0 : parseFloat(item.exam);
          const coefficient = field === "coefficient" ? parseFloat(newValue) || 0 : parseFloat(item.coefficient);
          let note = 0
          let finalNote = 0
    
          if(uni.name == "ESTIN"){
            if(practicalWork == 0){
              note = (tutorials  * 0.4 + exam * 0.6);
              finalNote = note * coefficient;
            }else{
              note = ((tutorials + practicalWork) / 2  * 0.4 + exam * 0.6);
              finalNote = note * coefficient;
            }
          }else if(uni.name == "POLYTEC"){
            if(practicalWork == 0){
              note = (tutorials  * 0.5 + exam * 0.5);
              finalNote = note * coefficient;
            }
            else{
              note = (tutorials  * 0.3 + practicalWork * 0.3 + exam * 0.4);
              finalNote = note * coefficient;
            }
          }

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

  const handleCheckbox = (index) => {
    setNChecked((prevChecked) => {
      const updatedChecked = [...prevChecked]
      updatedChecked[index] = !updatedChecked[index]
      return updatedChecked;
    });
  };


  return (
    <div className="mainContent">
      <div className="noteWraper">
        <div className="noteContainer">
          <div className="NT">
            <p>Module</p>
            <p>Tutorials</p>
            <p>Practical Work</p> 
            <p>Exam</p>
            <p>Coefficient</p>
            <p>Note</p>
            <p>Final note</p>
            <p></p>
          </div>
          <div className="modules">
            {value.map((module, index) => (
              <div key={index} className="ab">
                <h3>{module.module}</h3>
                <input type="number" value={module.tutorials}  onChange={(e)=>{handleValueChange(index, "tutorials" ,e.target.value)}} className="input" step={0.25} max={20} min={0}/>
                <input type="number" value={module.practicalWork} ref={checkboxRef} onChange={(e)=>{handleValueChange(index, "practicalWork" , e.target.value)}} className="input" step={0.25} max={20} min={0} disabled = {notChecked[index]}/>
                <input type="checkbox" id={`checkPw-${index}`} checked = {!notChecked[index]} onChange = {()=>handleCheckbox(index)} />
                <input type="number" value={module.exam} onChange={(e)=>{handleValueChange(index, "exam" , e.target.value)}} className="input" step={0.25} max={20} min={0}/>
                <input type="number" value={module.coefficient} onChange={(e)=>{handleValueChange(index, "coefficient" , e.target.value)}} className="input" step={1} max={20} min={0}/>
                <h3>{module.note}</h3>
                <h3>{module.finalNote}</h3>
              </div>
            ))}
          </div>
          <div className="mainBottom">
              <div className="average avg">
                <h2>Your Average:</h2>
                <h1 id="average">{average.toFixed(2)}</h1>
                <div className="avgBarContainer">
                  <div className="avgBar" style={{backgroundColor : `${bg}`, width : `${width}%`}}></div>
                </div>
              </div>
           </div>
        </div>
      </div>  
    </div>
    
  );

}
export default MainContent;


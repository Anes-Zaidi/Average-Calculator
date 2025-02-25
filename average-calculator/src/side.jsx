import React from "react";
import { useState , useRef , useEffect} from 'react'

function Side({setUni}){
    const sideRef = useRef(null)
    const [visibilty, setVisbilty] = useState(false) 
  
    const handleVisibility = () =>{
      setVisbilty(previsibilty => !previsibilty)
    }
  
    useEffect(()=>{
      function handleClickOffSide(event){
        if(sideRef.current && !sideRef.current.contains(event.target)){
          setVisbilty(false)
        }
      }
  
      document.addEventListener("mousedown",handleClickOffSide)
  
      return ()=>{
        document.removeEventListener("mousedown",handleClickOffSide)
      }
    },[])
    return(
        <div className="side">
        <div ref={sideRef} id="sideSection" className={visibilty ? "visibleSide" : "hidden"}>
          <div className="options">
            <div className="uniChose">
              <label htmlFor="uni">Universty :</label>
              <select id="uni" onChange={(e)=> setUni(e.target.value)}>
                <option value="estin">ESTIN</option>
                <option value="polytec">POLYTEC</option>
              </select>
            </div>
          </div>
          <div className="sideBtns">
            <button className="sideBtn" id="optionBtn" onClick={()=>{handleVisibility(visibilty)}}>
              Options
            </button>
          </div>
        </div>
      </div>
    )
}
export default Side;
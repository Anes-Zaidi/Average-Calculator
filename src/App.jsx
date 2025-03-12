import { useState , useRef , useEffect} from 'react'

import './App.css'
import Top from './topComponents/top.jsx'
import MainContent from './mainContetnt/mainContent.jsx'
import BottomContent from './bottomContent/bottom.jsx'
import Analytics from './/mainContetnt/analytics.jsx'
import Archive from './archive.jsx'

function App() {

  // TODO add enscs

  const universities = {
     estin  : {
      name : "ESTIN",
      s1 : [["Analysis" , 5] ,["ASDS" , 5] ,["Archi" , 4] ,["OS" , 3] ,["Eletricity" , 3] ,["Algebra" , 3] ,["TEE" , 2] ,["BTW" , 1] ] ,
      s2 : [["Analysis 2" , 5] ,["ASDD" , 5] ,["Mecanics" , 3] ,["OS2" , 3] ,["Eletronic" , 3] ,["Algebra 2" , 3] ,["TEO" , 2] ,["English" , 2] ] ,
      s3 : [["Analysis 3" , 5] ,["SFSD" , 4] ,["Archi 2" , 4] ,["PropaStat" , 4] ,["Eletronic 2" , 4] ,["Algebra 3" , 3] ,["English 2" , 2] ,["Economy" , 2] ] ,
      s4 : [["Analysis 4" , 5] ,["OPP" , 4] ,["PropaStat 2" , 4] ,["electromagnetic waves" , 4] ,["Mathematical Logic" , 4],["information system" , 3] ,["English 3" , 2] ] ,
    },
  
     polytec : {
      name : "POLYTEC",
        s1 : [["Analysis" , 6] ,["Physics 1" , 5] ,["Chemistry" , 5] ,["Algebra" , 3]  ,["PropaStat" , 3] , ["Computer Science 1" , 3] ,["Human Engineering" , 1] ,["Economy" , 1] , ["English" , 1] , ["French" , 1] ] ,
        s2 : [["Analysis 2" , 5] ,["Physics 2" , 5] ,["Chemistry 2" , 5] ,["Algebra 2" , 4]  ,["Propa" , 3] , ["Computer Science 2" , 3], ["Computer-Aided Design" , 1] ,["Human Engineering 2" , 1] ,["Economy" , 1] , ["English 2" , 1] , ["French 2" , 1] ] ,
        s3 : [["Analysis 3" , 4] ,["Physics 3" , 4] ,["Chemistry 3" , 3],["Engineering 1" , 3] ,["Numerical Analysis" , 2], ["Computer Science 3" , 3],["English 3" , 1] , ["TE" , 1]] ,
        s4 : [["Analysis 4" , 3] ,["Physics 4" , 4] ,["Chemistry 4" , 3],["Engineering 2" , 3] ,["Numerical Analysis 2" , 3] , ["Computer Science 4" , 3],["Rational Mecanics 2" , 3],["Eletronic" , 3] ,["Matters Resistance" , 3] , ["Computer Science 4" , 3],["English 4" , 1] , ["TE 2" , 1]] ,
    },

}


  const [uni , setUni] = useState(universities.estin)
  const [semesterKey , setKey] = useState("s1")
  const [semester , setSemester] = useState(uni.s1)
  const [average , setAverage] = useState(0)
  const [isClosed , setClose] = useState(true)
  const [MemoryArchive , setMemoArchive] = useState(()=>(
    localStorage.getItem("currArchv") ? JSON.parse(localStorage.getItem("currArchv")) : []
  ))
  const [archive , setArchive] = useState(MemoryArchive)
  const [LastValues , setLastVal] = useState(()=>(
    localStorage.getItem("currVal") ? JSON.parse(localStorage.getItem("currVal")) : semester.map((module) => ({
      semester : semesterKey ,
      universty : uni.name,
      module: module[0],
      tutorials: 0,
      practicalWork: 0,     
      exam: 0,
      coefficient: module[1], 
      note: 0,
      finalNote: 0,
  }))
  ))
  const [coefficeintSum, setCoefSum] = useState(semester.reduce((acc, item) => acc + item[1], 0));

  const [value, setValue] = useState(LastValues);
  const archvRef = useRef(null)
  console.log(value)

  useEffect(()=>{setSemester(uni[semesterKey])},[semester , uni]) 

  const handleUniSet = (value)=>{
    setUni(universities[value])
  }

  const handleValueChange = (index, field, newValue) => { 
    setValue((prevsValues) =>{
      const updatedValues = prevsValues.map((item, i) => {
        if (i === index) {
          let university = item.universty
          const tutorials = field === "tutorials" ? parseFloat(newValue) || 0 : parseFloat(item.tutorials);
          const practicalWork = parseFloat(item.practicalWork) || 0;
          const exam = field === "exam" ? parseFloat(newValue) || 0 : parseFloat(item.exam);
          const coefficient = field === "coefficient" ? parseFloat(newValue) || 0 : parseFloat(item.coefficient);
          let note = 0
          let finalNote = 0

          // TODO state problem in PW
          if(uni.name == "ESTIN"){
            university = "ESTIN"
            if(practicalWork == 0){
              note = (tutorials  * 0.4 + exam * 0.6);
              finalNote = note * coefficient;
            }else if(practicalWork != 0 && tutorials == 0){
              note = (practicalWork  * 0.4 + exam * 0.6); 
              finalNote = note * coefficient;
            }
            else{
              note = ((tutorials + practicalWork) / 2  * 0.4 + exam * 0.6);
              finalNote = note * coefficient;
            }
          }else if(uni.name == "POLYTEC"){
            university = "POLYTEC"
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

  useEffect(()=>{
    localStorage.setItem("currArchv" , JSON.stringify(archive))
  },[archive])

  useEffect(()=>{
    if(localStorage.getItem("currArchv")){
      setArchive(()=>(JSON.parse(localStorage.getItem("currArchv"))))
    }
  },[]) 
  

  useEffect(()=>{
    localStorage.setItem("currVal" , JSON.stringify(value))
  },[value])

  useEffect(()=>{
    if(localStorage.getItem("currVal")){
      setValue(()=>(JSON.parse(localStorage.getItem("currVal"))))
    }
  },[])

  

  return (
    <>
      <Top universty = {uni}  semester = {semester} semesterKey = {semesterKey} setValue={setValue}  setAverage = {setAverage} setUni = {handleUniSet} uni = {uni} setSemester = {setSemester} setKey = {setKey} isClosed={isClosed} setClose = {setClose} setArchive={setArchive} archvRef={archvRef} archive = {archive} value={value} universities={universities}/>
      <Archive isClosed = {isClosed} setClose = {setClose} archive = {archive} setArchive ={setArchive} archvRef={archvRef} setValue={setValue} handleValueChange={handleValueChange} />
      <MainContent semester = {semester} uni = {uni} setValue={setValue} value={value} setAverage = {setAverage} average={average} LastValues={LastValues} handleValueChange={handleValueChange}/>
      <Analytics value = {value}/>
      <BottomContent/>
    </>
  )
}

export default App

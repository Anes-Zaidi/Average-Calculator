import { useState , useRef , useEffect} from 'react'
import './App.css'
import Top from './topComponents/top.jsx'
import MainContent from './mainContetnt/mainContent.jsx'
import BottomContent from './bottomContent/bottom.jsx'
import Analytics from './/mainContetnt/analytics.jsx'

function App() {

  const estin  = {
    name : "ESTIN",
    s1 : [["Analysis" , 5] ,["ASDS" , 5] ,["Archi" , 4] ,["OS" , 3] ,["Eletricity" , 3] ,["Algebra" , 3] ,["TEE" , 2] ,["BTW" , 1] ] ,
    s2 : [["Analysis 2" , 5] ,["ASDD" , 5] ,["Mecanics" , 3] ,["OS2" , 3] ,["Eletronic" , 3] ,["Algebra 2" , 3] ,["TEO" , 2] ,["English" , 2] ] ,
    s3 : [["Analysis 3" , 5] ,["SFSD" , 4] ,["Archi 2" , 4] ,["PropaStat" , 4] ,["Eletronic 2" , 4] ,["Algebra 3" , 3] ,["English 2" , 2] ,["Economy" , 2] ] ,
    s4 : [["Analysis 4" , 5] ,["OPP" , 4] ,["PropaStat 2" , 4] ,["electromagnetic waves" , 4] ,["Mathematical Logic" , 4],["information system" , 3] ,["English 3" , 2] ] ,
  }

  const polytec  = {
    name : "POLYTEC",
      s1 : [["Analysis" , 6] ,["Physics 1" , 5] ,["Chemistry" , 5] ,["Algebra" , 3]  ,["PropaStat" , 3] , ["Computer Science 1" , 3] ,["Human Engineering" , 1] ,["Economy" , 1] , ["English" , 1] , ["French" , 1] ] ,
      s2 : [["Analysis 2" , 5] ,["Physics 2" , 5] ,["Chemistry 2" , 5] ,["Algebra 2" , 4]  ,["Propa" , 3] , ["Computer Science 2" , 3], ["Computer-Aided Design" , 1] ,["Human Engineering 2" , 1] ,["Economy" , 1] , ["English 2" , 1] , ["French 2" , 1] ] ,
      s3 : [["Analysis 3" , 4] ,["Physics 3" , 4] ,["Chemistry 3" , 3],["Engineering 1" , 3] ,["Numerical Analysis" , 2], ["Computer Science 3" , 3],["English 3" , 1] , ["TE" , 1]] ,
      s4 : [["Analysis 4" , 3] ,["Physics 4" , 4] ,["Chemistry 4" , 3],["Engineering 2" , 3] ,["Numerical Analysis 2" , 3] , ["Computer Science 4" , 3],["Rational Mecanics 2" , 3],["Eletronic" , 3] ,["Matters Resistance" , 3] , ["Computer Science 4" , 3],["English 4" , 1] , ["TE 2" , 1]] ,
  }

  const [uni , setUni] = useState(estin)
  const [semesterKey , setKey] = useState("s1")
  const [semester , setSemester] = useState(uni.s1)
  const [average , setAverage] = useState(0)
  const [value, setValue] = useState(
      semester ? semester.map((module) => ({
        module: module[0],
        tutorials: 0,
        practicalWork: 0,
        exam: 0,
        coefficient: module[1], 
        note: 0,
        finalNote: 0,
      })) : []
   );


  useEffect(()=>{setSemester(uni[semesterKey])},[semester , uni]) 

  const handleUniSet = (value)=>{
    setUni(value == "polytec" ? polytec : estin)
  }
  return (
    <>
      <Top universty = {uni}  semester = {semester} semesterKey = {semesterKey} setValue={setValue}  setAverage = {setAverage} setUni = {handleUniSet} uni = {uni} setSemester = {setSemester} setKey = {setKey} />
      <MainContent semester = {semester} setUni = {handleUniSet} uni = {uni} setValue={setValue} value={value} setAverage = {setAverage} average={average}/>
      <Analytics value = {value}/>
      <BottomContent/>
    </>
  )
}

export default App

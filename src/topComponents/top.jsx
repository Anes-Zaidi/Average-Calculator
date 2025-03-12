import React, { useEffect } from "react";
import { useRef } from "react";
import Archive from "../archive";
import { FolderArchive, Save, RotateCcw } from 'lucide-react'
import "./top.css"

function Top({ setUni, uni, setSemester, semester, universities, semesterKey, setValue, setAverage, setKey, isClosed, setClose, archvRef, archive, value, setArchive, MemoryArchive, setMemoArchive }) {

  function handleReset() {
    let userConfimed = window.confirm("Do you want to reset ?")
    if (userConfimed) {
      setValue(() =>
        semester.map((module) => ({
          module: module[0],
          tutorials: 0,
          practicalWork: 0,
          exam: 0,
          coefficient: module[1],
          note: 0,
          finalNote: 0,
        }))
      )
      setAverage(0)
    }
  }

  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  const hours = String(now.getHours() + 1).padStart(2, "0")
  const munites = String(now.getMinutes()).padStart(2, "0")

  const formattedTime = `${year}-${month}-${day} , ${hours}:${munites}`
  const handleModalVisibility = () => {
    setClose(prev => !prev)
  }
  const handleSave = () => {
    setClose(false)
    let tempArr = [{ uni: uni.name }, { date: formattedTime }, { semester: semesterKey }, ...value]
    setArchive((prevArchive) => {
      const updatedArchive = [...prevArchive, tempArr]
      return updatedArchive
    })
  }

  useEffect(() => {
    console.log(universities)
  })

  let s1 = "s1"
  let s2 = "s2"
  return (
    <header className="topContent">

      <div className="topLeft">
        <h1 id="logo">Average  Calculator</h1>
        {/* TODO this should be dynamic */}
        <div className="uniWR">
          <label htmlFor="uni" id="uniLabel">Universty :  </label>
          <select id="uni" onChange={(e) => { setUni(e.target.value); setAverage(0) }}>
            {
              Object.entries(universities).map(([key, value]) => (
                <option key={key} value={key}>{value.name}</option>
              ))
            }
          </select>
        </div>
        <div className="uniWR">
          <label htmlFor="uni" id="uniLabel">Semester :  </label>
          <select id="uni" value={semesterKey} onChange={(e) => { const newKey = e.target.value; setKey(newKey); setSemester(uni[newKey]); setAverage(0) }}>
            <option value={s1}>S1</option>
            <option value={s2}>S2</option>
          </select>
        </div>
      </div>

      <div className="topRight">
        <button onClick={handleReset}><RotateCcw id="icon" /> Reset</button>
        <button onClick={handleSave}><Save id="icon" /> Save</button>
        <button ref={archvRef} onClick={() => {
          if (isClosed) {
            handleModalVisibility()
          }
        }}><FolderArchive id="icon" /> Archive</button>
      </div>

    </header>
  )
}

export default Top;


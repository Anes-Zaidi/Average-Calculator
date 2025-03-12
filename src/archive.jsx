    import React , { useEffect , useRef , useState } from "react";
    import {X , Delete , Trash2 , FolderArchive} from "lucide-react"

    function Archive({isClosed , setClose , archvRef , archive , setArchive , setValue , handleValueChange }){
        const modalRef = useRef(null)
        useEffect(()=>{
            function clickOffModal (event){
                if(modalRef.current && !modalRef.current.contains(event.target) && !archvRef.current.contains(event.target)){
                    setClose(true)
                }
            }
            document.addEventListener("mousedown",clickOffModal)
            return () => {
                document.removeEventListener("mousedown" , clickOffModal)
            }
        },[setClose])

        const deleteBtnRef = useRef(null)

        const handleDeleteArchives = ()=>{
            setArchive([])
        }

        const handleDelete = (index)=>{
            document.querySelector(`#dlt-${index}`).remove()
        }

        // TODO delete button functionality

        const handleArchiveUpdates = () =>{
            if(archive.length != 0){
                return archive.map((element , index)=>(
                    <div className="archive-element-container">
                        <div className="archive-element" key={index} ref={deleteBtnRef} data-value={JSON.stringify(archive[index])} id={`dlt-${index}`} onClick={()=>{handleArchiveSet(index)}}>
                            <h3>Preset #{index + 1}</h3>
                            <h3>{element[1].date}</h3>
                            <h3>{element[0].uni}</h3>
                            <h3>{element[2].semester}</h3>
                            < Delete id="delete" onClick={()=>{handleDelete(index)}}/>
                        </div>  
                    </div>
                )) 
            }else{
                return(
                    <div className="archive-empty"><h2>Here you will find all your saved averages</h2></div>
                )
            }
        }

        useEffect(()=>{
            handleArchiveUpdates()
        },[archive])

        const handleArchiveSet = (index)=>{
            const val = JSON.parse(document.querySelector(`#dlt-${index}`).dataset.value)
            setValue(val.slice(3,12))
            handleValueChange()
        }

        return(
            <div className="archiveContainer">
                <dialog open={!isClosed} ref={modalRef} className="Archive">
                    <div className="ArchTop">
                        <h2 id="archT">  Archive <FolderArchive id="icon" /></h2>
                        <div className="archTopRight">
                            <button onClick={handleDeleteArchives} id="deleteAll"><Trash2/> Delete All</button> 
                            <button onClick={()=>{setClose(true)}}><X /></button>
                        </div>
                    </div>
                    <hr />
                    <hr />
                    <div className="archMain">
                        {handleArchiveUpdates()}
                    </div>
                </dialog>
            </div>
        )
    }

    export default Archive;
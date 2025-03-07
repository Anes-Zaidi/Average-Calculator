    import React , { useEffect , useRef , useState } from "react";
    import {X , Delete , Trash2} from "lucide-react"

    function Archive({isClosed , setClose , archvRef , archive}){
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

        const handleArchiveUpdates = () =>{
            if(archive.length != 0){
                return archive.map((element , index)=>(
                    <div className="archive-element-container">
                        <div className="archive-element" key={index}>
                            <h3>Preset #{index}</h3>
                            <h3>{element[1].date}</h3>
                            <h3>{element[0].uni}</h3>
                            < Delete />
                        </div>
                    </div>
                )) 
            }else{
                return(
                    <div>Here you will find all your saved averages</div>
                )
            }
        }

        useEffect(() => {
            console.log("Archive changed:", archive);
          }, [archive]);

        return(
            <div className="archiveContainer">
                <dialog open={!isClosed} ref={modalRef} className="Archive">
                    <div className="ArchTop">
                        <h2>Archive :</h2>
                        <div className="archTopRight">
                            <div className="resetBtn" >
                                <Trash2 /> Delete All
                            </div>
                            <div className="exitBtn" onClick={()=>{setClose(true)}} >
                                <X />
                            </div>
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
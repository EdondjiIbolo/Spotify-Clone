
import { useEffect, useRef, useState } from "react";
const PlayIcon =()=>{
    return(
        <>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#000">
            <path fill="#000" d="M8 5.14v14l11-7-11-7z"></path>
        </svg>
        </>
    )
}
const PauseIcon =()=>{
    return(
        <>
            <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16">
                <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
            </svg>
        </>
    )
}
export function Player(){
    const [isplaying , setIsplaying] = useState(false)
    const [currentSong , setCurrentSong] = useState(false)
    const audioref = useRef()
    useEffect(()=>{
        audioref.current.src=`../../public/music/1/01.mp3`
    },[])
    const handleClick=(e)=>{
        e.preventDefault()
        if(isplaying){
            audioref.current.pause()
        }else{
            audioref.current.play()

        }
        setIsplaying(!isplaying)
    }

    return(
        <div className="flex flex-row justify-between w-full min-h-[80px] items-center text-white px-4 z-50">
            <div>Currenting...</div>
            <div className="grid place-content-center  gap-4 flex-1">
                <div className="flex justify-center">
                    <button className="bg-white rounded-full p-2" onClick={handleClick}>
                        {isplaying ?  <PauseIcon /> : <PlayIcon /> }
                    </button>
                </div>
            </div>
            <div>Volumen...</div>

            <audio ref={audioref}/>
        </div>
    )
}
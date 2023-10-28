
import { useEffect, useRef, useState } from "react";
import { usePlayerStore } from "../store/playerStore";
export const PlayIcon =()=>{
    return(
        <>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#000">
            <path fill="#000" d="M8 5.14v14l11-7-11-7z"></path>
        </svg>
        </>
    )
}
export const PauseIcon =()=>{
    return(
        <>
            <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16">
                <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
            </svg>
        </>
    )
}

const CurrentSong =({image,title , artists})=>{
    return(
        <div className='flex items-center gap-4 relative overflow-hidden'>
            <picture className="w-12 h-12 bg-zinc-600 rounded-md shadow-lg overflow-hidden">
                <img src={image} alt={title} />
            </picture>
            <div>
                <h3 className="font-bold text-sm block">
                    {title}
                </h3>
                <span className='text-xs opacity-70'>
                    {artists?.join(', ')}
                </span>
            </div>

        </div>
    )
}
export function Player(){
    const {isPlaying , setIsPlaying ,currentMusic} = usePlayerStore(state=>state)
    const audioref = useRef()

    useEffect(()=>{
        isPlaying 
        ? audioref.current.play() 
        : audioref.current.pause()
    },[isPlaying])
    useEffect(()=>{
        const {song ,playlist , songs} = currentMusic
        if(song){
            const src= `../../public/music/${playlist?.id}/0${song.id}.mp3`
            audioref.current.src = src
            audioref.current.play()
        }
    },[currentMusic])
    const handleClick=(e)=>{
        e.preventDefault()
        if(isPlaying){
            audioref.current.pause()
        }else{
            audioref.current.play()

        }
        setIsPlaying(!isPlaying)
    }

    return(
        <div className="flex flex-row justify-between w-full min-h-[80px] items-center text-white px-4 z-50">
            <div> 
                <CurrentSong {...currentMusic.song}/> 
            </div>
            <div className="grid place-content-center  gap-4 flex-1">
                <div className="flex justify-center">
                    <button className="bg-white rounded-full p-2" onClick={handleClick}>
                        {isPlaying ?  <PauseIcon /> : <PlayIcon /> }
                    </button>
                </div>
            </div>
            <div>Volumen...</div>

            <audio ref={audioref}/>
        </div>
    )
}
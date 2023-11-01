
import { useEffect, useRef, useState } from "react";
import { usePlayerStore } from "../store/playerStore";
import { Slider } from "./Slider"
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
export const VolumeSilence = () => (
    <svg fill="currentColor" role="presentation" height="16" width="16" aria-hidden="true" aria-label="Volumen apagado" viewBox="0 0 16 16" ><path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"></path><path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path></svg>
  ) 
  
export const Volume = () => (
    <svg fill="currentColor" role="presentation" height="16" width="16" aria-hidden="true" aria-label="Volumen alto" id="volume-icon" viewBox="0 0 16 16"><path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path><path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path></svg>
    )

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

const VolumeControl =()=>{
    const volume = usePlayerStore(state=>state.volume)
    const setVolume = usePlayerStore(state=>state.setVolume)
    const previusVolumeRef = useRef(volume)
    const isVolumenSilenced = volume < 0.1
    const handleClickVolumen =()=>{
        if(isVolumenSilenced){
            setVolume(previusVolumeRef.current)
            return
        }
        previusVolumeRef.current = volume
        setVolume(0)
    }

    return(
        <div className="flex justify-center gap-x-2">
            <button onClick={handleClickVolumen} className="opacity-60 hover:opacity-100 transition">
                {isVolumenSilenced ? <VolumeSilence /> : <Volume />}
            </button>
             <Slider 
             className="w-[95px] pointer"
                 defaultValue={[100]}
                 max={100}
                 min={0}
                 value={[volume*100]}
                 onValueChange={(value)=>{
                     const [newVolume] =value
                     const volumeValue = newVolume /100
                     setVolume(volumeValue)
                 }}
             />
        </div>
    )
}
export function Player(){
    const {isPlaying , setIsPlaying ,currentMusic, volume} = usePlayerStore(state=>state)
    const audioref = useRef()
    const volumeRef = useRef(1)

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
            audioref.current.volume = volume
            audioref.current.play()
        }
    },[currentMusic])
    useEffect(()=>{
       audioref.current.volume = volume 
    },[volume])
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
            <div className="grid place-content-center">
                <VolumeControl />
            </div>

            <audio ref={audioref}/>
        </div>
    )
}
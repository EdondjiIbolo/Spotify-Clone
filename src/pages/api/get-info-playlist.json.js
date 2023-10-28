import { allPlaylists , songs as allSongs} from "../../lib/data";
export async function GET({params ,  request}){
    const {url} = request
    const [,querystring] = url.split('?')
    const searchParams = new URLSearchParams(querystring)
    const id = searchParams.get('id')


    const playlist = allPlaylists.find((playlist)=>playlist.id===id)
    const songs = allSongs.filter(song=>song.albumId===playlist?.albumId)

    return new Response(JSON.stringify({playlist,songs}), {
        headers:{ "contenty-type":"application/json"}
    })
}
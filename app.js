const searchSong = ()=>{
    const searchText = document.getElementById("search-field").value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    //load data
    fetch(url)
    .then(res=> res.json())
    .then(data=>displaySongs(data.data))
}
const displaySongs = songs=>{
    const songDiv = document.getElementById('song-container');
    songs.forEach(song => {
        const li = document.createElement('li');
        li.innerText=song.title;
        songDiv.appendChild(li);
    });
}
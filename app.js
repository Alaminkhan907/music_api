const searchSong = async()=>{
    const searchText = document.getElementById("search-field").value;
    toggleSpinner();
    try {
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    //load data
    const res = await fetch(url)
    const data =await res.json();
    displaySongs(data.data);
    }
    catch (error){
        displayError('Something went wrong !! please try 100 years later');
    }
}
const displaySongs = songs=>{
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML ='';
    songs.forEach(song => {
        //console.log(song);
        const songDiv = document.createElement('li');
        songDiv.className ='single-result row align-items-center my-3 p-3'
        songDiv.innerHTML=`
        <div class="col-md-9">
              <h3 class="lyrics-name">${song.title}</h3>
              <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                    <source src="${song.preview}" type="audio/mpeg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
              <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `;
        songContainer.appendChild(songDiv);
        toggleSpinner();
    });
}
const getLyric = async (artist , title)=>{
    try {
    const url =`https://api.lyrics.ovh/v1/${artist}/${title}`;
    const res =await fetch(url);
    const data = await res.json();
    displayLyrics(data.lyrics);
    }
    catch (error){
        displayError('lyrics is not found for this song');
    }
}
const displayLyrics = lyrics=>{
    const lyricsDiv = document.getElementById('song-lyrics')
    lyricsDiv.innerText = lyrics;
}
const displayError = err=>{
    const errTag =document.getElementById('error-message');
    errTag.innerText=err;
}
const toggleSpinner =()=>{
    const spinner = document.getElementById('loading-spinner');
    const songs = document.getElementById('song-container');
   spinner.classList.toggle('d-none');
   songs.classList.toggle('d-none');
}
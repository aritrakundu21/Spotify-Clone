console.log("Welcome to Spotify");
//Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/Kesariya.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName : "Kesariya",          filePath: "songs/Kesariya.mp3",     coverPath: "covers/kesariya.png"},
    {songName : "Deva Deva",         filePath: "songs/Deva Deva.mp3",    coverPath: "covers/deva deva.jpg"},
    {songName : "Rasiya",            filePath: "songs/Rasiya.mp3",       coverPath: "covers/rasiya.jpg"},
    {songName : "Dance ka Bhoot",    filePath: "songs/Dance ka Bhoot.mp3",coverPath: "covers/dance ka bhoot.jpeg"},
    {songName : "Jab Tak",           filePath: "songs/Jab Tak.mp3",      coverPath: "covers/jab tak.jpg"},
    {songName : "Tera Hua",          filePath: "songsTera Hua.mp3",      coverPath: "covers/tera hua.jpg"},
    {songName : "Phir Kabhi",        filePath: "songs/Phir Kabhi.mp3",   coverPath: "covers/phir kabhi.jpg"},
    {songName : "Tum se hi",         filePath: "songs/Tum Se Hi.mp3",    coverPath: "covers/tum se hi.jpg"},
    {songName : "Teri Jhuki Nazar",  filePath: "songs/Teri Jhuki Nazar.mp3",coverPath: "covers/teri jhuki nazar.jpg"},
    {songName : "Bheegi si bhagi si",filePath: "songs/Bheegi Si Bhagi Si.mp3",coverPath: "covers/bheegi si bhaagi si.jpg"},
]

songItems.forEach((element,i) => {
     element.getElementsByTagName("img")[0].src = songs[i].coverPath;
     element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})


// audioElement.play();   

// Handle play pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else
    {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    console.log('timeupdate');
    // Upate seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;  
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex >= 9)
    {
        songIndex = 0;
    }
    else
    {
        songIndex += 1;
    }
    makeAllPlays();
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex <= 0)
    {
        songIndex = 0;
    }
    else
    {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
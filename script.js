let play = document.getElementById('play');
let progressBar = document.getElementById('progressBar');
let audio = new Audio('Audio/1.mp4');

let currentSong = 1;

play.addEventListener('click', () => {
    if (audio.paused || audio.currentTime == 0) {
        audio.play();
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');
    } else {
        audio.pause();
        play.classList.remove('fa-circle-pause');
        play.classList.add('fa-circle-play');
    }
});

audio.addEventListener('timeupdate', () => {
    let progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    progressBar.style.background = `linear-gradient(to right, #21a600ff ${progress}%, #333 ${progress}%)`;
})

progressBar.addEventListener('input', function () {
    let value = this.value;
    this.style.background = `linear-gradient(to right, #21a600ff ${value}%, #333 ${value}%)`;
    audio.currentTime = (progressBar.value * audio.duration) / 100;
});

let playMusic = Array.from(document.getElementsByClassName('playMusic'));

makeAllPlay = () => {
    playMusic.forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

playMusic.forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlay();
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');

        index = parseInt(e.target.id);
        currentSong = index;
        audio.src = `Audio/${index}.mp3`;
        audio.currentTime = 0;
        audio.play();
        updateNowBar();
    })
});

let allMusic = Array.from(document.getElementsByClassName('music-card'));

songs = [
    { songName: 'Darkhaast', songDes: 'A humble plea beneath moonlit heavens', songImage: 'Images/Darkhaast.jpeg', songPath: 'Audio/1.mp4' },
    { songName: 'Gehra Hua', songDes: 'Love sank deep in silent tides', songImage: 'Images/GehraHua.jpeg', songPath: 'Audio/2.mp4' },
    { songName: 'Chahoon Mai', songDes: 'My heart doth yearn for thee', songImage: 'Images/ChahoonMai.jpeg', songPath: 'Audio/3.mp4' },
    { songName: 'Arz Kiya Hai', songDes: 'Words offered with grace and devotion', songImage: 'Images/ArzKiyaHai.jpeg', songPath: 'Audio/4.mp4' },
    { songName: 'Ehsaas', songDes: 'A gentle whisper in the night', songImage: 'Images/Ehsaas.jpeg', songPath: 'Audio/5.mp4' },
    { songName: 'Baaarish', songDes: 'A storm of emotions', songImage: 'Images/Baarish.jpeg', songPath: 'Audio/6.mp4' },
    { songName: 'Tujhme Rab', songDes: 'In thee, divine light doth dwell', songImage: 'Images/TujhmeRab.jpeg', songPath: 'Audio/7.mp4' },
    { songName: 'Iradey', songDes: 'A cry of the soul', songImage: 'Images/Iradey.jpeg', songPath: 'Audio/8.mp4' },
    { songName: 'Janam Janam', songDes: 'A tale of eternal love', songImage: 'Images/JanamJanam.jpeg', songPath: 'Audio/9.mp4' },
    { songName: 'Labon Ko', songDes: 'Sweet lips whisper enchanted verses', songImage: 'Images/LabonKo.jpeg', songPath: 'Audio/10.mp4' },
    { songName: 'Mai Asim', songDes: 'A boundless spirit seeks the stars', songImage: 'Images/MaiAsim.jpeg', songPath: 'Audio/11.mp4' },
    { songName: 'Mann Mera', songDes: 'Mine heart wanders where love calls', songImage: 'Images/MannMera.jpeg', songPath: 'Audio/12.mp4' },
    { songName: 'Sitaare', songDes: 'Stars bear witness to our tale', songImage: 'Images/Sitaare.jpeg', songPath: 'Audio/13.mp4' },
    { songName: 'Tere Liye', songDes: 'Stars bear witness to our tale', songImage: 'Images/TereLiye.jpeg', songPath: 'Audio/14.mp4' },
    { songName: 'Haareya', songDes: 'For thee alone my heart beats', songImage: 'Images/Haareya.jpeg', songPath: 'Audio/15.mp4' },
    { songName: 'Tum Hi Ho',songDes: 'Vanquished by love irresistible charm', songImage: 'Images/TumHiHo.jpeg',songPath: 'Audio/16.mp4' },
    { songName: 'TumSeHi',songDes: 'From thee springs life sweetest melody',songImage: 'Images/TumSeHi.jpeg',songPath: 'Audio/17.mp4' },
    { songName: 'MaiTera',songDes: 'Forever thine, by heart and soul',songImage: 'Images/MaiTera.jpeg',songPath: 'Audio/18.mp4' }
]

order = [...songs];

allMusic.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].songImage;
    element.getElementsByClassName('img-title')[0].innerText = songs[i].songName;
    element.getElementsByClassName('img-description')[0].innerText = songs[i].songDes;
});

let shuffle = document.getElementById('shuffle');
let repeat = document.getElementById('repeat');
let nowBar = document.querySelector('.now-bar');

let songOnRepeat = false;
let songOnShuffle = false;

function shuffleSongs (originalOrder) {
    order = [...originalOrder];
    for(i = order.length - 1; i > 0; i--){
        let j = Math.floor((Math.random()) * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
    }
    return order;
}

shuffle.addEventListener('click', () => {
    if(!songOnShuffle) {
        songOnShuffle = true;
        songOnRepeat = false;
        shuffle.classList.add('active');
        repeat.classList.remove('active');

        order = shuffleSongs(songs);
    } else {
        songOnShuffle = false;
        shuffle.classList.remove('active');

        order = songs;
    }
});

repeat.addEventListener('click', () => {
    if(!songOnRepeat) {
        songOnRepeat = true;
        songOnShuffle = false;
        repeat.classList.add('active');
        shuffle.classList.remove('active');
    } else {
        songOnRepeat = false;
        repeat.classList.remove('active');
    }
})


function playNextSong() {

    currentSong++;

    if (currentSong > songs.length) {
        currentSong = 1;
    }

    audio.pause();

    audio.src = songs[currentSong - 1].songPath;

    audio.load();

    audio.play();

    updateNowBar();
}





//playNextSong = () => {
 //   if(!songOnRepeat){
   //     let nextSong = (currentSong + 1) % playMusic.length;
     //   currentSong = nextSong == 0 ? 18 : nextSong;
    
       // audio.src = order[currentSong-1].songPath;
        //audio.currentTime = 0;
        //audio.play();
        //updateNowBar();
    //} else {
      //  audio.src = order[currentSong-1].songPath;
        //audio.currentTime = 0;
        //audio.play();
        //updateNowBar();
    //}
//}

playPrevSong = () => {
    let prevSong = (currentSong - 1);
    currentSong = prevSong == 0 ? 18 : prevSong;
    audio.src = `Audio/${currentSong}.mp3`;
    audio.currentTime = 0;
    audio.play();
    updateNowBar();
}

function updateNowBar () {
    nowBar.getElementsByTagName('img')[0].src = order[currentSong-1].songImage;
    nowBar.getElementsByClassName('img-title-info')[0].innerText = order[currentSong-1].songName;
    nowBar.getElementsByClassName('img-des-info')[0].innerText = order[currentSong-1].songDes;
}

forward = document.getElementById('forward');
backward = document.getElementById('backward');

forward.addEventListener('click', () => {
    playNextSong();
})

audio.addEventListener('ended', () => {
    playNextSong();
})

backward.addEventListener('click', () => {
    playPrevSong();
});
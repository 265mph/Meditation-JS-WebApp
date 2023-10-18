const app = () => {
    const song = document.querySelector('.song');
    const video = document.querySelector('.vid-container video');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');

    //getting sounds
    const sounds = document.querySelectorAll('.sound-selection button');

    //time display & selection
    const timeDisplay = document.querySelector('.time-display');
    const timeSelection = document.querySelectorAll('.time-selection button');

    //get total length of the svg
    const outlineLength = outline.getTotalLength();


    //duration
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    //setting the duration
    timeSelection.forEach(option => {
        option.addEventListener("click", function(){
            fakeDuration = this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(fakeDuration/60)}:${Math.floor(fakeDuration % 60)}`
        })
    })


    //function to stop and play sounds
    const checkPlaying = (song) => {
        if(song.paused){
            song.play();
            video.play()
            play.src = "svg/pause.svg"
        } else {
            song.pause();
            video.pause();
            play.src = "svg/play.svg"
        }
    }

    //to play sounds
    play.addEventListener("click", () => {
        checkPlaying(song);
    })

    //changing the sound
    sounds.forEach(sound => {
        sound.addEventListener("click", function() {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
        })
    })
    

    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsedTime = fakeDuration - currentTime; 

        let seconds = Math.floor(elapsedTime % 60);
        let minutes = Math.floor(elapsedTime / 60);

        // animating the svg circle
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        //animating the timer
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if(currentTime >= fakeDuration) {
            song.pause()
            song.currentTime = 0;
            play.src = "svg/play.svg"
            video.pause()
        }
    }

    
};

app();
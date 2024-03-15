


document.addEventListener("DOMContentLoaded", (event) => {
    // API Part
    const entity = "tracks";
    const apiParameter = "client_id";
    const version = "v3.0";
    const apiKey = "a7907dc9";
    const value = apiKey;
    const url = `https://api.jamendo.com/${version}/${entity}/?${apiParameter}=${value}`;
   
    fetch(url)
       .then((response) => response.json())
       .then((data) => {
         const tracks = data.results;
         console.log("Fetched tracks:", tracks); // Debugging line
         displaySongs(tracks);
       })
       .catch((error) => console.error("Error:", error));
   
    // Event Listeners
   
    // Initialize currentSongDiv here, after the DOM is loaded
    let currentSongDiv = document.querySelector(".current-song-details");
   
    // Toggling the main control - play and pause button
    let playButton = document.getElementById("playSong");
    let audioPlayer = document.getElementById("audioPlayer");
   
    playButton.addEventListener("click", () => {
       if (audioPlayer.paused) {
         audioPlayer.play();
         playButton.innerText = "⏸️";
       } else {
         audioPlayer.pause();
         playButton.innerText = "▶️";
       }
    });
   
    // Function to convert the time in minutes and seconds
    function convertTime(time) {
       let minutes = Math.floor(time / 60);
       let seconds = time % 60;
       return {
         minutes: minutes,
         seconds: seconds,
       };
    }
   
    // Handling the block of current song details
    function showCurrentSongDetails(track) {
       console.log("Updating song details for:", track.name); // Debugging line
       currentSongDiv.innerHTML = ""; // Clear previous details
       
       let songName = document.createElement("h1");
       songName.innerHTML = `${track.name}`;
       songName.classList.add("currentSongName");
   
       let artistName = document.createElement("h3");
       artistName.innerHTML = `${track.artist_name}`;
       artistName.classList.add("artistdetails");
   
       let time = document.createElement("h4");
       let timeInMinutes = convertTime(track.duration);
       time.innerText = `${timeInMinutes.minutes}:${
         timeInMinutes.seconds < 10 ? "0" : ""
       }${timeInMinutes.seconds}`;
       time.classList.add("total-time");
   
       currentSongDiv.appendChild(songName);
       currentSongDiv.appendChild(artistName);
       currentSongDiv.appendChild(time);
    }
   
    // Display song in the playlist
    function displaySongs(tracks) {
       console.log("Displaying songs:", tracks); // Debugging line
       const songList = document.querySelector(".list");
       tracks.forEach((track) => {
         const songElement = document.createElement("div");
         songElement.classList.add("song-details");
         let coverImage = document.createElement("img");
         let songName = document.createElement("span");
         let playIcon = document.createElement("span");
         coverImage.src = `${track.album_image}`;
         coverImage.classList.add("coverImage");
         songName.classList.add("songName");
         songName.innerText = `${track.name}`;
         playIcon.innerText = `▶️`;
         playIcon.classList.add("play-icon");
         songElement.appendChild(coverImage);
         songElement.appendChild(songName);
         songElement.appendChild(playIcon);
         songList.appendChild(songElement);
         playIcon.addEventListener("click", () => {
           audioPlayer.src = track.audio;
           audioPlayer.play();
           showCurrentSongDetails(track);
         });
       });
    }
   });
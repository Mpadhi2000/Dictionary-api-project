const api = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inpword = document.getElementById("inpword").value;
    console.log(inpword); 
    fetch(`${api}${inpword}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        
        result.innerHTML = `
                <div class="word">
                    <h3>${inpword}</h3>
                    <button class="icon-btn" onclick="playSound()">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic || ""}/</p>
                </div>

                <p class="word-meaning">
                    ${data[0].meanings[0].definitions[0].definition}
                </p>

                <p class="word-example">
                    ${data[0].meanings[0].definitions[0].example || ""}
                </p> `;

        // Check if audio exists before setting the src
        if (data[0].phonetics[0] && data[0].phonetics[0].audio) {
            sound.setAttribute("src", data[0].phonetics[0].audio);
        } else {
            sound.setAttribute("src", "");
        }
    })
    .catch(() => {
        result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
    });
});

function playSound() {
    // Try to play the sound and handle any errors
    try {
        if (!sound.src) {
            throw new Error("No valid audio source available.");
        }
        sound.play().catch((error) => {
            console.error("Audio playback error:", error);
            alert("Audio playback not supported or sound not available for this word.");
        });
    } catch (error) {
        console.error("Sound play error:", error);
        alert("No valid sound available for this word.");
    }
}
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '105847083bmsh48a8594d8386c1dp10f227jsne3207a0a3a63',
		'X-RapidAPI-Host': 'dictionary-data-api.p.rapidapi.com'
	}
};

const difficultWords = ["Benevolent","Capitulate","Deleterious","Felicitous","Ephemeral","Garrulous","Hapless","Idiosyncrasy","Juxtapose","Kaleidoscope","Lethargic","Mellifluous","Nefarious","Ostentatious","Pernicious","Quixotic","Recalcitrant","Serendipity","Tenacious","Ubiquitous","Veracity","Whimsical","Xenophobe","Yarn","Zealot","Cacophony","Dichotomy","Eloquent","Furtive"];


function getDayNumber() {
    const today = new Date();
    const dayNumber = today.getDay();
    return dayNumber;
}

function change(text) {
  word.innerHTML = text
}

function search(word) {
  let s
  fetch('https://dictionary-data-api.p.rapidapi.com/definition/' + word, options)
    .then(response => response.json())
    .then(data => {

      list.innerHTML = ""
      let x = data.word
      
      change(x)
      
      for (let i = 0; i < data.meaning.length; i++) {

        a = s1.replace("tag", data.meaning[i].tag)
        list.insertAdjacentHTML('beforeend', a);
        
        for (let j = 0; j < data.meaning[i].values.length; j++) {

          s = data.meaning[i].values[j].split(":")
          list.insertAdjacentHTML('beforeend', s2.replace("def", s[0]));
          
        }
      }     
      
    })
    .catch(err => console.error(err));

}

function perform() {
  
  let value = input.value
  input.value = ""
  if (value !=""){
  defination.classList.add("hidden")
  animation.classList.remove("hidden")
  
  search(value)
  label2.innerHTML = ""

  setTimeout(function() {
    defination.classList.remove("hidden")
    animation.classList.add("hidden")
}, 5000);
  }
}

function speak() {
  let text = word.innerHTML
  console.log(text)
  const utterance = new SpeechSynthesisUtterance(text);

  utterance.voice = synth.getVoices()[2];

  synth.speak(utterance);

  audioPlayer.pause();

  utterance.onend = () => {
    const blob = new Blob([new Uint8Array(0)]);
    const url = URL.createObjectURL(blob);
    audioPlayer.src = url;
    audioPlayer.play();
  };
}


let word = document.getElementById("word")

let s1 = ' <div class = "heading2">tag</div>'

let s2 = '<li class = "element"><div class = "meaning">def</div></li>'

const synth = window.speechSynthesis;


defination.classList.add("hidden")
  animation.classList.remove("hidden")
  
  search(difficultWords[getDayNumber()])

  setTimeout(function() {
    defination.classList.remove("hidden")
    animation.classList.add("hidden")
}, 3500);
  
window.onload = function() {
            document.getElementById('input').focus();
        }
const chansonGood = ["freed-from-desire","l'amour toujours", "i gotta feeling","one more time","partenaire particulier","never gonna give you up","don't stop me now","what you won't do love","rasputin","star walkin"]
const chansonBad = ["set it off", "gilded lily", "rubber duck","squares","people you know","padoru","ghost town","bleed","engravings","fallen kingdom","oh my","fire to the fuse","mr sunshine","empty house","bad boy","golden hour","why do i"," xenogenesis","the ballet girl","on and on"," miss you","BOW","those eyes","sick of u","feel something"]
const audio = document.getElementsByClassName("musique")
const image = document.getElementsByClassName("image")
const answer1 = document.querySelector(".answer1")
const answer2 = document.querySelector(".answer2")
const answer3 = document.querySelector(".answer3")
const answer4 = document.querySelector(".answer4")
const button = document.querySelector(".lebouton")
const scored = document.querySelector(".score")
const tictac = document.querySelector(".timer")
let propositions =[]
let i = -1
let y = 0
let z = 0
let score = 0
let date1 = undefined
let date2 = undefined
let temps = 30
let timer 
let count_on = 0
let perdu = 0

alert("Bienvenue sur ce Blind Test ! Tu auras 30s pour retrouver le titre de chacune de ces 10 musiques. Appuie sur pret entre chaque chanson pour lancer le timer ! BONNE CHANCE !")

const compteur = () =>{
    tictac.innerHTML = `<p>temps restant : 00 : ${temps} </p>`
    temps = temps -1
    if (temps === -2){
        perdu = 1
        count_on = 0
        fct()
        return
    }
    timer = setTimeout(compteur, 1000)
}

const updateScore = () => {
    date2 = Date.now()
    score = score + (31000-(date2-date1))
    return score 
}

const fct = (event) =>{

    clearTimeout(timer)
    temps = 30
    audio[i].pause()
    answer1.innerText === chansonGood[i] ? answer1.classList.add("correct") : answer1.classList.add("wrong")
    answer2.innerText === chansonGood[i] ? answer2.classList.add("correct") : answer2.classList.add("wrong")
    answer3.innerText === chansonGood[i] ? answer3.classList.add("correct") : answer3.classList.add("wrong")
    answer4.innerText === chansonGood[i] ? answer4.classList.add("correct") : answer4.classList.add("wrong")
    image[i].classList.remove("blur")
    image[i].classList.add("noblur")
    if(y===i){
        if(perdu === 0 && bonneReponse(event.target.innerText) && y === i){
            alert("BONNE REPONSE !")
            score = (+updateScore())
            console.log(score)
            scored.innerHTML = `<p> score total : ${score} pts </p>`
            
        }
        else{
            alert("MAUVAISE REPONSE :(")
        }
        count_on = 0
        y = y + 1
    }
    perdu = 0
    button.classList.remove("hiddenbutton")
    if (i == 9){
        button.classList.add("hiddenbutton")
        alert(`Bravo ! C'est la fin de ce BlindTest ! Tu as réussi à faire un score de ${score} !`)
    }

}

const bonneReponse = (reponse) => {
    return String(reponse) === chansonGood[i] ? true : false
}

const getSongs = () =>{
    let liSong = []
    let song = undefined
    liSong.push(chansonGood[i])
    for(let x = 0; x <=2; x++){
        song = chansonBad[Math.floor(Math.random()*chansonBad.length)]
        if(liSong.includes(song)){
            x = x-1 
        }
        else{
            liSong.push(song)
        }
    }
    liSong = liSong.sort(() => Math.random() - 0.5)
    console.log(liSong)
    return liSong
}

const start =() => {
    if (count_on === 0){
        count_on = 1
        compteur()
    }
    answer1.classList.remove("correct" , "wrong")
    answer2.classList.remove("correct" , "wrong")
    answer3.classList.remove("correct" , "wrong")
    answer4.classList.remove("correct" , "wrong")
    i = i + 1
    propositions = getSongs()
    answer1.innerHTML = `<p> ${propositions[1]} </p>`
    answer2.innerHTML = `<p> ${propositions[2]} </p>`
    answer3.innerHTML = `<p> ${propositions[3]} </p>`
    answer4.innerHTML = `<p> ${propositions[0]} </p>`
    button.classList.add("hiddenbutton")
    if(i>0){
        image[i-1].classList.add("hidden")
    }
    image[i].classList.remove("hidden")
    audio[i].play()
    date1 = Date.now()
}

button.addEventListener('click', start)
answer1.addEventListener('click', fct)
answer2.addEventListener('click', fct)
answer3.addEventListener('click', fct)
answer4.addEventListener('click', fct)

answer1.addEventListener('touchend', fct)
answer2.addEventListener('touchend', fct)
answer3.addEventListener('touchend', fct)
answer4.addEventListener('touchend', fct)

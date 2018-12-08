import './styles.scss';

// shortcuts
const q = query =>{
	return document.querySelector(query);
}

const click = (el, func)=>{
	q(el).addEventListener('click', func);
}

const colors = ['#63560d', '#963511', '#821730', '#291256', '#123554', '#223a29', '#4e1358'];
let currentColour = null;
let correctIndex = null;

const colourChange = ()=>{
 const len = colors.length;
 const pick = Math.floor(Math.random() * len);
 if(colors[pick] == currentColour){
 	colourChange();
 }
 else {
	document.documentElement.style.setProperty('--bg', colors[pick]);
	currentColour = colors[pick];
 }
}

let i = 0;
let txt = '';
const typeWriter = () =>{
  if (i < txt.length) {
    q('#quizQ').innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, 50);
  }
}

const shuffle = array => {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const checkAnswer = e =>{
	if(e.target.dataset.id == correctIndex){
		alert('correct');
	}
	else {
		alert('wrong');
	}
}

const askQ = ()=>{
	fetch('https://opentdb.com/api.php?amount=1&category=9')
	.then(res =>{
		return res.json();
	})
	.then(res => {
		const questionDetails = res.results[0];
		console.log(questionDetails);
		txt = questionDetails.question.replace(/&quot;/g, '"').replace('&#039;', '\'');
		typeWriter();

		let answers = [];
		answers.push({text: questionDetails.correct_answer, correct: true});
		questionDetails.incorrect_answers.forEach(a => {
			answers.push({text: a, correct: false});
		});
		const shuffledAnswers = shuffle(answers);
		console.log(shuffledAnswers);
		shuffledAnswers.forEach((a, i) =>{
			if(a.correct){
				correctIndex = i;
			}
			const ans = document.createElement('button');
			ans.innerText = a.text;
			ans.dataset.id = i;
			ans.addEventListener('click', checkAnswer);
			q('#quizA').appendChild(ans);
		});
	});
}

// on load
colourChange();
askQ();
click('#colourPick', colourChange);
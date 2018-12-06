import './styles.scss';

const colors = ['#63560d', '#963511', '#821730', '#291256', '#123554', '#223a29', '#4e1358'];
let currentColour = null;

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

colourChange();

document.querySelector('#colourPick').addEventListener('click', colourChange);
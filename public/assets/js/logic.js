// unassigned variables for note classes
let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;


// if notes path is hit assign variables to class elements
if (window.location.pathname === '/notes') {
	noteTitle = document.querySelector('.note-title');
	noteText = document.querySelector('.note-textarea');
	saveNoteBtn = document.querySelector('.save-note');
	newNoteBtn = document.querySelector('.new-note');
	noteList = document.querySelectorAll('.list-container .list-group');
}
// log to check availability of note variables
console.log(typeof noteTitle);
console.log(typeof noteText);
console.log(typeof saveNoteBtn);
console.log(typeof newNoteBtn);
console.log(typeof noteList);


// Show an element
const show = (elem) => {
	elem.style.display = 'inline';
}

// Hide an element
const hide = (elem) => {
	elem.style.display = 'none';
}


// event listeners for assigned note variables
// if notes path is hit
if (window.location.pathname === '/notes') {
	// new note button add event listener and log check to console
	newNoteBtn.addEventListener('click', () => {
		console.log('newBtn works');
	});
	// show save button for log to console
	show(saveNoteBtn);
	// save button add event listener log in console
	saveNoteBtn.addEventListener('click', () => {
		console.log('saveBtn works')
	});






}

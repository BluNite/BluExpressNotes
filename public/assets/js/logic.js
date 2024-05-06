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



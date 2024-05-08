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

// will show the save button if noteText and noteTitle values are true
const handleRenderSaveBtn = () => {
	if (!noteTitle.value.trim() || !noteText.value.trim()) {
		hide(saveNoteBtn)
	} else {
		show(saveNoteBtn)
	}

}




// handler for saving notes creates object newNote 
const handleNoteSave = () => {
	const newNote = {
		title: noteTitle.value,
		text: noteText.value,
	};
	console.log(newNote);

}


// event listeners for assigned note variables
// if notes path is hit
if (window.location.pathname === '/notes') {
	// new note button add event listener and log check to console
	newNoteBtn.addEventListener('click', () => {
		console.log('newBtn works');
	});

	// save button add event listener log in console
	saveNoteBtn.addEventListener('click', handleNoteSave);
	// listen for keyup event handler renders saveBtn
	noteTitle.addEventListener('keyup', handleRenderSaveBtn
	);

	//listen for keyup event handler renders saveBtn
	noteText.addEventListener('keyup', handleRenderSaveBtn
	);

}

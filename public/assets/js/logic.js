// unassigned variables for note classes
let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;
// brackets to store notes data 

// if notes path is hit assign variables to class elements
if (window.location.pathname === '/notes') {
	noteTitle = document.querySelector('.note-title');
	noteText = document.querySelector('.note-textarea');
	saveNoteBtn = document.querySelector('.save-note');
	newNoteBtn = document.querySelector('.new-note');
	noteList = document.querySelectorAll('.list-container .list-group');
}

// activeNote keeps track of textarea notes
let activeNote = {};

// fetch notes GET request
const getNotes = () =>
	fetch('/api/notes', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		}
	}
	);




// render activeNote array to title and text elements
const renderActiveNote = () => {
	hide(saveNoteBtn);

	if (activeNote.id) {
		noteTitle.setAttribute('readonly', true);
		noteText.setAttribute('readonly', true);
		noteTitle.value = activeNote.title;
		noteText.value = activeNote.text;
	} else {
		noteTitle.removeAttribute('readonly');
		noteText.removeAttribute('readonly');
		noteTitle.value = '';
		noteText.value = '';
	}
}





// Sets the activeNote and displays it
const handleNoteView = (e) => {
	e.preventDefault();
	// activeNote is loaded with data-note parsed
	activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
	// render active note array to title and text elements
	renderActiveNote();
}





// Render the list of note titles

//async function takes notes argument 
const renderNoteList = async (notes) => {
	let jsonNotes = await notes.json();
	if (window.location.pathname === '/notes') {
		// noteList element
		noteList.forEach((el) => (el.innerHTML = ''));
	}
	// check for jsonNotes
	console.log(jsonNotes)

	// tracks note list
	let noteListItems = [];

	// create list element
	const createLi = (text) => {
		const liEl = document.createElement('li');
		liEl.classList.add("list-group-item")

		const spanEl = document.createElement('span');
		spanEl.classList.add('list-item-title');
		spanEl.innerText = text;
		spanEl.addEventListener('click', handleNoteView)
		liEl.append(spanEl);
		return liEl;
	}


	// Returns HTML element with or without a deleteButton
	// loop through jsonNotes create list cb for each note

	jsonNotes.forEach((note) => {
		const li = createLi(note.title);
		li.dataset.note = JSON.stringify(note);
		noteListItems.push(li);
	})

	// if notes path is hit noteListItems array loop through append notes to noteList[0]
	if (window.location.pathname === '/notes') {
		noteListItems.forEach((note) => noteList[0].append(note));
	}

}


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

// handler for saving text from keyup events creates object newNote 
const handleNoteSave = () => {
	const newNote = {
		title: noteTitle.value,
		text: noteText.value,
	};
	// new note obj. shows in console
	console.log(newNote);

}


// cb for GET route render notes
const getAndRenderNotes = () => getNotes().then(renderNoteList);
// event listeners for assigned note variables
// if notes path is hit
if (window.location.pathname === '/notes') {
	// note list event listener

	// new note button add event listener and log check to console
	// save button add event listener log in console
	saveNoteBtn.addEventListener('click', handleNoteSave);
	// listen for keyup event handler renders saveBtn
	noteTitle.addEventListener('keyup', handleRenderSaveBtn,
	);
	//check network for response 

	//listen for keyup event handler renders saveBtn
	noteText.addEventListener('keyup', handleRenderSaveBtn
	);

}
getAndRenderNotes();
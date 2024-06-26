

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
		},
	});

// fetch notes Post request

const saveNote = (note) =>
	fetch('/api/notes', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(note),
	});




const deleteNote = (id) =>
	fetch(`/api/notes/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	});
// render activeNote array to title and text elements if no id remove readonly attr. set elements to blank text
const renderActiveNote = () => {
	hide(saveNoteBtn);
	// if there is an 'id' property
	if (activeNote.id) {
		noteTitle.setAttribute('readonly', true);
		noteText.setAttribute('readonly', true);
		// note title element
		noteTitle.value = activeNote.title;
		// note text element
		noteText.value = activeNote.text;
	} else {

		noteTitle.removeAttribute('readonly');
		noteText.removeAttribute('readonly');
		// note title element
		noteTitle.value = '';
		// note text element
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

// new notes view clears sets empty array
const handleNewNoteView = (e) => {
	activeNote = {};
	renderActiveNote();
};



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
	const createLi = (text, delBtn = true) => {
		const liEl = document.createElement('li');
		liEl.classList.add("list-group-item")

		const spanEl = document.createElement('span');
		spanEl.classList.add('list-item-title');
		spanEl.innerText = text;
		spanEl.addEventListener('click', handleNoteView)
		liEl.append(spanEl);
		// if there is a deleBtn(true) creates deleteBtn element add classes
		if (delBtn) {
			const delBtnEl = document.createElement('i');
			delBtnEl.classList.add(
				'fas',
				'fa-trash-alt',
				'float-right',
				'text-danger',
				'delete-note',

			);
			// delete btn listen for click event check console for log
			delBtnEl.addEventListener('click', handleNoteDelete);
			liEl.append(delBtnEl);
		}

		return liEl;
	}


	// Returns HTML element with or without a deleteButton
	// loop through jsonNotes create list cb for each note



	jsonNotes.forEach((note) => {
		const li = createLi(note.title);
		li.dataset.note = JSON.stringify(note);
		noteListItems.push(li);
	});

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
	saveNote(newNote).then(() => {
		getAndRenderNotes();
		renderActiveNote();
	});

}


const handleNoteDelete = (e) => {
	e.stopPropagation();
	const note = e.target;
	//test log for note in DOM
	console.log(note)
	const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;
	// test log for note parentEl attribute data-note 'id'
	console.log(noteId)
	if (activeNote.id === noteId) {
		console.log("active note ID matches noteId");
		// declare activeNote empty
		activeNote = {};
	}
	// create fetch cb route to accept noteID req.param
	deleteNote(noteId).then(() => {
		getAndRenderNotes();
		renderActiveNote();
	});

};


// cb for GET route render notes
const getAndRenderNotes = () => getNotes().then(renderNoteList);
// event listeners for assigned note variables
// if notes path is hit
if (window.location.pathname === '/notes') {
	// new note button add event listener and log check to console
	newNoteBtn.addEventListener('click', handleNewNoteView);
	// save button add event listener log in console
	saveNoteBtn.addEventListener('click', handleNoteSave);
	// listen for keyup event handler renders saveBtn
	noteTitle.addEventListener('keyup', handleRenderSaveBtn,
	);


	//listen for keyup event handler renders saveBtn
	noteText.addEventListener('keyup', handleRenderSaveBtn
	);

}
getAndRenderNotes();
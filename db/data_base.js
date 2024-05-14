// require dependencies
const fs = require('fs');
const util = require('util');
// string value of file name for read readFileAsync 
const noteData = "./db/db11.json";
// read file async promise
const readFileAsync = util.promisify(fs.readFile);
// writFile async promise 
const writeFileAsync = util.promisify(fs.writeFile);
// DataBase class 

class DataBase {
	// read notes from database json file
	async readNote() {
		try {
			// await  database json file
			const notesRaw = await readFileAsync(noteData, "UTF8");

			return notesRaw ? JSON.parse(notesRaw) : [];
		}


		catch (error) {
			throw error;
		}
	}
	//add notes to database json file 
	async addNote(data) {
		try {
			await writeFileAsync(noteData, JSON.stringify(data, null, "\t")).then(() => {
				console.log("note added")
			})

		} catch (error) {
			throw error;
		}
	}

	async deleteNote(data) {
		try {
			await writeFileAsync(noteData, JSON.stringify(data, null, "\t")).then(() => {
				console.log("note deleted")
			})
		} catch (error) {
			throw error;
		}
	}

}



module.exports = new DataBase();


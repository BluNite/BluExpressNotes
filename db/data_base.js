// require dependencies
const fs = require('fs');
const util = require('util');

// json database
const noteData = "./db.json";

// read, write file async promise
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class DataBase {
	async readNotes() {
		try {
			const noteRaw = await readFileAsync(noteData, "utf8");
			return noteRaw ? JSON.parse(noteRaw) : [];
		} catch (error) {
			throw error;
		}
	}
}

module.exports = new DataBase();


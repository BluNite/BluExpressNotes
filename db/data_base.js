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
Lorem ipsum dolor sit amet consectetur, adipisicing elit.Ullam possimus consequatur eos labore enim impedit, quasi fugit, qui ratione tenetur atque nihil deserunt excepturi provident libero voluptates laudantium ? Odio vel temporibus exercitationem illo error molestiae illum iste.Saepe quo est nihil aperiam praesentium voluptatum molestias accusamus libero minus ? Dolorem esse soluta sequi, voluptatibus vitae sint.
class DataBase {
	// read notes from database json file
	async readNotes() {
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
	async addNotes(data) {
		try {
			await writeFileAsync(noteData, JSON.stringify(data, null, "\t")).then(() => {
				console.log("note added")
			})

		} catch (error) {
			throw error;
		}
	}

}

module.exports = new DataBase();


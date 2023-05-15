// Random data generator Script using falso
import falso from "@ngneat/falso";
import fs from "fs";
const data = [];
for (let i = 0; i < 1000; i++) {
	data.push({
		plot: falso.randParagraph({ min: 2, max: 5, language: "en" }),
		runtime: falso.randNumber({ min: 0, max: 200 }),
		title: falso.randMovie(),
		lastupdated: falso.randPastDate(),
		num_theaters: falso.randNumber({ min: 0, max: 1000 }),
		total_revenue: falso.randNumber({ min: 0, max: 10000 }),
		viewers: falso.randNumber({ min: 0, max: 10000 }),
		num_mflix_comments: falso.randNumber({ min: 0, max: 50 }),
	});
}
use("sample_movie_data");
db.movies.insertMany(data);

// <---------------------END OF SCRIPT--------------------------------------->
//Write JSON file
fs.writeFile("data.json", JSON.stringify(data), "utf8", (err) => {
	if (err) {
		console.log(`Error writing file: ${err}`);
	} else {
		console.log(`File is written successfully!`);
	}
});

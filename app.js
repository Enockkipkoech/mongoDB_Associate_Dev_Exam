import { MongoClient } from "mongodb";
import { uri } from "./atlas_uri.js";

console.log(uri);

//Initiate connection to MongoDB
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const dbName = "NodesLearning";

//Connect to MongoDB
const connectToMongoDB = async () => {
	try {
		await client.connect();
		console.log(`✅ ✅  Connected to MongoDB 💪 💪 : ${dbName}`);
	} catch (error) {
		console.log(`❌ ❌ Error connecting to MongoDB  `, error);
	}
};

// Other functions
const listDBs = async (client) => {
	const databasesList = await client.db().admin().listDatabases();
	console.log("Databases_Info:", databasesList);
	databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
};

// Main function

const main = async () => {
	try {
		await connectToMongoDB();
		await listDBs(client);
	} catch (error) {
		console.error(
			`❌ ❌  Error connecting to MongoDB 💪 💪 : ${dbName}`,
			error,
		);
	} finally {
		await client.close();
	}
};

// Run main function
main();

import { MongoClient } from "mongodb";
import { uri } from "./atlas_uri.js";

console.log(uri);

//Initiate connection to MongoDB
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const dbName = "NodesLearning";
const collectionName = "bank";

const bankCollection = client.db(dbName).collection(collectionName);

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
	console.log("Databases_Info:", databasesList.databases);
	databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
};

// insertOneDocument
const sampleAccount = {
	name: "Saving Account",
	account_holder: "Enock Dev",
	account_id: "123456789",
	balance: 500,
	currency: "USD",
	status: "active",
	last_updated: new Date(),
};

// insertManyDocuments
const sampleAccounts = [
	{
		name: "Checking Account",
		account_holder: "Enock Dev",
		account_id: "123456789",
		balance: 500,
		currency: "USD",
		status: "active",
		last_updated: new Date(),
	},
	{
		name: "Business Account",
		account_holder: "Enock Dev",
		account_id: "123456789",
		balance: 150000,
		currency: "KES",
		status: "active",
		last_updated: new Date(),
	},
	{
		name: "Leisure Account",
		account_holder: "Enock Dev",
		account_id: "123456789",
		balance: 5.101,
		currency: "USD",
		status: "active",
		last_updated: new Date(),
	},
];

// Main function

const main = async () => {
	try {
		await connectToMongoDB();
		await listDBs(client);

		// Insert one document
		const insertResultOne = await bankCollection.insertOne(sampleAccount);

		console.log(
			`✅ ✅  Successfully inserted item : ${JSON.stringify(insertResultOne)}`,
		);
		// Insert many documents
		const insertResultMany = await bankCollection.insertMany(sampleAccounts);
		console.log(
			`✅ ✅  Successfully inserted items : ${JSON.stringify(
				insertResultMany,
			)}`,
		);
	} catch (error) {
		console.error(`❌ ❌  Error in MongoDB 💪 💪 : ${dbName}`, error);
	} finally {
		await client.close();
	}
};

// Run main function
main();

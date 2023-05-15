import { MongoClient, ObjectId } from "mongodb";
import { uri } from "./atlas_uri.js";

// console.log(uri);

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
	// console.log("Databases_Info:", databasesList.databases);
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

		// Query the database

		const docFilter = { balance: { $gt: 1000 } };
		const docToFind = { _id: new ObjectId("645b6d5d9fadf3eb43bc944a") };
		//find()
		const queryResult = await bankCollection.find(docFilter).toArray();
		queryResult.forEach((doc) => {
			console.log(doc);
			return doc;
		});
		console.log(
			`✅ ✅  Successfully queried items : ${JSON.stringify(queryResult)}`,
		);

		// DOC COUNT
		const docCount = await bankCollection.countDocuments(docFilter);
		console.log(`✅ ✅  Found : ${docCount} document(s)`);

		// findOne()
		const queryResultOne = await bankCollection.findOne(docToFind);
		console.log(
			`✅ ✅  Successfully found queried item : ${JSON.stringify(
				queryResultOne,
			)}`,
		);

		//UPDATE DOCS
		// Update one document
		let docToUpdate = { _id: new ObjectId("645b6d5d9fadf3eb43bc944a") };
		let updateDoc = { $inc: { balance: 5000 } }; // update operator
		const updateResult = await bankCollection.updateOne(docToUpdate, updateDoc);
		updateResult.modifiedCount === 1
			? console.log(
					`✅ ✅  Successfully updated item : ${JSON.stringify(updateResult)}`,
			  )
			: console.log(
					`❌ ❌  Failed to update item : ${JSON.stringify(updateResult)}`,
			  );

		// Update many documents
		let docsToUpdate = { name: "Saving Account" };
		//$push
		let updateDocs = { $push: { transfer_complete: "TR-SAV4007" } }; // update operator - push to array
		const updateManyResult = await bankCollection.updateMany(
			docsToUpdate,
			updateDocs,
		);
		updateManyResult.modifiedCount > 0
			? console.log(
					`✅ ✅  Successfully updated items : ${JSON.stringify(
						updateManyResult,
					)}`,
			  )
			: console.log(
					`❌ ❌  Failed to update items : ${JSON.stringify(updateManyResult)}`,
			  );

		//$pop
		let popDocs = { $pop: { transfer_complete: -1 } }; // update operator - pop from array
		const popManyResult = await bankCollection.updateMany({}, popDocs);
		popManyResult.modifiedCount > 0
			? console.log(
					`✅ ✅  Successfully updated items : ${JSON.stringify(
						popManyResult,
					)}`,
			  )
			: console.log(
					`❌ ❌  Failed to update items : ${JSON.stringify(popManyResult)}`,
			  );

		// $pull
		let pullDocs = { $pull: { transfer_complete: "TR-SAV4007" } }; // update operator - pull from array
		const pullManyResult = await bankCollection.updateMany({}, pullDocs);
		pullManyResult.modifiedCount > 0
			? console.log(
					`✅ ✅  Successfully updated items : ${JSON.stringify(
						pullManyResult,
					)}`,
			  )
			: console.log(
					`❌ ❌  Failed to update items : ${JSON.stringify(pullManyResult)}`,
			  );

		// DELETE DOCS
		// Delete one document
		let docToDelete = { _id: new ObjectId("645b6d5d9fadf3eb43bc944a") };
		const deleteResult = await bankCollection.deleteOne(docToDelete);
		deleteResult.deletedCount === 1
			? console.log(
					`✅ ✅  Successfully deleted item : ${JSON.stringify(deleteResult)}`,
			  )
			: console.log(
					`❌ ❌  Failed to delete item : ${JSON.stringify(deleteResult)}`,
			  );

		// Delete many documents
		let docsToDelete = { balance: { $lt: 1000 } };
		const deleteManyResult = await bankCollection.deleteMany(docsToDelete);
		deleteManyResult.deletedCount > 0
			? console.log(
					`✅ ✅  Successfully deleted ${
						deletedManyResult.deletedCount
					} items: ${JSON.stringify(deleteManyResult)}`,
			  )
			: console.log(
					`❌ ❌  Failed to delete items : ${JSON.stringify(deleteManyResult)}`,
			  );

		// Query the database
		let docs = await bankCollection.find({}).toArray();
		docs.forEach((doc) => console.log(doc));
	} catch (error) {
		console.error(`❌ ❌  Error in MongoDB 💪 💪 : ${dbName}`, error);
	} finally {
		await client.close();
	}
};

// Run main function
main();

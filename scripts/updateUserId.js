// Run this script with: node scripts/updateUserId.js
require('dotenv').config();
const mongoose = require('mongoose');

async function updateAllUserIds() {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log('Connected to MongoDB');

		const db = mongoose.connection.db;
		const collection = db.collection('words');

		// Update all documents
		const newUserId = 'your_new_user_id_here'; // Replace with actual userId
		
		const result = await collection.updateMany(
			{}, // Empty filter = all documents
			{ $set: { userId: newUserId } }
		);

		console.log(`Updated ${result.modifiedCount} documents`);
		
	} catch (error) {
		console.error('Error:', error);
	} finally {
		await mongoose.disconnect();
	}
}

updateAllUserIds();

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const db = client.db("db");

/** Insert a post into the database. A post should be of the following form:
 *  {
 *      sender: string,
 *      content: string,
 *  }
 */
const insertPost = async (post) => {
    try {
        const collection = db.collection("posts");
        const result = await collection.insertOne(post);
        console.log(`Inserted post with the id ${result.insertedId}`);

        return result;
    } catch (e) {
        console.error(e);

        throw e;
    }
};

/** Get the latest numPosts posts from the database. */
const getLastPosts = async (numPosts) => {
    try {
        const collection = db.collection("posts");
        const cursor = collection.find().sort({ _id: -1 }).limit(numPosts);
        const posts = await cursor.toArray();
        console.log(`Found ${posts.length} posts`);

        return posts;
    } catch (e) {
        console.error(e);

        throw e;
    }
};

/** Count the total number of posts in the database. */
const countPosts = async () => {
    try {
        const collection = db.collection("posts");
        const numPosts = await collection.countDocuments();

        return numPosts;
    } catch (e) {
        console.error(e);

        throw e;
    }
};

module.exports.insertPost = insertPost;
module.exports.getLastPosts = getLastPosts;
module.exports.countPosts = countPosts;

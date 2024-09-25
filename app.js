const express = require("express");
const path = require("path");
const { insertPost, getLastPosts } = require("./db");

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (_req, res) => {
    const posts = await getLastPosts(10);

    res.render("index", { posts: posts });
});

app.post("/", async (req, res) => {
    console.log(req.body);
    await insertPost(req.body);

    res.redirect("/");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

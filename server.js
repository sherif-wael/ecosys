const express = require("express");
const path = require("path");
const app = express();

app.use((req, res, next) => {
    const https = req.get('X-Forwarded-Proto') === "https";

    if(!https && process.env.REACT_APP_NODE_ENV === "production"){
        const redirectTo = `https:\/\/${req.hostname}${req.url}`;
        res.redirect(301, redirectTo);
    }

    return next();
})

app.use(express.static(
    path.join(__dirname, "build")
));

app.get("*", (req, res) => {
    res.sendFile(
        path.join(__dirname, "build", "index.html")
    );
})

const port = process.env.PORT || 8081;

app.listen(port, () => {
    console.log(`server is listening to port ${port}`);
});
import express from 'express';
import authRoute from "./routes/auth.route.js"
import testRoute from "./routes/test.route.js"
import productRoute from "./routes/product.route.js"
import cookieParser from 'cookie-parser';
import saveRoute from "./routes/save.route.js"
import basketRoute from "./routes/basket.route.js"
import userRoute from "./routes/user.route.js"
import adminRoute from "./routes/admin.route.js"
import path from "path"
import cors from "cors";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());


app.use("/api", authRoute);
app.use("/api/test", testRoute);
app.use("/api/users", userRoute);
app.use("/api/product", productRoute)
app.use("/api/favorite", saveRoute)
app.use("/api/basket", basketRoute)
app.use("/api/admin", adminRoute)

const frontendBuildPath = path.join(new URL(import.meta.url).pathname, '..', 'e-commerce-test', 'build');

app.get('*', (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

app.listen(4444, () => {
    console.log('Server is running on port 4444');
})
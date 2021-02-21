import express, {Request,Response} from "express";
require("dotenv").config();
import template from "../template";
import devBundle from "./devBundle";
import path from "path";

const app = express();

devBundle(app);
app.use("/build",express.static(path.join(process.cwd(),"build")));
app.get("*",(req: Request,res: Response) => {
  return res.send(template());
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening at port ${port}`));
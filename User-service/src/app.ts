import cors from "cors";
import useApolloMiddleware from "./graphql";
import logger from "morgan";
import express,{Response,Request,NextFunction} from "express";
require("dotenv").config();

const app = express();

const corsOpts = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ['GET','OPTIONS','POST','PUT','HEAD']
};

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors(corsOpts));
app.get("/",(req: Request,res: Response, next: NextFunction) => {
  return res.json({
    api: process.env.APP_NAME,
    health: "healthy"
  });
});

useApolloMiddleware(app);

export default app;
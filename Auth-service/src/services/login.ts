import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import CustomError from "../util/Error";
import { client } from "../grpc/index";

export const login = (req: Request, res: Response,next: NextFunction): Response => {
  const { password } = req.body;
  console.log(req.body);
  if (!req.body.login || !password) {
    throw new CustomError(400, "Missing username or password");
  }
  return client.confirmLogin(
    { login: req.body.login, password },
    (err: Error, data: any) => {
      console.log(err);
      if (err)  return next(new CustomError(500, err.message));

      if (!data.flag) {
        return next(new CustomError(400, "Invalid username or password"));
      }

      const refreshToken = jwt.sign(
        {
          id: data.id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      res.cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true
        // secure: true
      });

      const accessToken = jwt.sign(
        {
          id: data.id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );

      return res.json({ token: accessToken });
    }
  );
};

export const refreshToken = async (req: Request, res: Response): Promise<Response> => {
  if (!req.cookies.refreshToken) {
    throw new CustomError(401, "Unauthorized");
  }

  try {
    const tokenData = jwt.verify(req.cookies.refreshToken, process.env.REFRESH_TOKEN_SECRET) as any;
    if(tokenData.id) {
      const accessToken = jwt.sign(
        {
          id: tokenData.id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );
  
      return res.json({token: accessToken});
    }
  } catch {
    throw new CustomError(403, "Forbidden");
  }
};

export const check = async(req: Request, res: Response) => {
  const token = req.cookies.refreshToken || "";
  if(token) {
    const {id} = jwt.verify(token,process.env.REFRESH_TOKEN_SECRET) as any;
    return client.checkLogin({id},(err: Error, data: any) => {
      console.log("err",err);
      if(err) throw new CustomError(500,"Internal server error");
      const accessToken = jwt.sign(
        {
          id: data.u.id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      console.log("data",data);
      return res.json({user: {...data.u, accessToken}});
    })
  }

  return res.json({user: false});
}

export const logout = async(req: Request,res: Response): Promise<Response> => {
  res.clearCookie("refreshToken");
  return res.send("logged out");
}
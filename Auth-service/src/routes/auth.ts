import {Router} from "express";
import autoCatch from "../util/autoCatch";
import {login,refreshToken,logout,check} from "../services/login";

const router = Router();

router
  .route("/login")
  .post(autoCatch(login));

router
  .route("/refresh")
  .post(autoCatch(refreshToken));
  
router
  .route("/logout")
  .post(autoCatch(logout));

  router
  .route("/check")
  .post(autoCatch(check));

export default router;
import { verify } from "jsonwebtoken";
import Alert from "../utils/Alert";
export const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodeToken = verify(token, process.env.SECRET_KEY || "RANDOM");
    const { userId, email } = decodeToken;
    req.auth = { userId, email };
    next();
  } catch (error) {
    const alert = new Alert(req, res);
    return alert.danger(
      "Vous devez etre connecté pour acceder à cette page",
      401
    );
  }
};

import UserMDL from "../models/UserMDL.js";
import Alert from "../utils/Alert.js";
import { isEmpty } from "../utils/validators.js";

export default class UsersCTRL {
  async getUsers(req, res) {
    try {
      const users = await UserMDL.find({}).sort({ createdAt: -1 }).exec();
      if (!isEmpty(users)) {
        return res.json({ users });
      }
      return res.json({ users: [] });
    } catch (error) {
      return new Alert(req, res).danger(error.message, 500);
    }
  }
  async getUser(req, res) {
    const id = req.params.id;
    const alert = new Alert(req, res);
    try {
      const user = await UserMDL.findById(id);
      if (!isEmpty(user)) {
        return res.json(user);
      }

      return alert.danger("L'utilisateur n'existe pas", 404);
    } catch (error) {
      return alert.danger(error.messsage, 500);
    }
  }

  async updateUser() {
    const id = req.params.id;
  }
}

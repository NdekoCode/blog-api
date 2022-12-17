import { hash } from "bcrypt";
import slugify from "slugify";
import UserMDL from "../models/UserMDL.js";
import Alert from "../utils/Alert.js";
import Validator from "../utils/Validator.js";

export default class UsersCTRL {
  async getUsers(req, res) {
    const validator = new Validator();
    try {
      const users = await UserMDL.find({}).sort({ createdAt: -1 }).exec();
      if (!validator.isEmpty(users)) {
        return res.json({ users });
      }
      return res.json({ users: [] });
    } catch (error) {
      return new Alert(req, res).danger(error.message, 500);
    }
  }
  async getUser(req, res) {
    const validator = new Validator();
    const id = req.params.id;
    const alert = new Alert(req, res);
    try {
      const user = await UserMDL.findById(id);
      if (!validator.isEmpty(user)) {
        return res.json(user);
      }

      return alert.danger("L'utilisateur n'existe pas", 404);
    } catch (error) {
      console.log(error);
      return alert.danger(error.messsage, 500);
    }
  }
  async deleteUser(req, res) {
    const _id = req.params.id;
    const alert = new Alert(req, res);
    try {
      const user = await UserMDL.exists({ _id });
      if (user) {
        await UserMDL.findByIdAndDelete(_id);
        return alert.success("Utilisateur supprimer avec succes");
      }
      return alert.danger("L'Utilisateur n'existe pas");
    } catch (error) {
      return alert.danger(error.message, 500);
    }
  }
  async signin(req, res) {
    const alert = new Alert(req, res);
    const validator = new Validator();
    const bodyRequest = { ...req.body };
    const fielRequired = [
      "firstName",
      "lastName",
      "email",
      "password",
      "confpassword",
    ];
    validator
      .validateRequiredFields(bodyRequest, fielRequired)
      .validateFormBody(bodyRequest)
      .validatePassword(bodyRequest.password, bodyRequest.confpassword);
    try {
      const testUser = await UserMDL.exists({ email: bodyRequest.email });
      if (testUser) {
        validator.errors["error"] = "L'utitlisateur existe déjà";
        return alert.danger(validator.errors["error"], 409);
      }
      if (validator.varIsEmpty(validator.errors)) {
        return await UsersCTRL.addUser(alert, bodyRequest);
      }
      console.log(validator.errors);
      return alert.danger(validator.errors["error"], 400);
    } catch (error) {
      return alert.danger(error.messsage, 500);
    }
  }
  static async addUser(alert, bodyRequest, update = {}) {
    const validator = new Validator();
    try {
      if (!validator.varIsEmpty(update)) {
        await UserMDL.updateOne(update, bodyRequest);
        return alert.success(
          "La modification de l'utilisateur a été faite avec succées",
          201
        );
      }

      bodyRequest.password = await hash(bodyRequest.password, 12);
      bodyRequest.slug = slugify(
        `${bodyRequest.firstName} ${bodyRequest.lastName}`.toLocaleLowerCase()
      );
      const user = new UserMDL(bodyRequest);
      await user.save();
      return alert.success("Utilisateur ajouter avec succées", 201);
    } catch (error) {
      console.log(error);
      return alert.danger(error.message, 500);
    }
  }
  async updateUser(req, res) {
    const validator = new Validator();
    const _id = req.params.id;
    const alert = new Alert(req, res);
    const bodyRequest = { ...body };
    validator.validateFormBody(bodyRequest);
    if (!validator.varIsEmpty(validator.errors)) {
      return alert.danger("Veuiller entrer tous les change", 400);
    }
    try {
      const testUser = await UserMDL.exists({ _id });
      if (testUser) {
        const user = UserMDL.updateOne({ _id }, bodyRequest);
        return alert.success("Utilisateur modifier avec succés", 201);
      }

      return alert.danger("L'utilisateur n'existe pas", 404);
    } catch (error) {
      return alert.danger(error.messsage, 500);
    }
  }
}

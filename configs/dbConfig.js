import { connect, set } from "mongoose";
// import { fakeUser } from "../utils/fakeData.js";
const dbUrl = process.env.DB_URI;
export default async function connectDD() {
  try {
    set("strictQuery", false);
    await connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
    // fakeUser();
  } catch (error) {
    console.log("failed to connected to the database ", error.message);
  }
}

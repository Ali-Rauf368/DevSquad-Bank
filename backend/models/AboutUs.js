import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, required: true }
});


const AboutUs = mongoose.model("AboutUs", aboutSchema);
export default AboutUs;

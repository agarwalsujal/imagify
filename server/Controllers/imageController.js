import axios from "axios";
import UserModel from "../Models/userModel.js";
import FormData from "form-data";

const generateImage = async (req, res) => {

  try {
    const{userId,prompt}=req.body;
    console.log("Looking up user with id:", req.user.userId);

   const user = await UserModel.findOne({ _id: req.user.userId });
    console.log("User found:", user);
    if(!user){
      return res.status(404).json({ success: false, message: "User not found" });
    }
    if (!prompt) {
      return res.status(400).json({ success: false, message: "Prompt is required" });
    }
    if (user.creditBalance <= 0 ) {
      return res.status(403).json({ success: false, message: "Insufficient credits" });
    }
    const formData=new FormData();
    formData.append("prompt", prompt);
    // Here you would typically process the image URL, e.g., download the image, compress it, etc.
    // For demonstration purposes, we'll just return the URL.
   const { data } = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        "x-api-key": process.env.CLIPDROP_API,
      },
      responseType: "arraybuffer",
    });
    const imageUrl = `data:image/png;base64,${Buffer.from(data, "binary").toString("base64")}`;
    // Deduct one credit from the user's balance
    user.creditBalance -= 1;
    await user.save();
    console.log("Image generated successfully for user:", user.name);
  res.status(200).json({ success: true, imageUrl, user: { name: user.name, creditBalance: user.creditBalance } });

  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

export { generateImage };
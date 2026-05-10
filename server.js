import express from "express";
import multer from "multer";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/generate", upload.array("images", 3), async (req, res) => {
  try {
    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt: "Create a cinematic realistic car poster",
      size: "1024x1024",
    });

    res.json({
      imageUrl: result.data[0].url,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Generation failed" });
  }
});

app.listen(3000, () => {
  console.log("Server running");
});

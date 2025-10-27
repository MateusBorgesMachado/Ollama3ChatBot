import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/ia", async (req, res) => {
  const text = req.body.text;
  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "llama3",
      prompt: text,
      stream: false,
    });
    const responseData = response.data.response.text;
    res.json(responseData);
  } catch (error) {
    console.error("Erro ao comunicar com o modelo IA:", error);
    res.status(500).send("Erro ao processar a solicitação.");
  }
});

app.listen(3000, () => {
  console.log("Servidor backend rodando na porta 3000");
});

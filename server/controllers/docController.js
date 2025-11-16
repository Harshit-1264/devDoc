import { parseDoc } from "../services/parseService.js";
import { resetVectorStore } from "../services/resetService.js";
import {
  embedAndStoreChunks,
  getAnswerFromChunks,
} from "../services/ragService.js";

import "dotenv/config";

// Controller to handle document upload and processing
export const uploadAndProcessDoc = async (req, res) => {
  const text = await parseDoc(req.file);
  let collectionName =
    req.file.originalname.replace(/\.[^/.]+$/, "") + Date.now();
  console.log("collectionName --> " + collectionName);

  // Embed the document text and store it in Qdrant
  await embedAndStoreChunks(
    text, // The extracted text from the uploaded document
    req.file.originalname, // Original filename (used for metadata)
    collectionName // Unique Qdrant collection name for this upload
  );

  // Send success response back to the client
  res.status(200).json({
    status: "uploaded and embedded", // Confirms successful upload + embedding
    embeddingName: collectionName, // Returns the Qdrant collection name
  });
};

// Ask a question based on the uploaded document
export const askQuestion = async (req, res) => {
  try {
    const { question, docId } = req.body;
    const answer = await getAnswerFromChunks(question, docId);
    if (!answer) {
      return res
        .status(404)
        .json({ error: "No answer found for the question" });
    }
    res.json({ answer });
  } catch (error) {
    console.error("Error in askQuestion:", error);
    res.status(500).json({ error: "Failed to process question" });
  }
};

// Reset embeddings for a specific document
export const resetEmbeddings = async (req, res) => {
  try {
    const { collectionName } = req.body;
    if (!collectionName) {
      return res.status(400).json({ error: "collectionName required" });
    }
    await resetVectorStore(collectionName);
    res.json({ status: "collection deleted" });
  } catch (err) {
    console.error("Error in resetEmbeddings:", err);
    res.status(500).json({ error: "Failed to reset vector store" });
  }
};
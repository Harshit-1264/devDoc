# devDoc — AI-Powered Smart Document Search & Q&A

devDoc is an advanced full-stack GenAI application that allows users to upload documents (PDF, DOCX, TXT), process YouTube videos, crawl websites, and ask natural-language questions about the content.
The system uses RAG (Retrieval-Augmented Generation), Vector Databases, and Google Gemini 2.5 Flash to deliver fast, precise, context-aware answers.

The project blends modern full-stack development with AI-oriented architecture including Next.js, Node.js, Qdrant Cloud, and LangChain.js.

-----

## Why This Project?

Before RAG existed, the only way to provide context to an AI model was to send all the data with every prompt.
This approach fails when:

* The data is too large (MBs or GBs of text)
* You need fast responses
* You want cost-efficient AI calls
* You want scalable, reusable, query-specific data retrieval

If you sent all the data to the model every time, latency would explode and costs would skyrocket.

This is where Vector Databases and RAG come in.

-----

## What Are Vector Databases?

Imagine every piece of text converted into a point in a high-dimensional space (like coordinates x, y, z in 3D).
Now imagine all points in Uttar Pradesh mapped in this space.

If you ask:
“What is the best place to visit in Gorakhpur?”
You don’t scan all points;
you only search for points closest to your question.

This is what a Vector Database like Qdrant does:

* Stores text as numerical vectors
* Finds similarities extremely fast
* Retrieves only the most relevant chunks

-----

## What Is RAG (Retrieval-Augmented Generation)?

Continuing the Gorakhpur example:
1. You ask a question
2. Vector DB finds the closest text chunks
3. Those chunks are passed to the AI model
4. The AI generates an answer based on real data
This ensures accuracy, freshness, and grounded answers.

-----

## devDoc – Smart Document Search & Q&A

devDoc allows users to:
* 📄 Upload PDF, DOCX, TXT documents
* ▶️ Process YouTube videos using transcript extraction
* 🌐 Crawl websites for text content
* 🤖 Ask question(s) in real-time
* ⚡ Receive context-aware responses powered by Gemini 2.5 Flash

The system handles:
* Text extraction
* Chunking
* Embedding generation
* Vector storage
* Semantic search
* RAG-based answer generation

-----

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Node.js (Express), Multer for file uploads, LangChain.js for RAG pipeline
- **Document / Content Extraction:** pdf-parse, mammoth(DOCX), Playwright (Web crawling), YouTube transcript extraction 
- **Vector DB:** Qdrant Cloud
- **AI Model:** Google Gemini 2.5 Flash

-----

## Architecture

```
              [User]
                │
                ▼
        [Next.js Frontend]
                │
                ▼
        [Node.js Backend API]
                │
   ___________________________
  │             │             │
  ▼             ▼             ▼
[Uploads]  [Web Crawler]  [YouTube Transcript]
                │
                ▼
      [Chunking + Embedding]
                │
                ▼
        [Qdrant Vector DB]
                │
                ▼
        [Gemini 2.5 Flash]
                │
                ▼
      [Final Answer Returned]
```


---

## 🧩 How It Works (Pipeline)

### **1. Upload / Input**
User uploads files, YouTube link, or website URL.

### **2. Extract**
- pdf-parse for PDFs  
- mammoth for DOCX  
- YouTube transcript extraction  
- Playwright web scraping  

### **3. Chunk & Embed**
- Text split into chunks  
- Embeddings generated  
- Stored in Qdrant  

### **4. Retrieve**
Semantic search fetches the most relevant chunks.

### **5. Generate**
Chunks + user question → Gemini → final answer.

---

## 🔌 API Endpoints

### ** Upload Document**
**POST** `/api/upload`
### ** YouTube Transcript**
**POST** `/api/yt-transcript`
### ** Crawl Website**
**POST** `/api/web-crawler`
### ** Q&A**
**POST** `/api/ask`

---

## 📁 Project Structure

```
devDoc/
├── client/ # Next.js frontend
│   ├── app/
│   ├── components/
|   |     ├── ui/
│   │     ├── chat-interface.jsx       
│   │     ├── file-upload.jsx  
│   │     └── progress-popup.tsx 
│ ├── utils/
│ └── package.json
│
└── server/ # Node.js backend
|   ├── controllers/
|   ├── routes/
|   ├── services/
|   │   │   ├── parseService.js      
|   │   │   ├── ragService.js        
|   │   │   └── resetService.js
|   ├── uploads/
|   └── package.json
└── README.md
```


---

## 🛠 Installation & Setup

### **1. Clone the Repo**
```bash
git clone https://github.com/Harshit-1264/devDoc
cd devDoc
```
### **2. Install Dependencies
Backend:
cd server
npm install

Frontend:
cd ../client
npm install

Environment Variables
server/.env
GOOGLE_API_KEY=your_key
QDRANT_URL=your_qdrant_url
QDRANT_API_KEY=your_qdrant_api_key
PORT=4000

client/.env.local
NEXT_PUBLIC_YOUTUBE_API_KEY=your_key
NEXT_PUBLIC_BASE_URL=http://localhost:4000

Run Project
Backend:
cd server
nodemon index.js

Frontend:
cd client
npm run dev


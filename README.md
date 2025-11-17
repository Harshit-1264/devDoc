# 📘 devDoc — AI-Powered Smart Document Search & Q&A

devDoc is an advanced full-stack GenAI application that allows users to upload documents (PDF, DOCX, TXT), process YouTube videos, crawl websites, and ask natural-language questions about the content.
The system uses RAG (Retrieval-Augmented Generation), Vector Databases, and Google Gemini 2.5 Flash to deliver fast, precise, context-aware answers.

The project blends modern full-stack development with AI-oriented architecture including Next.js, Node.js, Qdrant Cloud, and LangChain.js.

-----

# Why This Project?

Before RAG existed, the only way to provide context to an AI model was to send all the data with every prompt.
This approach fails when:

* The data is too large (MBs or GBs of text)
* You need fast responses
* You want cost-efficient AI calls
* You want scalable, reusable, query-specific data retrieval

If you sent all the data to the model every time, latency would explode and costs would skyrocket.

This is where Vector Databases and RAG come in.



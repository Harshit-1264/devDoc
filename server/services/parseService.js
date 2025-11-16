import { TextLoader } from "langchain/document_loaders/fs/text";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";

// Parses an uploaded file and extracts plain text from PDF, DOCX, or TXT files
export async function parseDoc(file){
    // Get file extension (e.g. "pdf", "docx", "txt")
    const ext = file.originalname.split('.').pop().toLowerCase();
    let loader;

    // Select the correct loader based on file type
    switch(ext){
        case 'pdf':
            loader = new PDFLoader(file.path);
            break; 
        case 'docx':
            loader = new DocxLoader(file.path);
            break;
        case 'txt':
            loader = new TextLoader(file.path);
            break;
        default:
            throw new Error(`Unsupported file type: ${ext}`);
    }

    // Load file content as LangChain Documents
    const docs = await loader.load();

    // Combine all page contents into one string
    return docs.map(doc => doc.pageContent).join('\n');
}
package com.example.Vault.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.client.advisor.vectorstore.QuestionAnswerAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.document.Document;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.apache.pdfbox.Loader;
import com.example.Vault.Beans.Documents;
import com.example.Vault.Data.DocumentsData;
import org.springframework.ai.vectorstore.SearchRequest;


@Component
public class AIService {
	@Autowired
	private OpenAiChatModel openaichatmodel;
	
	// Just to get the embeddings for the model. (Ex. HI = 1095)
	@Autowired
	private EmbeddingModel embeddingmodel;
	
	private ChatClient chatClient;
    
	@Autowired 
    private DocumentsData docdb;
	
	@Autowired
	private VectorStore vectorstore;
	
	// Constructor for  multiple models & chat Memory
	public AIService(ChatClient.Builder builder, ChatMemory chatMemory) {
		this.chatClient = builder.defaultAdvisors(MessageChatMemoryAdvisor.builder(chatMemory).build())
								 .build();
	}
	

	// Extra function just if you want to ask in general for OPEN AI
	public String askopenai(String query) {
		QuestionAnswerAdvisor advisor = QuestionAnswerAdvisor.builder(vectorstore)
         		 											 .build();
		return chatClient.prompt(query)
						.advisors(advisor)
						.call().content();
		
	}
	
	
	// Actual RAG implementation... 
    public String loadDocumentsFromDb(String query, String tenantId) {

        List<Document> aiDocuments = new ArrayList<>();

        List<Documents> dbFiles = docdb.findByTenantId(tenantId);

        for (Documents dbFile : dbFiles) {
            try {
                String extractedText;

                if ("application/pdf".equals(dbFile.getType())) {
                    try (PDDocument pdf = Loader.loadPDF(dbFile.getData())) {
                        extractedText = new PDFTextStripper().getText(pdf);
                    }
                } else {
                    extractedText = new String(dbFile.getData());
                }

                if (!extractedText.isBlank()) {
                    Document doc = new Document(
                        extractedText,
                        Map.of(
                            "file_name", dbFile.getName(),
                            "tenant_id", tenantId
                        )
                    );
                    aiDocuments.add(doc);
                }

            } catch (Exception e) {
                System.err.println("Failed to parse file: " + dbFile.getName());
            }
        }

        // Store Embeddings
        SearchRequest searchRequest = SearchRequest.builder()
                .query(query)
                .topK(5)
                .filterExpression("tenant_id == '" + tenantId + "'")
                .build();
        
        QuestionAnswerAdvisor advisor = QuestionAnswerAdvisor.builder(vectorstore)
        													 .searchRequest(searchRequest)
        													 .build();
        // Query via RAG
        return chatClient.prompt(query)
                .advisors(advisor)
                .call()
                .content();
    }

    
    // --- HELPER METHOD: Reads file -> Extracts Text -> Adds to Vector Store ---
    public void ingestFileIntoAi(Documents savedDoc) {
        try {
            String extractedText = "";

            // 1. Extract Text
            if ("application/pdf".equals(savedDoc.getType())) {
                // PDF Parsing (PDFBox 3.0 compatible)
                try (PDDocument pdf = Loader.loadPDF(savedDoc.getData())) {
                    PDFTextStripper stripper = new PDFTextStripper();
                    extractedText = stripper.getText(pdf);
                }
            } else {
                // Plain Text
                extractedText = new String(savedDoc.getData());
            }

            // 2. Index if text exists
            if (extractedText != null && !extractedText.isEmpty()) {
                // Create AI Document
                Document aiDoc = new Document(extractedText);
                
                // CRITICAL: Tag with Metadata for Filtering
                aiDoc.getMetadata().put("file_id", savedDoc.getId());
                aiDoc.getMetadata().put("file_name", savedDoc.getName());
                aiDoc.getMetadata().put("tenant_id", savedDoc.getTenantId());
                
                // Split into chunks and save
                TokenTextSplitter splitter = new TokenTextSplitter();
                List<Document> chunks = splitter.apply(List.of(aiDoc));
                
                vectorstore.add(chunks);
                
                System.out.println("AI Indexed file: " + savedDoc.getName());
            }
        } catch (Exception e) {
            System.err.println("Failed to index file for AI: " + e.getMessage());
        }
    }
	
}

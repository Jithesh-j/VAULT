package com.example.Vault.Data;

import java.util.List;
import java.util.Map;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.ai.document.Document;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.stereotype.Service;

import com.example.Vault.Beans.Documents;

@Service
public class DataInitializer {

    private final VectorStore vectorStore;

    public DataInitializer(VectorStore vectorStore) {
        this.vectorStore = vectorStore;
    }

    public void ingest(Documents dbFile, String tenantId) {

        try {
            String extractedText;

            if ("application/pdf".equals(dbFile.getType())) {
                try (PDDocument pdf = Loader.loadPDF(dbFile.getData())) {
                    extractedText = new PDFTextStripper().getText(pdf);
                }
            } else {
                extractedText = new String(dbFile.getData());
            }

            TokenTextSplitter splitter =
                    new TokenTextSplitter(300, 50, 300, 50, false);

            List<Document> chunks = splitter.split(
                List.of(new Document(
                    extractedText,
                    Map.of(
                        "tenant_id", tenantId,
                        "file_name", dbFile.getName()
                    )
                ))
            );

            // EMBED ONCE
            vectorStore.add(chunks);

        } catch (Exception e) {
            throw new RuntimeException("Failed to ingest document", e);
        }
    }
}

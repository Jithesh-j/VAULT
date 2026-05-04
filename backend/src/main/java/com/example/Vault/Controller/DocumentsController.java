package com.example.Vault.Controller;

import java.io.IOException;
import java.util.List;

// 1. Add imports for AI and PDF processing
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.Vault.Beans.Documents;
import com.example.Vault.Service.AIService;
import com.example.Vault.Service.DocumentsService;

@RestController
public class DocumentsController {
	
	@Autowired
	DocumentsService documentsservice;
	
	@Autowired
	AIService aiservice;
	
	@PostMapping("/uploaddocuments")
	@CrossOrigin
	@ResponseBody
	public Documents savedoc(@RequestParam("file") MultipartFile file,
							 @RequestParam("tenantId") String tenantId) {
			
        // A. Create Database Entity
        Documents doc = new Documents();
        doc.setName(file.getOriginalFilename());
        doc.setType(file.getContentType());
        doc.setSize(file.getSize());
        doc.setTenantId(tenantId);
        try {
            doc.setData(file.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
            return null; // Stop if file is bad
        }
        
        // B. Save to Database (SQL)
        Documents savedDoc = documentsservice.savedocuments(doc);
        
        // C. Save to AI (Vector Store) - IMMEDIATE INDEXING
        aiservice.ingestFileIntoAi(savedDoc);
        
        return savedDoc;
	}
	
	@GetMapping("/getdocuments/{tenantId}")
	@CrossOrigin
	@ResponseBody
	public List<Documents> display(@PathVariable String tenantId) {
		System.out.println("Tenant Id: "+ tenantId);
		return documentsservice.displaydocuments(tenantId);
	}
    

}
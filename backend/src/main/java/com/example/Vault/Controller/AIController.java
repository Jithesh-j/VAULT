package com.example.Vault.Controller;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;



import com.example.Vault.Service.AIService;

@RestController
public class AIController {
	
	
	@Autowired
	private AIService aiservice;

	
	// RAG
	@CrossOrigin
	@PostMapping("/openai/ask")
	public String getanswerrag(@RequestParam String query,@RequestParam String tenantId) {
		
		return aiservice.loadDocumentsFromDb(query,tenantId);
			
	}
	
}

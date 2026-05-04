package com.example.Vault.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.Vault.Beans.Documents;
import com.example.Vault.Data.DocumentsData;

@Component
public class DocumentsService {
	
	@Autowired
	DocumentsData documentsdb;
	
	public Documents savedocuments(Documents d){
		return  documentsdb.save(d);
		
	}
	
	public List<Documents> displaydocuments( String tenantId){
		
		return documentsdb.findByTenantId(tenantId);
		
	}

}

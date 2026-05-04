package com.example.Vault.Data;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Vault.Beans.Documents;

public interface DocumentsData extends JpaRepository<Documents, Long> {
	
	
	List<Documents> findByTenantId(String tenantId);

}

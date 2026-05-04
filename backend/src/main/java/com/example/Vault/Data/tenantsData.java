package com.example.Vault.Data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Vault.Beans.tenants;

@Repository
public interface tenantsData extends JpaRepository<tenants, String> {

}

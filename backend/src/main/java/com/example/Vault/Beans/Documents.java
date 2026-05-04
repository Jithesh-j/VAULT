package com.example.Vault.Beans;

import java.util.Arrays;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name="documents")

public class Documents {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

    private String name;       // "resume.pdf"
    private String type;       // "application/pdf"
    private long size;         // 1024 bytes
    
    // Security: Who owns this?
    private String tenantId; 

//    @Lob // Large Object (BLOB)
    @Column(columnDefinition = "bytea") // 'bytea' is Postgres specific for bytes
    private byte[] data; // The actual file content

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public long getSize() {
		return size;
	}

	public void setSize(long size) {
		this.size = size;
	}

	public String getTenantId() {
		return tenantId;
	}

	public void setTenantId(String tenantId) {
		this.tenantId = tenantId;
	}

	public byte[] getData() {
		return data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}

	@Override
	public String toString() {
		return "Documents [id=" + id + ", name=" + name + ", type=" + type + ", size=" + size + ", tenantId=" + tenantId
				+ ", data=" + Arrays.toString(data) + "]";
	}

	public Documents(Long id, String name, String type, long size, String tenantId, byte[] data) {
		super();
		this.id = id;
		this.name = name;
		this.type = type;
		this.size = size;
		this.tenantId = tenantId;
		this.data = data;
	}

	public Documents() {
		super();
		// TODO Auto-generated constructor stub
	}

}

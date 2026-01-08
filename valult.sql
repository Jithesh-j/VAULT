CREATE TABLE tenants (
    id TEXT PRIMARY KEY, 
    name TEXT NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,   
    password TEXT NOT NULL,       
    tenant_id TEXT NOT NULL REFERENCES tenants(id)
);

CREATE TABLE documents (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255),
    type VARCHAR(255),
    size BIGINT,
    tenant_id VARCHAR(255),
    data bytea
);

INSERT INTO tenants (id, name) VALUES ('NIKE', 'Nike Inc'), ('ADIDAS', 'Adidas AG');

INSERT INTO users (email, password, tenant_id) VALUES 
('alice@nike.com', '123456', 'NIKE'),
('bob@adidas.com', '654321', 'ADIDAS');

INSERT INTO tenants (id, name) VALUES ('SKETCHERS', 'SKERS Inc');


-- VECTOR EMBEDDINGS QUERIES ------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS vectorstore (
	id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
	content text,
	metadata json,
	embedding vector(1536) -- 1536 is the standard dimension for OpenAI models
);

CREATE INDEX ON vectorstore USING HNSW (embedding vector_cosine_ops);

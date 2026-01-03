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

INSERT INTO tenants (id, name) VALUES ('NIKE', 'Nike Inc'), ('ADIDAS', 'Adidas AG');

INSERT INTO users (email, password, tenant_id) VALUES 
('alice@nike.com', '123456', 'NIKE'),
('bob@adidas.com', '654321', 'ADIDAS');
## Proposed database

```

• Table ships (Les bateaux)

    • ship_id (INT, Clé primaire) 

    • imo_number (VARCHAR, Unique) 

    • name (VARCHAR) 

    • vessel_type (VARCHAR) 

    • length (FLOAT), width (FLOAT) 

    • created_at (TIMESTAMP), updated_at (TIMESTAMP)

• Table routes (Les trajets)

    • route_id (INT, Clé primaire)

    • ship_id (INT, Clé étrangère)

    • name (VARCHAR)

    • departure_port_code (VARCHAR)

    • arrival_port_code (VARCHAR)

    • planned_departure_ts (TIMESTAMP)

    • planned_arrival_ts (TIMESTAMP)

    • actual_departure_ts (TIMESTAMP)

    • actual_arrival_ts (TIMESTAMP)

    • route_constraints (JSONB)

    • created_at (TIMESTAMP)

    • Table users / organizations

    • user_id (INT, Clé primaire)

    • email (VARCHAR, Unique)

    • password_hash (VARCHAR)

    • organization_id (INT)

    • role (VARCHAR)

    • created_at (TIMESTAMP)

    • Table api_credentials 

    • service_name (VARCHAR, Clé primaire)

    • api_key (VARCHAR, ENCRYPTED)

    • other_details (JSONB)

```




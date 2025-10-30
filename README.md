This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Data base propose

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

    • arrival_port_code (VARCHAR) : Port d'arrivée (ex: "USNYC").

    • planned_departure_ts (TIMESTAMP) : Quand il est censé partir.

    • planned_arrival_ts (TIMESTAMP) : Quand il est censé arriver.

    • actual_departure_ts (TIMESTAMP) : Quand il est vraiment parti (si on sait).

    • actual_arrival_ts (TIMESTAMP) : Quand il est vraiment arrivé (si on sait).

    • route_constraints (JSONB) : C'est là qu'on met les trucs spéciaux ! (ex: { "max_wave_height": 5.0, "avoid_zones": [...] }).

    • created_at (TIMESTAMP) : Quand on a créé ce plan de route.

    • Table users / organizations (Pour l'accès en ligne)

    • user_id (INT, Clé primaire) : Numéro unique pour l'utilisateur.

    • email (VARCHAR, Unique) : Son e-mail pour se connecter.

    • password_hash (VARCHAR) : Son mot de passe, mais bien crypté !

    • organization_id (INT) : De quelle boîte il fait partie ?

    • role (VARCHAR) : C'est un chef ou juste un invité ? (ex: "admin", "viewer").

    • created_at (TIMESTAMP) : Quand il s'est inscrit.

    • (Et bien sûr, d'autres tables pour gérer les boîtes, les permissions, etc.)

    • Table api_credentials (Les clés secrètes)

    • service_name (VARCHAR, Clé primaire) : C'est la clé de qui ? (ex: "GoodWeather", "AISProviderX").

    • api_key (VARCHAR, ENCRYPTED)

    • other_details (JSONB)

```




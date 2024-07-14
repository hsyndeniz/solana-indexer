# Solana Indexer

This is a Solana Indexer that listens to the Solana blockchain and indexes all the transactions and accounts. It is built using Solana's Geyser Plugin, Node.js, Kafka, and Postgres. Geyser is a Solana program that listens to the Solana blockchain and emits events for every transaction and account change. The Solana Indexer listens to these events and indexes them in a Postgres database.

<img width="975" alt="Screenshot 2024-07-14 at 21 22 11" src="https://github.com/user-attachments/assets/93bcbe23-2cab-48a8-a881-99a14f09dbf2">
<img width="1440" alt="Screenshot 2024-07-14 at 22 16 57" src="https://github.com/user-attachments/assets/61f2bff7-b5a8-49b6-8224-a64fa212d2bf">
<img width="1440" alt="Screenshot 2024-07-14 at 22 34 32" src="https://github.com/user-attachments/assets/64ab9789-ac3c-4225-b9e8-277b809e6c4b">
<img width="1440" alt="Screenshot 2024-07-14 at 22 35 50" src="https://github.com/user-attachments/assets/11499835-f57a-4c99-9da6-7f4e04489d1e">


## Installation

1. Clone the repository

2. Go to backend folder, and copy `env-example-relational` as `.env`.

   ```bash
   cd backend/
   cp env-example-relational .env
   ```

3. Change `DATABASE_HOST=postgres` to `DATABASE_HOST=localhost`

   Change `MAIL_HOST=maildev` to `MAIL_HOST=localhost`

4. Run additional container:

   ```bash
   docker compose up -d postgres adminer maildev
   ```

5. Install dependency

   ```bash
   npm install
   ```

6. Run app configuration

   > You should run this command only the first time on initialization of your project, all next time skip it.

   > If you want to contribute to the boilerplate, you should NOT run this command.

   ```bash
   npm run app:config
   ```

7. Run migrations

   ```bash
   npm run migration:run
   ```

8. Run seeds

   ```bash
   npm run seed:run:relational
   ```

9. Run app in dev mode

   ```bash
   npm run start:dev
   ```

10. Open <http://localhost:3000>


# Run Solana Validator with Geyser Plugin

1. Install Solana CLI.

2. Go to the yellowstone-grpc folder and run the Solana validator with Geyser Plugin.
   ```bash
   cd yellowstone-grpc
   solana-test-validator --geyser-plugin-config ./yellowstone-grpc-geyser/config.json
   ```

3. Run Kafka Service
  ```bash
  cargo run --bin grpc-kafka -- --config yellowstone-grpc-tools/config-kafka.json grpc2kafka
  ```


# Run Frontend
1. Install dependencies

   ```bash
   cd frontend
   npm install
   ```

2. Copy example environment file

   ```bash
   cp example.env.local .env.local
   ```

3. Run development server

   ```bash
   npm run dev
   ```

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
   docker compose up -d
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

## Roadmap

### Core Indexing Features:
- [X] Index transaction data
- [X] Index account updates and block data
- [ ] Index NFT data, including metadata and ownership changes
- [ ] Index token data, including minting, transfers, and detailed token balances
- [ ] Implement multi-chain indexing support (e.g., Ethereum, Binance Smart Chain) for cross-chain data aggregation

### Custom Webhooks and Notifications:
- [ ] Enable custom webhooks for tracking specific accounts, transactions, and events
- [ ] Provide real-time notifications via email, SMS, and Discord integrations
- [ ] Create a marketplace for pre-configured webhooks that users can easily adopt

### Advanced Data Querying and Analytics:
- [ ] Introduce advanced query features with filtering, searching, and complex queries
- [ ] Develop a GraphQL API for more flexible data access and integration with other tools
- [ ] Implement visual analytics dashboards for real-time data insights (e.g., transaction heatmaps, account activity charts)
- [ ] Build predictive analytics features using machine learning to forecast on-chain activity trends

### Performance and Scalability:
- [ ] Conduct performance optimizations for handling high-throughput and large-scale data
- [ ] Implement data partitioning and sharding for more efficient data management
- [ ] Introduce real-time data streaming support for low-latency applications
- [ ] Add caching layers for frequently queried data to improve response times

### Developer and User Experience:
- [ ] Create a comprehensive API documentation and SDKs in multiple languages (e.g., Python, TypeScript, Rust)
- [ ] Build a developer portal with interactive API playgrounds and tutorials
- [ ] Implement a user-friendly interface for managing and customizing indexing configurations
- [ ] Develop integration plugins for popular development environments (e.g., Visual Studio Code, JetBrains)

### Ecosystem Integrations and Expansions:
- [ ] Integrate with major DeFi protocols to provide real-time financial data (e.g., liquidity pools, staking rewards)
- [ ] Support indexing for decentralized identity and reputation systems (e.g., Solana Name Service)
- [ ] Develop partnerships with other Solana tools and services to enhance ecosystem interoperability
- [ ] Implement data export features to popular analytics platforms (e.g., Flipside Crypto, Dune Analytics)

### Security and Reliability:
- [ ] Introduce real-time anomaly detection and alerting for suspicious on-chain activities
- [ ] Implement data encryption and access control for secure data management
- [ ] Build redundancy and failover mechanisms to ensure high availability
- [ ] Conduct regular security audits and vulnerability assessments

### Community and Open-Source Contributions:
- [ ] Launch a bug bounty program to encourage community security testing
- [ ] Host hackathons and bounty programs to drive feature development and community engagement
- [ ] Create a public roadmap and voting system for prioritizing new features
- [ ] Foster a strong open-source community by offering mentorship and support for contributors

### Future Innovations:
- [ ] Build cross-chain bridges to allow data sharing between Solana and other blockchains
- [ ] Develop decentralized indexing nodes to distribute the load and improve network resilience
- [ ] Implement privacy-preserving indexing techniques for sensitive data
- [ ] Explore opportunities to integrate with Web3 social platforms for community-driven analytics

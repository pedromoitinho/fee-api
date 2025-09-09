# Fee Calculator API

A TypeScript/Express.js API for calculating fees based on time periods, with Swagger documentation.

## Features

- Calculate fees for daily or monthly periods
- RESTful API with comprehensive error handling
- Swagger/OpenAPI documentation
- TypeScript for type safety
- Ready for deployment on Render

## API Endpoints

- `GET /` - Health check endpoint
- `GET /api/` - API health check
- `POST /api/feeCalc` - Calculate fees based on parameters
- `GET /api-docs` - Swagger UI documentation

## Local Development

### Prerequisites

- Node.js >= 18.0.0
- npm (included with Node.js)

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run in development mode:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Start production server:
   ```bash
   npm start
   ```

The server will run on `http://localhost:3000` by default.

## Fee Calculation API Usage

### Endpoint: `POST /api/feeCalc`

Calculate fees based on time period and amount.

#### Query Parameters:

- `days` (integer, optional): Number of days (use when `isMonthly=false`)
- `months` (integer, optional): Number of months (use when `isMonthly=true`)
- `isMonthly` (boolean, required): Whether to calculate monthly fees
- `fees` (number, required): Fee percentage
- `money` (number, required): Base amount to calculate fees on

#### Example Requests:

**Daily calculation:**
```bash
curl -X POST "http://localhost:3000/api/feeCalc?days=10&isMonthly=false&fees=2.5&money=1000"
```

**Monthly calculation:**
```bash
curl -X POST "http://localhost:3000/api/feeCalc?months=3&isMonthly=true&fees=5&money=2000"
```

#### Response:
```json
"250$ in 10 days"
```

## Project Structure

```
├── src/
│   ├── index.ts           # Main application entry point
│   ├── api/
│   │   └── api.ts         # API routes and documentation
│   └── functions/
│       └── feeCalculator.ts # Core calculation logic
├── dist/                  # Compiled JavaScript (generated)
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── render.yaml            # Render deployment configuration
└── README.md              # This file
```

## Development Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm run postinstall` - Automatically runs build after install

## Dependencies

### Production
- `express` - Web framework
- `swagger-jsdoc` - Generate Swagger specs from JSDoc
- `swagger-ui-express` - Serve Swagger UI
- `prompt-sync` - Console input utility

### Development
- `typescript` - TypeScript compiler
- `@types/*` - Type definitions
- `ts-node` - TypeScript execution for development
- `nodemon` - Development server with auto-restart

## License

MIT License

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
- pnpm (recommended) or npm

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run in development mode:
   ```bash
   pnpm run dev
   ```

4. Build for production:
   ```bash
   pnpm run build
   ```

5. Start production server:
   ```bash
   pnpm start
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

## Deployment on Render

### Prerequisites

1. A GitHub account with your repository
2. A Render account (free tier available)

### Deployment Steps

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

2. **Deploy on Render:**
   
   **Option A: Using render.yaml (Recommended)**
   - The project includes a `render.yaml` file for automatic deployment
   - Connect your GitHub repository to Render
   - Render will automatically detect and use the configuration

   **Option B: Manual Setup**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Configure the service:
     - **Build Command:** `npm install && npm run build`
     - **Start Command:** `npm start`
     - **Environment:** Node
     - **Plan:** Free (or your preferred plan)

3. **Environment Variables:**
   - Set `NODE_ENV=production` in your Render service settings
   - The `PORT` environment variable is automatically provided by Render

4. **Update Swagger URL:**
   - After deployment, update the server URL in the Swagger configuration
   - Replace `your-app-name` in `src/index.ts` with your actual Render app name

### Post-Deployment

- Your API will be available at: `https://your-app-name.onrender.com`
- Swagger docs will be available at: `https://your-app-name.onrender.com/api-docs`
- Test the API using the provided endpoints

### Important Notes

- Free tier services on Render may sleep after 15 minutes of inactivity
- First request after sleeping may take 30+ seconds to respond
- For production applications, consider upgrading to a paid plan

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

- `pnpm run dev` - Start development server with hot reload
- `pnpm run build` - Compile TypeScript to JavaScript
- `pnpm start` - Start production server
- `pnpm run postinstall` - Automatically runs build after install

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
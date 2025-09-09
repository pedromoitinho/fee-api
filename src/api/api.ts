// API TO CALCULATE FEES
import express from "express";
import { calculateFee } from "../functions/feeCalculator.js";

const api = express.Router();
api.use(express.json());

let days: number, months: number, isMonthly: boolean, fees: number, money:number;
const errorMsg = (res: express.Response) => res.status(400).json({message: "Error"});

/**
 * @swagger
 * /api/feeCalc:
 *   post:
 *     summary: Calculate fees based on time period
 *     description: Calculates total fees for a given amount over days or months
 *     parameters:
 *       - in: query
 *         name: days
 *         schema:
 *           type: integer
 *         description: Number of days (leave null if isMonthly == true)
 *       - in: query
 *         name: months
 *         schema:
 *           type: integer
 *         description: Number of months (leave null if isMonthly == true)
 *       - in: query
 *         name: isMonthly
 *         schema:
 *           type: boolean
 *         description: Whether to calculate monthly fees
 *       - in: query
 *         name: fees
 *         schema:
 *           type: number
 *           format: float
 *         description: Fee percentage
 *       - in: query
 *         name: money
 *         schema:
 *           type: number
 *           format: float
 *         description: Base amount to calculate fees on
 *     responses:
 *       200:
 *         description: Successful calculation
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "50$ in 10 days"
 *       400:
 *         description: Invalid input parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error"
 */
api.post("/feeCalc", async (req,res) =>{
	const {days: daysStr, months: monthsStr, isMonthly: isMonthlyStr, fees: feesStr, money: moneyStr} = req.query;

	days = parseInt(daysStr as string, 10);
	months = parseInt(monthsStr as string, 10);
	fees = parseFloat(feesStr as string);
	money = parseFloat(moneyStr as string);
	isMonthly = isMonthlyStr === 'true';

	// Validate required parameters
	if (isNaN(fees) || isNaN(money)) {
		return res.status(400).json({message: "Invalid fees or money parameter"});
	}

	// Logical Input Verifications
	if(!days && !months){
		return res.status(400).json({message: "Either days or months must be provided"});
	}
	if(isMonthly == true && days){
		return res.status(400).json({message: "Cannot specify days when isMonthly is true"});
	}
	else if(!isMonthly && months){
		return res.status(400).json({message: "Cannot specify months when isMonthly is false"});
	}

	// Validate the time parameter based on isMonthly
	if (isMonthly && isNaN(months)) {
		return res.status(400).json({message: "Invalid months parameter"});
	}
	if (!isMonthly && isNaN(days)) {
		return res.status(400).json({message: "Invalid days parameter"});
	}

	const total = calculateFee(days, months, isMonthly, fees, money);

	res.status(200).json(total + "$" +  " in " + (!isMonthly ? days : months) + " " + (!isMonthly ? "days" : "months"));
});


api.get("/", (req, res) => {
	res.send("Working Normally");
});

export default api;
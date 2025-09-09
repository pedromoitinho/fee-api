let days: number, months: number, isMonthly: boolean, fees: number, money:number;

export function calculateFee(days: number, months: number, isMonthly: boolean, fees: number, money:number): number{
	let total: number = 0.0;
	if(isMonthly == true){
		total = money * (fees / 100) * months;
	}
	else{
		total = money * (fees / 100) * days;
	}
	return total;
};
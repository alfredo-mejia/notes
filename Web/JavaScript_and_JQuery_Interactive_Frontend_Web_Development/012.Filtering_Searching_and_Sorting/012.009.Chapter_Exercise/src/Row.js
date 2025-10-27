import {isEmptyString} from "./utils.js";

class Row {
    #recordDate;
    #securityTypeDesc;
    #securityDesc;
    #avgInterestRateAmt;
    #srcLineNbr;
    #recordFiscalYear;
    #recordFiscalQuarter;
    #recordCalendarYear;
    #recordCalendarQuarter;
    #recordCalendarMonth;
    #recordCalendarDay;

    constructor(recordDate, securityTypeDesc, securityDesc, avgInterestRateAmt,
                srcLineNbr, recordFiscalYear, recordFiscalQuarter, recordCalendarYear,
                recordCalendarQuarter, recordCalendarMonth, recordCalendarDay){
        if (isEmptyString(recordDate) || isEmptyString(securityTypeDesc) || isEmptyString(securityDesc) ||
            isEmptyString(avgInterestRateAmt) || isEmptyString(srcLineNbr) || isEmptyString(recordFiscalYear) ||
            isEmptyString(recordFiscalQuarter) || isEmptyString(recordCalendarYear) || isEmptyString(recordCalendarQuarter) ||
            isEmptyString(recordCalendarMonth) || isEmptyString(recordCalendarDay)) {
            throw new Error("Invalid arguments. All arguments must be non-empty strings.");
        }

        this.#recordDate = recordDate;
        this.#securityTypeDesc = securityTypeDesc;
        this.#securityDesc = securityDesc;
        this.#avgInterestRateAmt = avgInterestRateAmt;
        this.#srcLineNbr = srcLineNbr;
        this.#recordFiscalYear = recordFiscalYear;
        this.#recordFiscalQuarter = recordFiscalQuarter;
        this.#recordCalendarYear = recordCalendarYear;
        this.#recordCalendarQuarter = recordCalendarQuarter;
        this.#recordCalendarMonth = recordCalendarMonth;
        this.#recordCalendarDay = recordCalendarDay;
    }

    getRecordDate(){
        return this.#recordDate;
    }

    getSecurityTypeDesc(){
        return this.#securityTypeDesc;
    }

    getSecurityDesc(){
        return this.#securityDesc;
    }

    getAvgInterestRateAmt(){
        return this.#avgInterestRateAmt;
    }

    getSrcLineNbr(){
        return this.#srcLineNbr;
    }

    getRecordFiscalYear(){
        return this.#recordFiscalYear;
    }

    getRecordFiscalQuarter(){
        return this.#recordFiscalQuarter;
    }

    getRecordCalendarYear(){
        return this.#recordCalendarYear;
    }

    getRecordCalendarQuarter(){
        return this.#recordCalendarQuarter;
    }

    getRecordCalendarMonth(){
        return this.#recordCalendarMonth;
    }

    getRecordCalendarDay() {
        return this.#recordCalendarDay;
    }

    toString() {
        return `Record Date: ${this.#recordDate}\nSecurity Type Desc: ${this.#securityTypeDesc}\nSecurity Desc: ${this.#securityDesc}\nAvg Interest Rate Amt: ${this.#avgInterestRateAmt}\nSrc Line Nbr: ${this.#srcLineNbr}\nRecord Fiscal Year: ${this.#recordFiscalYear}\nRecord Fiscal Quarter: ${this.#recordFiscalQuarter}\nRecord Calendar Year: ${this.#recordCalendarYear}\nRecord Calendar Quarter: ${this.#recordCalendarQuarter}\nRecord Calendar Month: ${this.#recordCalendarMonth}\nRecord Calendar Day: ${this.#recordCalendarDay}`;
    }
}

export default Row;
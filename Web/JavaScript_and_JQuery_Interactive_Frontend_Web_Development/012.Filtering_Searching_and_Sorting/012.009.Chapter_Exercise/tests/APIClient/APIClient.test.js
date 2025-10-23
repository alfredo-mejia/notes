import APIClient from "../../src/APIClient.js";
import test from "node:test";
import assert from "node:assert";
import FieldRegistry from "../../src/FieldRegistry.js";

test("APIClient Constructor", () => {
    assert.doesNotThrow(() => {
        new APIClient();
    }, Error, "APIClient must not fail if no arguments are provided");

    assert.doesNotThrow(() => {
        new APIClient(true);
        new APIClient(false);
    }, Error, "APIClient must not fail if boolean arguments are provided");
})

test("APIClient fetchData() Method Only", () => {
    let api = new APIClient();
    let url = api.getURL();

    const params = new URLSearchParams();
    params.append("format", "json");
    params.append("page[size]", "50");
    params.append("page[number]", "1");
    let myURL = "https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/avg_interest_rates" +
                        "?" + params.toString();

    assert.strictEqual(url,myURL);

    api.fetchData()
        .then(data => {
            const myData = {
                "data": [
                    {
                        "record_date": "2001-01-31",
                        "security_type_desc": "Marketable",
                        "security_desc": "Treasury Notes",
                        "avg_interest_rate_amt": "6.096",
                        "src_line_nbr": "2",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "01",
                        "record_calendar_day": "31"
                    },
                    {
                        "record_date": "2001-01-31",
                        "security_type_desc": "Marketable",
                        "security_desc": "Treasury Bonds",
                        "avg_interest_rate_amt": "8.450",
                        "src_line_nbr": "3",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "01",
                        "record_calendar_day": "31"
                    },
                    {
                        "record_date": "2001-01-31",
                        "security_type_desc": "Marketable",
                        "security_desc": "Treasury Inflation-Indexed Notes",
                        "avg_interest_rate_amt": "3.772",
                        "src_line_nbr": "4",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "01",
                        "record_calendar_day": "31"
                    },
                    {
                        "record_date": "2001-01-31",
                        "security_type_desc": "Marketable",
                        "security_desc": "Treasury Inflation-Indexed Bonds",
                        "avg_interest_rate_amt": "3.866",
                        "src_line_nbr": "5",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "01",
                        "record_calendar_day": "31"
                    },
                    {
                        "record_date": "2001-01-31",
                        "security_type_desc": "Marketable",
                        "security_desc": "Federal Financing Bank",
                        "avg_interest_rate_amt": "8.917",
                        "src_line_nbr": "6",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "01",
                        "record_calendar_day": "31"
                    },
                    {
                        "record_date": "2001-01-31",
                        "security_type_desc": "Marketable",
                        "security_desc": "Total Marketable",
                        "avg_interest_rate_amt": "6.620",
                        "src_line_nbr": "7",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "01",
                        "record_calendar_day": "31"
                    },
                    {
                        "record_date": "2001-01-31",
                        "security_type_desc": "Non-marketable",
                        "security_desc": "Domestic Series",
                        "avg_interest_rate_amt": "7.934",
                        "src_line_nbr": "8",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "01",
                        "record_calendar_day": "31"
                    },
                    {
                        "record_date": "2001-01-31",
                        "security_type_desc": "Non-marketable",
                        "security_desc": "Foreign Series",
                        "avg_interest_rate_amt": "7.196",
                        "src_line_nbr": "9",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "01",
                        "record_calendar_day": "31"
                    },
                    {
                        "record_date": "2001-01-31",
                        "security_type_desc": "Non-marketable",
                        "security_desc": "R.E.A. Series",
                        "avg_interest_rate_amt": "5.000",
                        "src_line_nbr": "10",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "01",
                        "record_calendar_day": "31"
                    },
                    {
                        "record_date": "2001-01-31",
                        "security_type_desc": "Non-marketable",
                        "security_desc": "State and Local Government Series",
                        "avg_interest_rate_amt": "5.576",
                        "src_line_nbr": "11",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "01",
                        "record_calendar_day": "31"
                    },
                    {
                        "record_date": "2001-01-31",
                        "security_type_desc": "Non-marketable",
                        "security_desc": "United States Savings Securities",
                        "avg_interest_rate_amt": "6.224",
                        "src_line_nbr": "12",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "01",
                        "record_calendar_day": "31"
                    },
                    {
                        "record_date": "2001-01-31",
                        "security_type_desc": "Non-marketable",
                        "security_desc": "Government Account Series",
                        "avg_interest_rate_amt": "6.650",
                        "src_line_nbr": "13",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "01",
                        "record_calendar_day": "31"
                    },
                    {
                        "record_date": "2001-01-31",
                        "security_type_desc": "Non-marketable",
                        "security_desc": "Total Non-marketable",
                        "avg_interest_rate_amt": "6.567",
                        "src_line_nbr": "14",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "01",
                        "record_calendar_day": "31"
                    },
                    {
                        "record_date": "2001-01-31",
                        "security_type_desc": "Interest-bearing Debt",
                        "security_desc": "Total Interest-bearing Debt",
                        "avg_interest_rate_amt": "6.594",
                        "src_line_nbr": "15",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "01",
                        "record_calendar_day": "31"
                    },
                    {
                        "record_date": "2001-01-31",
                        "security_type_desc": "Marketable",
                        "security_desc": "Treasury Bills",
                        "avg_interest_rate_amt": "6.059",
                        "src_line_nbr": "1",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "01",
                        "record_calendar_day": "31"
                    },
                    {
                        "record_date": "2001-02-28",
                        "security_type_desc": "Marketable",
                        "security_desc": "Treasury Bills",
                        "avg_interest_rate_amt": "5.755",
                        "src_line_nbr": "1",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "02",
                        "record_calendar_day": "28"
                    },
                    {
                        "record_date": "2001-02-28",
                        "security_type_desc": "Marketable",
                        "security_desc": "Treasury Notes",
                        "avg_interest_rate_amt": "6.076",
                        "src_line_nbr": "2",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "02",
                        "record_calendar_day": "28"
                    },
                    {
                        "record_date": "2001-02-28",
                        "security_type_desc": "Marketable",
                        "security_desc": "Treasury Bonds",
                        "avg_interest_rate_amt": "8.389",
                        "src_line_nbr": "3",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "02",
                        "record_calendar_day": "28"
                    },
                    {
                        "record_date": "2001-02-28",
                        "security_type_desc": "Marketable",
                        "security_desc": "Treasury Inflation-Indexed Notes",
                        "avg_interest_rate_amt": "3.772",
                        "src_line_nbr": "4",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "02",
                        "record_calendar_day": "28"
                    },
                    {
                        "record_date": "2001-02-28",
                        "security_type_desc": "Marketable",
                        "security_desc": "Treasury Inflation-Indexed Bonds",
                        "avg_interest_rate_amt": "3.866",
                        "src_line_nbr": "5",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "02",
                        "record_calendar_day": "28"
                    },
                    {
                        "record_date": "2001-02-28",
                        "security_type_desc": "Marketable",
                        "security_desc": "Federal Financing Bank",
                        "avg_interest_rate_amt": "8.917",
                        "src_line_nbr": "6",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "02",
                        "record_calendar_day": "28"
                    },
                    {
                        "record_date": "2001-02-28",
                        "security_type_desc": "Marketable",
                        "security_desc": "Total Marketable",
                        "avg_interest_rate_amt": "6.528",
                        "src_line_nbr": "7",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "02",
                        "record_calendar_day": "28"
                    },
                    {
                        "record_date": "2001-02-28",
                        "security_type_desc": "Non-marketable",
                        "security_desc": "Domestic Series",
                        "avg_interest_rate_amt": "7.934",
                        "src_line_nbr": "8",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "02",
                        "record_calendar_day": "28"
                    },
                    {
                        "record_date": "2001-02-28",
                        "security_type_desc": "Non-marketable",
                        "security_desc": "Foreign Series",
                        "avg_interest_rate_amt": "7.165",
                        "src_line_nbr": "9",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "02",
                        "record_calendar_day": "28"
                    },
                    {
                        "record_date": "2001-02-28",
                        "security_type_desc": "Non-marketable",
                        "security_desc": "R.E.A. Series",
                        "avg_interest_rate_amt": "5.000",
                        "src_line_nbr": "10",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "02",
                        "record_calendar_day": "28"
                    },
                    {
                        "record_date": "2001-02-28",
                        "security_type_desc": "Non-marketable",
                        "security_desc": "State and Local Government Series",
                        "avg_interest_rate_amt": "5.531",
                        "src_line_nbr": "11",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "02",
                        "record_calendar_day": "28"
                    },
                    {
                        "record_date": "2001-02-28",
                        "security_type_desc": "Non-marketable",
                        "security_desc": "United States Savings Securities",
                        "avg_interest_rate_amt": "6.217",
                        "src_line_nbr": "12",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "02",
                        "record_calendar_day": "28"
                    },
                    {
                        "record_date": "2001-02-28",
                        "security_type_desc": "Non-marketable",
                        "security_desc": "Government Account Series",
                        "avg_interest_rate_amt": "6.572",
                        "src_line_nbr": "13",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "02",
                        "record_calendar_day": "28"
                    },
                    {
                        "record_date": "2001-02-28",
                        "security_type_desc": "Non-marketable",
                        "security_desc": "Total Non-marketable",
                        "avg_interest_rate_amt": "6.495",
                        "src_line_nbr": "14",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "02",
                        "record_calendar_day": "28"
                    },
                    {
                        "record_date": "2001-02-28",
                        "security_type_desc": "Interest-bearing Debt",
                        "security_desc": "Total Interest-bearing Debt",
                        "avg_interest_rate_amt": "6.512",
                        "src_line_nbr": "15",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "02",
                        "record_calendar_day": "28"
                    },
                    {
                        "record_date": "2001-03-31",
                        "security_type_desc": "Non-marketable",
                        "security_desc": "Total Non-marketable",
                        "avg_interest_rate_amt": "6.508",
                        "src_line_nbr": "15",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "03",
                        "record_calendar_day": "31"
                    },
                    {
                        "record_date": "2001-03-31",
                        "security_type_desc": "Interest-bearing Debt",
                        "security_desc": "Total Interest-bearing Debt",
                        "avg_interest_rate_amt": "6.470",
                        "src_line_nbr": "16",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "03",
                        "record_calendar_day": "31"
                    },
                    {
                        "record_date": "2001-03-31",
                        "security_type_desc": "Marketable",
                        "security_desc": "Treasury Bills",
                        "avg_interest_rate_amt": "5.369",
                        "src_line_nbr": "1",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "03",
                        "record_calendar_day": "31"
                    },
                    {
                        "record_date": "2001-03-31",
                        "security_type_desc": "Marketable",
                        "security_desc": "Treasury Notes",
                        "avg_interest_rate_amt": "6.088",
                        "src_line_nbr": "2",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "03",
                        "record_calendar_day": "31"
                    },
                    {
                        "record_date": "2001-03-31",
                        "security_type_desc": "Marketable",
                        "security_desc": "Treasury Bonds",
                        "avg_interest_rate_amt": "8.392",
                        "src_line_nbr": "3",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "03",
                        "record_calendar_day": "31"
                    },
                    {
                        "record_date": "2001-03-31",
                        "security_type_desc": "Marketable",
                        "security_desc": "Treasury Inflation-Indexed Notes",
                        "avg_interest_rate_amt": "3.772",
                        "src_line_nbr": "4",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "03",
                        "record_calendar_day": "31"
                    },
                    {
                        "record_date": "2001-03-31",
                        "security_type_desc": "Marketable",
                        "security_desc": "Treasury Inflation-Indexed Bonds",
                        "avg_interest_rate_amt": "3.866",
                        "src_line_nbr": "5",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "03",
                        "record_calendar_day": "31"
                    },
                    {
                        "record_date": "2001-03-31",
                        "security_type_desc": "Marketable",
                        "security_desc": "Federal Financing Bank",
                        "avg_interest_rate_amt": "8.917",
                        "src_line_nbr": "6",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "03",
                        "record_calendar_day": "31"
                    },
                    {
                        "record_date": "2001-03-31",
                        "security_type_desc": "Marketable",
                        "security_desc": "Total Marketable",
                        "avg_interest_rate_amt": "6.435",
                        "src_line_nbr": "7",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "03",
                        "record_calendar_day": "31"
                    },
                    {
                        "record_date": "2001-03-31",
                        "security_type_desc": "Non-marketable",
                        "security_desc": "Domestic Series",
                        "avg_interest_rate_amt": "7.934",
                        "src_line_nbr": "8",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "03",
                        "record_calendar_day": "31"
                    },
                    {
                        "record_date": "2001-03-31",
                        "security_type_desc": "Non-marketable",
                        "security_desc": "Foreign Series",
                        "avg_interest_rate_amt": "7.197",
                        "src_line_nbr": "9",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "03",
                        "record_calendar_day": "31"
                    },
                    {
                        "record_date": "2001-03-31",
                        "security_type_desc": "Non-marketable",
                        "security_desc": "R.E.A. Series",
                        "avg_interest_rate_amt": "5.000",
                        "src_line_nbr": "10",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "03",
                        "record_calendar_day": "31"
                    },
                    {
                        "record_date": "2001-03-31",
                        "security_type_desc": "Non-marketable",
                        "security_desc": "State and Local Government Series",
                        "avg_interest_rate_amt": "5.503",
                        "src_line_nbr": "11",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "03",
                        "record_calendar_day": "31"
                    },
                    {
                        "record_date": "2001-03-31",
                        "security_type_desc": "Non-marketable",
                        "security_desc": "United States Savings Securities",
                        "avg_interest_rate_amt": "6.264",
                        "src_line_nbr": "12",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "03",
                        "record_calendar_day": "31"
                    },
                    {
                        "record_date": "2001-03-31",
                        "security_type_desc": "Non-marketable",
                        "security_desc": "United States Savings Inflation Securities",
                        "avg_interest_rate_amt": "3.464",
                        "src_line_nbr": "13",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "03",
                        "record_calendar_day": "31"
                    },
                    {
                        "record_date": "2001-03-31",
                        "security_type_desc": "Non-marketable",
                        "security_desc": "Government Account Series",
                        "avg_interest_rate_amt": "6.588",
                        "src_line_nbr": "14",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "2",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "1",
                        "record_calendar_month": "03",
                        "record_calendar_day": "31"
                    },
                    {
                        "record_date": "2001-04-30",
                        "security_type_desc": "Marketable",
                        "security_desc": "Treasury Bills",
                        "avg_interest_rate_amt": "5.076",
                        "src_line_nbr": "1",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "3",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "2",
                        "record_calendar_month": "04",
                        "record_calendar_day": "30"
                    },
                    {
                        "record_date": "2001-04-30",
                        "security_type_desc": "Marketable",
                        "security_desc": "Treasury Notes",
                        "avg_interest_rate_amt": "6.066",
                        "src_line_nbr": "2",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "3",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "2",
                        "record_calendar_month": "04",
                        "record_calendar_day": "30"
                    },
                    {
                        "record_date": "2001-04-30",
                        "security_type_desc": "Marketable",
                        "security_desc": "Treasury Bonds",
                        "avg_interest_rate_amt": "8.382",
                        "src_line_nbr": "3",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "3",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "2",
                        "record_calendar_month": "04",
                        "record_calendar_day": "30"
                    },
                    {
                        "record_date": "2001-04-30",
                        "security_type_desc": "Marketable",
                        "security_desc": "Treasury Inflation-Indexed Notes",
                        "avg_interest_rate_amt": "3.772",
                        "src_line_nbr": "4",
                        "record_fiscal_year": "2001",
                        "record_fiscal_quarter": "3",
                        "record_calendar_year": "2001",
                        "record_calendar_quarter": "2",
                        "record_calendar_month": "04",
                        "record_calendar_day": "30"
                    }
                ],
                "meta": {
                    "count": 50,
                    "labels": {
                        "record_date": "Record Date",
                        "security_type_desc": "Security Type Description",
                        "security_desc": "Security Description",
                        "avg_interest_rate_amt": "Average Interest Rate Amount",
                        "src_line_nbr": "Source Line Number",
                        "record_fiscal_year": "Fiscal Year",
                        "record_fiscal_quarter": "Fiscal Quarter Number",
                        "record_calendar_year": "Calendar Year",
                        "record_calendar_quarter": "Calendar Quarter Number",
                        "record_calendar_month": "Calendar Month Number",
                        "record_calendar_day": "Calendar Day Number"
                    },
                    "dataTypes": {
                        "record_date": "DATE",
                        "security_type_desc": "STRING",
                        "security_desc": "STRING",
                        "avg_interest_rate_amt": "PERCENTAGE",
                        "src_line_nbr": "INTEGER",
                        "record_fiscal_year": "YEAR",
                        "record_fiscal_quarter": "QUARTER",
                        "record_calendar_year": "YEAR",
                        "record_calendar_quarter": "QUARTER",
                        "record_calendar_month": "MONTH",
                        "record_calendar_day": "DAY"
                    },
                    "dataFormats": {
                        "record_date": "YYYY-MM-DD",
                        "security_type_desc": "String",
                        "security_desc": "String",
                        "avg_interest_rate_amt": "10.2%",
                        "src_line_nbr": "10",
                        "record_fiscal_year": "YYYY",
                        "record_fiscal_quarter": "Q",
                        "record_calendar_year": "YYYY",
                        "record_calendar_quarter": "Q",
                        "record_calendar_month": "MM",
                        "record_calendar_day": "DD"
                    },
                    "total-count": 4827,
                    "total-pages": 97
                },
                "links": {
                    "self": "&page%5Bnumber%5D=1&page%5Bsize%5D=50",
                    "first": "&page%5Bnumber%5D=1&page%5Bsize%5D=50",
                    "prev": null,
                    "next": "&page%5Bnumber%5D=2&page%5Bsize%5D=50",
                    "last": "&page%5Bnumber%5D=97&page%5Bsize%5D=50"
                }
            };

            const dataString = JSON.stringify(data);
            const myDataString = JSON.stringify(myData);

            assert.strictEqual(dataString, myDataString);
        })
        .catch(err => {
            assert.fail(err);
        });
});

test("APIClient #buildURL()", async (testObject) => {
   // Since #buildURL is a private method, we need to test it by calling getURL
    await testObject.test("Default URL", () => {
        const api = new APIClient();
        const url = api.getURL();

        const params = new URLSearchParams();
        params.append("format", "json");
        params.append("page[size]", "50");
        params.append("page[number]", "1");
        const myURL = "https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/avg_interest_rates" +
            "?" + params.toString();

        assert.strictEqual(url, myURL);
    });

    await testObject.test("Adding Filters", () => {
       const api = new APIClient();
       const fieldRegistry = new FieldRegistry(true);
        fieldRegistry.initAllFields();

       api.addFilter(fieldRegistry.getRegisteredField("record_date"), "eq", "01/31/2001");

       let url = api.getURL();

        const params = new URLSearchParams();
        params.append("format", "json");
        params.append("page[size]", "50");
        params.append("page[number]", "1");

        const URL = "https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/avg_interest_rates";
        const baseURL = URL + "?" + params.toString();

        params.append("filter", "record_date:eq:2001-01-31");
        let myURL = URL + "?" + params.toString();

        assert.strictEqual(url, myURL);

        api.addFilter(fieldRegistry.getRegisteredField("record_date"), "eq", "02/15/2001");
        url = api.getURL();
        assert.strictEqual(url, myURL);

        api.clearFilters();
        url = api.getURL();
        assert.strictEqual(url, baseURL);

        api.addFilter(fieldRegistry.getRegisteredField("record_date"), "eq", "03/31/2001");
        api.addFilter(fieldRegistry.getRegisteredField("src_line_nbr"), "eq", 2);
        url = api.getURL();

        params.delete("filter");
        params.append("filter", "record_date:eq:2001-03-31,src_line_nbr:eq:2");
        myURL = URL + "?" + params.toString();
        assert.strictEqual(url, myURL);

        api.fetchData()
            .then(data => {
                const myData = {
                    "data": [
                        {
                            "record_date": "2001-03-31",
                            "security_type_desc": "Marketable",
                            "security_desc": "Treasury Notes",
                            "avg_interest_rate_amt": "6.088",
                            "src_line_nbr": "2",
                            "record_fiscal_year": "2001",
                            "record_fiscal_quarter": "2",
                            "record_calendar_year": "2001",
                            "record_calendar_quarter": "1",
                            "record_calendar_month": "03",
                            "record_calendar_day": "31"
                        }
                    ],
                    "meta": {
                        "count": 1,
                        "labels": {
                            "record_date": "Record Date",
                            "security_type_desc": "Security Type Description",
                            "security_desc": "Security Description",
                            "avg_interest_rate_amt": "Average Interest Rate Amount",
                            "src_line_nbr": "Source Line Number",
                            "record_fiscal_year": "Fiscal Year",
                            "record_fiscal_quarter": "Fiscal Quarter Number",
                            "record_calendar_year": "Calendar Year",
                            "record_calendar_quarter": "Calendar Quarter Number",
                            "record_calendar_month": "Calendar Month Number",
                            "record_calendar_day": "Calendar Day Number"
                        },
                        "dataTypes": {
                            "record_date": "DATE",
                            "security_type_desc": "STRING",
                            "security_desc": "STRING",
                            "avg_interest_rate_amt": "PERCENTAGE",
                            "src_line_nbr": "INTEGER",
                            "record_fiscal_year": "YEAR",
                            "record_fiscal_quarter": "QUARTER",
                            "record_calendar_year": "YEAR",
                            "record_calendar_quarter": "QUARTER",
                            "record_calendar_month": "MONTH",
                            "record_calendar_day": "DAY"
                        },
                        "dataFormats": {
                            "record_date": "YYYY-MM-DD",
                            "security_type_desc": "String",
                            "security_desc": "String",
                            "avg_interest_rate_amt": "10.2%",
                            "src_line_nbr": "10",
                            "record_fiscal_year": "YYYY",
                            "record_fiscal_quarter": "Q",
                            "record_calendar_year": "YYYY",
                            "record_calendar_quarter": "Q",
                            "record_calendar_month": "MM",
                            "record_calendar_day": "DD"
                        },
                        "total-count": 1,
                        "total-pages": 1
                    },
                    "links": {
                        "self": "&page%5Bnumber%5D=1&page%5Bsize%5D=50",
                        "first": "&page%5Bnumber%5D=1&page%5Bsize%5D=50",
                        "prev": null,
                        "next": null,
                        "last": "&page%5Bnumber%5D=1&page%5Bsize%5D=50"
                    }
                }

                const dataString = JSON.stringify(data);
                const myDataString = JSON.stringify(myData);

                assert.strictEqual(dataString, myDataString);
            })
            .catch(err => {
                assert.fail(err);
            });
    });

    await testObject.test("Adding Sorting", () => {
        const api = new APIClient();
        const fieldRegistry = new FieldRegistry(true);
        fieldRegistry.initAllFields();

        api.addSorting(fieldRegistry.getRegisteredField("record_date"), "asc");

        let url = api.getURL();

        const params = new URLSearchParams();
        params.append("format", "json");
        params.append("page[size]", "50");
        params.append("page[number]", "1");

        const URL = "https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/avg_interest_rates";
        const baseURL = URL + "?" + params.toString();

        params.append("sort", "record_date");
        let myURL = URL + "?" + params.toString();

        assert.strictEqual(url, myURL);

        api.addSorting(fieldRegistry.getRegisteredField("record_date"), "asc");
        url = api.getURL();
        assert.strictEqual(url, myURL);

        api.clearSorting();
        url = api.getURL();
        assert.strictEqual(url, baseURL);

        api.addSorting(fieldRegistry.getRegisteredField("record_date"), "asc");
        api.addSorting(fieldRegistry.getRegisteredField("src_line_nbr"), "desc");
        url = api.getURL();

        params.delete("sort");
        params.append("sort", "record_date,-src_line_nbr");
        myURL = URL + "?" + params.toString();
        assert.strictEqual(url, myURL);

        api.setPageSize(5);
        api.setPageNumber(1);

        api.fetchData()
            .then(data => {
                const myData = {
                    "data": [
                        {
                            "record_date": "2001-01-31",
                            "security_type_desc": "Interest-bearing Debt",
                            "security_desc": "Total Interest-bearing Debt",
                            "avg_interest_rate_amt": "6.594",
                            "src_line_nbr": "15",
                            "record_fiscal_year": "2001",
                            "record_fiscal_quarter": "2",
                            "record_calendar_year": "2001",
                            "record_calendar_quarter": "1",
                            "record_calendar_month": "01",
                            "record_calendar_day": "31"
                        },
                        {
                            "record_date": "2001-01-31",
                            "security_type_desc": "Non-marketable",
                            "security_desc": "Total Non-marketable",
                            "avg_interest_rate_amt": "6.567",
                            "src_line_nbr": "14",
                            "record_fiscal_year": "2001",
                            "record_fiscal_quarter": "2",
                            "record_calendar_year": "2001",
                            "record_calendar_quarter": "1",
                            "record_calendar_month": "01",
                            "record_calendar_day": "31"
                        },
                        {
                            "record_date": "2001-01-31",
                            "security_type_desc": "Non-marketable",
                            "security_desc": "Government Account Series",
                            "avg_interest_rate_amt": "6.650",
                            "src_line_nbr": "13",
                            "record_fiscal_year": "2001",
                            "record_fiscal_quarter": "2",
                            "record_calendar_year": "2001",
                            "record_calendar_quarter": "1",
                            "record_calendar_month": "01",
                            "record_calendar_day": "31"
                        },
                        {
                            "record_date": "2001-01-31",
                            "security_type_desc": "Non-marketable",
                            "security_desc": "United States Savings Securities",
                            "avg_interest_rate_amt": "6.224",
                            "src_line_nbr": "12",
                            "record_fiscal_year": "2001",
                            "record_fiscal_quarter": "2",
                            "record_calendar_year": "2001",
                            "record_calendar_quarter": "1",
                            "record_calendar_month": "01",
                            "record_calendar_day": "31"
                        },
                        {
                            "record_date": "2001-01-31",
                            "security_type_desc": "Non-marketable",
                            "security_desc": "State and Local Government Series",
                            "avg_interest_rate_amt": "5.576",
                            "src_line_nbr": "11",
                            "record_fiscal_year": "2001",
                            "record_fiscal_quarter": "2",
                            "record_calendar_year": "2001",
                            "record_calendar_quarter": "1",
                            "record_calendar_month": "01",
                            "record_calendar_day": "31"
                        }
                    ],
                    "meta": {
                        "count": 5,
                        "labels": {
                            "record_date": "Record Date",
                            "security_type_desc": "Security Type Description",
                            "security_desc": "Security Description",
                            "avg_interest_rate_amt": "Average Interest Rate Amount",
                            "src_line_nbr": "Source Line Number",
                            "record_fiscal_year": "Fiscal Year",
                            "record_fiscal_quarter": "Fiscal Quarter Number",
                            "record_calendar_year": "Calendar Year",
                            "record_calendar_quarter": "Calendar Quarter Number",
                            "record_calendar_month": "Calendar Month Number",
                            "record_calendar_day": "Calendar Day Number"
                        },
                        "dataTypes": {
                            "record_date": "DATE",
                            "security_type_desc": "STRING",
                            "security_desc": "STRING",
                            "avg_interest_rate_amt": "PERCENTAGE",
                            "src_line_nbr": "INTEGER",
                            "record_fiscal_year": "YEAR",
                            "record_fiscal_quarter": "QUARTER",
                            "record_calendar_year": "YEAR",
                            "record_calendar_quarter": "QUARTER",
                            "record_calendar_month": "MONTH",
                            "record_calendar_day": "DAY"
                        },
                        "dataFormats": {
                            "record_date": "YYYY-MM-DD",
                            "security_type_desc": "String",
                            "security_desc": "String",
                            "avg_interest_rate_amt": "10.2%",
                            "src_line_nbr": "10",
                            "record_fiscal_year": "YYYY",
                            "record_fiscal_quarter": "Q",
                            "record_calendar_year": "YYYY",
                            "record_calendar_quarter": "Q",
                            "record_calendar_month": "MM",
                            "record_calendar_day": "DD"
                        },
                        "total-count": 4827,
                        "total-pages": 966
                    },
                    "links": {
                        "self": "&page%5Bnumber%5D=1&page%5Bsize%5D=5",
                        "first": "&page%5Bnumber%5D=1&page%5Bsize%5D=5",
                        "prev": null,
                        "next": "&page%5Bnumber%5D=2&page%5Bsize%5D=5",
                        "last": "&page%5Bnumber%5D=966&page%5Bsize%5D=5"
                    }
                };

                const dataString = JSON.stringify(data);
                const myDataString = JSON.stringify(myData);

                assert.strictEqual(dataString, myDataString);
            })
            .catch(err => {
                assert.fail(err);
            });
    });

    await testObject.test("Adding Filters and Sorting", () => {
        const api = new APIClient();
        const fieldRegistry = new FieldRegistry(true);
        fieldRegistry.initAllFields();

        api.addFilter(fieldRegistry.getRegisteredField("record_date"), "gt", "01/31/2002");
        api.addSorting(fieldRegistry.getRegisteredField("record_date"), "desc");
        api.setPageSize(5);
        api.setPageNumber(1);

        let url = api.getURL();

        const URL = "https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/avg_interest_rates";
        const params = new URLSearchParams();
        params.append("format", "json");
        params.append("page[size]", "5");
        params.append("page[number]", "1");
        params.append("filter", "record_date:gt:2002-01-31");
        params.append("sort", "-record_date");
        let myURL = URL + "?" + params.toString();

        assert.strictEqual(url, myURL);


        api.addFilter(fieldRegistry.getRegisteredField("record_date"), "lt", "12/31/2002");
        api.addSorting(fieldRegistry.getRegisteredField("record_date"), "desc");

        assert.strictEqual(url, myURL);

        api.addFilter(fieldRegistry.getRegisteredField("src_line_nbr"), "gt", 10);
        api.addSorting(fieldRegistry.getRegisteredField("src_line_nbr"), "asc");

        params.delete("filter");
        params.delete("sort");

        params.append("filter", "record_date:gt:2002-01-31,src_line_nbr:gt:10");
        params.append("sort", "-record_date,src_line_nbr");

        myURL = URL + "?" + params.toString();
        url = api.getURL();
        assert.strictEqual(url, myURL);

        api.addFilter(fieldRegistry.getRegisteredField("record_fiscal_quarter"), "in", [1, 4]);

        params.delete("filter");
        params.delete("sort");

        params.append("filter", "record_date:gt:2002-01-31,src_line_nbr:gt:10,record_fiscal_quarter:in:(1,4)");
        params.append("sort", "-record_date,src_line_nbr");

        myURL = URL + "?" + params.toString();
        url = api.getURL();
        assert.strictEqual(url, myURL);

        api.fetchData()
            .then(data => {
                const myData = {
                    "data": [
                        {
                            "record_date": "2025-09-30",
                            "security_type_desc": "Non-marketable",
                            "security_desc": "State and Local Government Series",
                            "avg_interest_rate_amt": "3.461",
                            "src_line_nbr": "11",
                            "record_fiscal_year": "2025",
                            "record_fiscal_quarter": "4",
                            "record_calendar_year": "2025",
                            "record_calendar_quarter": "3",
                            "record_calendar_month": "09",
                            "record_calendar_day": "30"
                        },
                        {
                            "record_date": "2025-09-30",
                            "security_type_desc": "Non-marketable",
                            "security_desc": "United States Savings Securities",
                            "avg_interest_rate_amt": "3.397",
                            "src_line_nbr": "12",
                            "record_fiscal_year": "2025",
                            "record_fiscal_quarter": "4",
                            "record_calendar_year": "2025",
                            "record_calendar_quarter": "3",
                            "record_calendar_month": "09",
                            "record_calendar_day": "30"
                        },
                        {
                            "record_date": "2025-09-30",
                            "security_type_desc": "Non-marketable",
                            "security_desc": "United States Savings Inflation Securities",
                            "avg_interest_rate_amt": "3.822",
                            "src_line_nbr": "13",
                            "record_fiscal_year": "2025",
                            "record_fiscal_quarter": "4",
                            "record_calendar_year": "2025",
                            "record_calendar_quarter": "3",
                            "record_calendar_month": "09",
                            "record_calendar_day": "30"
                        },
                        {
                            "record_date": "2025-09-30",
                            "security_type_desc": "Non-marketable",
                            "security_desc": "Government Account Series",
                            "avg_interest_rate_amt": "3.162",
                            "src_line_nbr": "14",
                            "record_fiscal_year": "2025",
                            "record_fiscal_quarter": "4",
                            "record_calendar_year": "2025",
                            "record_calendar_quarter": "3",
                            "record_calendar_month": "09",
                            "record_calendar_day": "30"
                        },
                        {
                            "record_date": "2025-09-30",
                            "security_type_desc": "Non-marketable",
                            "security_desc": "Government Account Series Inflation Securities",
                            "avg_interest_rate_amt": "1.241",
                            "src_line_nbr": "15",
                            "record_fiscal_year": "2025",
                            "record_fiscal_quarter": "4",
                            "record_calendar_year": "2025",
                            "record_calendar_quarter": "3",
                            "record_calendar_month": "09",
                            "record_calendar_day": "30"
                        }
                    ],
                    "meta": {
                        "count": 5,
                        "labels": {
                            "record_date": "Record Date",
                            "security_type_desc": "Security Type Description",
                            "security_desc": "Security Description",
                            "avg_interest_rate_amt": "Average Interest Rate Amount",
                            "src_line_nbr": "Source Line Number",
                            "record_fiscal_year": "Fiscal Year",
                            "record_fiscal_quarter": "Fiscal Quarter Number",
                            "record_calendar_year": "Calendar Year",
                            "record_calendar_quarter": "Calendar Quarter Number",
                            "record_calendar_month": "Calendar Month Number",
                            "record_calendar_day": "Calendar Day Number"
                        },
                        "dataTypes": {
                            "record_date": "DATE",
                            "security_type_desc": "STRING",
                            "security_desc": "STRING",
                            "avg_interest_rate_amt": "PERCENTAGE",
                            "src_line_nbr": "INTEGER",
                            "record_fiscal_year": "YEAR",
                            "record_fiscal_quarter": "QUARTER",
                            "record_calendar_year": "YEAR",
                            "record_calendar_quarter": "QUARTER",
                            "record_calendar_month": "MONTH",
                            "record_calendar_day": "DAY"
                        },
                        "dataFormats": {
                            "record_date": "YYYY-MM-DD",
                            "security_type_desc": "String",
                            "security_desc": "String",
                            "avg_interest_rate_amt": "10.2%",
                            "src_line_nbr": "10",
                            "record_fiscal_year": "YYYY",
                            "record_fiscal_quarter": "Q",
                            "record_calendar_year": "YYYY",
                            "record_calendar_quarter": "Q",
                            "record_calendar_month": "MM",
                            "record_calendar_day": "DD"
                        },
                        "total-count": 885,
                        "total-pages": 177
                    },
                    "links": {
                        "self": "&page%5Bnumber%5D=1&page%5Bsize%5D=5",
                        "first": "&page%5Bnumber%5D=1&page%5Bsize%5D=5",
                        "prev": null,
                        "next": "&page%5Bnumber%5D=2&page%5Bsize%5D=5",
                        "last": "&page%5Bnumber%5D=177&page%5Bsize%5D=5"
                    }
                };

                const dataString = JSON.stringify(data);
                const myDataString = JSON.stringify(myData);

                assert.strictEqual(dataString, myDataString);
            })
            .catch(err => {
                assert.fail(err);
            });
    });
});

test("APIClient Getters and Setters", async testObject => {
    await testObject.test("Getting Format", () => {
        let api = new APIClient();
        assert.strictEqual(api.getFormat(), "json");
    });

    await testObject.test("Getting Filters", () => {
        let api = new APIClient();
        let fieldRegistry = new FieldRegistry(true);

        fieldRegistry.initAllFields();
        api.addFilter(fieldRegistry.getRegisteredField("record_date"), "gt", "01/31/2002");
        api.addFilter(fieldRegistry.getRegisteredField("src_line_nbr"), "lt", 1);
        api.addFilter(fieldRegistry.getRegisteredField("record_fiscal_quarter"), "in", [1, 4]);

        const filters = api.getFilters();
        const myFilters = "record_date:gt:2002-01-31,src_line_nbr:lt:1,record_fiscal_quarter:in:(1,4)";
        assert.strictEqual(filters, myFilters);
    });

    await testObject.test("Getting Sorting", () => {
        let api = new APIClient();
        let fieldRegistry = new FieldRegistry(true);
        fieldRegistry.initAllFields();

        api.addSorting(fieldRegistry.getRegisteredField("record_date"), "desc");
        api.addSorting(fieldRegistry.getRegisteredField("src_line_nbr"), "asc");

        const sorting = api.getSorting();
        const mySorting = "-record_date,src_line_nbr";
        assert.strictEqual(sorting, mySorting);
    });

    await testObject.test("Getting and Setting Page Size", () => {
        let api = new APIClient();
        assert.strictEqual(api.getPageSize(), 50);

        api.setPageSize(10);
        assert.strictEqual(api.getPageSize(), 10);
    });

    await testObject.test("Getting and Setting Page Number", () => {
        let api = new APIClient();
        assert.strictEqual(api.getPageNumber(), 1);

        api.setPageNumber(20);
        assert.strictEqual(api.getPageNumber(), 20);
    });
});

test("APIClient Next and Previous Page", async testObject => {
    await testObject.test("Getting Next Page", () => {
        let api = new APIClient();
        assert.strictEqual(api.getPageNumber(), 1);

        api.nextPage();
        assert.strictEqual(api.getPageNumber(), 2);

        api.nextPage();
        assert.strictEqual(api.getPageNumber(), 3);

        api.setPageNumber(10);
        api.nextPage();
        assert.strictEqual(api.getPageNumber(), 11);
    });

    await testObject.test("Getting Previous Page", () => {
        let api = new APIClient();
        assert.strictEqual(api.getPageNumber(), 1);

        assert.throws(() => {
            api.previousPage();
        }, Error, "Previous page must fail on page 1 because there is no previous page");

        api.setPageNumber(10);
        api.previousPage();
        assert.strictEqual(api.getPageNumber(), 9);

        api.previousPage();
        assert.strictEqual(api.getPageNumber(), 8);

        api.previousPage();
        assert.strictEqual(api.getPageNumber(), 7);

        api.setPageNumber(10);
        api.nextPage();
        api.previousPage();

        assert.strictEqual(api.getPageNumber(), 10);
    });
});

test("APIClient addFilter()", async testObject => {
    await testObject.test("Invalid filters", () => {
        const fieldRegistry = new FieldRegistry(true);
        fieldRegistry.initAllFields();

        assert.throws(() => {
           new APIClient().addFilter(null, "gt", "01/31/2002");
        }, Error, "Filter must be a Field object");

        assert.throws(() => {
           new APIClient().addFilter(fieldRegistry.getRegisteredField("record_date"), "test", "01/31/2002");
        }, Error, "Filter must be a valid operator");

        assert.throws(() => {
           new APIClient().addFilter(fieldRegistry.getRegisteredField("record_date"), "gt", 1);
        }, Error, "Filter must be a valid value");

        assert.throws(() => {
           new APIClient().addFilter(fieldRegistry.getRegisteredField("record_date"), "", "");
        }, Error, "Filter must have a valid operator and value");

        assert.throws(() => {
           new APIClient().addFilter(fieldRegistry.getRegisteredField("record_date"), "gt", "");
        }, Error, "Filter must have a valid operator and value");

        assert.throws(() => {
           new APIClient().addFilter(fieldRegistry.getRegisteredField("record_date"), "", "01/31/2002");
        }, Error, "Filter must have a valid operator and value");

        assert.throws(() => {
           new APIClient().addFilter(fieldRegistry.getRegisteredField("record_date"));
        }, Error, "Filter must have a valid operator and value");

        assert.throws(() => {
            new APIClient().addFilter(fieldRegistry.getRegisteredField("record_date"), "gt", null);
        }, Error, "Filter must have a valid operator and value");

        assert.throws(() => {
            new APIClient().addFilter(fieldRegistry.getRegisteredField("record_date"), null, "01/31/2002");
        }, Error, "Filter must have a valid operator and value");
    });

    await testObject.test("Valid filters", () => {
        const fieldRegistry = new FieldRegistry(true);
        fieldRegistry.initAllFields();

        assert.strictEqual(
            new APIClient()
                .addFilter(fieldRegistry.getRegisteredField("record_date"), "gt", "01/31/2002")
                .getFilters(),
            "record_date:gt:2002-01-31"
        );

        assert.strictEqual(
            new APIClient()
                .addFilter(fieldRegistry.getRegisteredField("record_date"), "gt", "01/31/2002")
                .addFilter(fieldRegistry.getRegisteredField("src_line_nbr"), "lt", 1)
                .addFilter(fieldRegistry.getRegisteredField("record_fiscal_quarter"), "in", [1, 4])
                .getFilters(),
            "record_date:gt:2002-01-31,src_line_nbr:lt:1,record_fiscal_quarter:in:(1,4)"
        );
    })
});

test("APIClient addSorting()", async testObject => {
    await testObject.test("Invalid sorting", () => {
        const fieldRegistry = new FieldRegistry(true);
        fieldRegistry.initAllFields();

        assert.throws(() => {
            new APIClient().addSorting(null, "asc");
        }, Error, "Filter must be a Field object");

        assert.throws(() => {
            new APIClient().addSorting(fieldRegistry.getRegisteredField("record_date"), "test");
        }, Error, "Filter must be a valid operator");

        assert.throws(() => {
            new APIClient().addSorting(fieldRegistry.getRegisteredField("record_date"), 1);
        }, Error, "Filter must be a valid value");

        assert.throws(() => {
            new APIClient().addSorting(fieldRegistry.getRegisteredField("record_date"), "");
        }, Error, "Filter must have a valid operator and value");

        assert.throws(() => {
            new APIClient().addSorting(fieldRegistry.getRegisteredField("record_date"));
        }, Error, "Filter must have a valid operator and value");

        assert.throws(() => {
            new APIClient().addSorting(fieldRegistry.getRegisteredField("record_date"), null);
        }, Error, "Filter must have a valid operator and value");
    });

    await testObject.test("Valid sorting", () => {
        const fieldRegistry = new FieldRegistry(true);
        fieldRegistry.initAllFields();

        assert.strictEqual(
            new APIClient()
                .addSorting(fieldRegistry.getRegisteredField("record_date"), "desc")
                .getSorting(),
            "-record_date"
        );

        assert.strictEqual(
            new APIClient()
                .addSorting(fieldRegistry.getRegisteredField("record_date"), "desc")
                .addSorting(fieldRegistry.getRegisteredField("src_line_nbr"), "asc")
                .getSorting(),
            "-record_date,src_line_nbr"
        );
    });
});

test("APIClient Clear Functions", testObject => {
    function getAPIClient() {
        const api = new APIClient();
        const fieldRegistry = new FieldRegistry(true);
        fieldRegistry.initAllFields();

        api.addFilter(fieldRegistry.getRegisteredField("record_date"), "gt", "01/31/2002");
        api.addFilter(fieldRegistry.getRegisteredField("src_line_nbr"), "lt", 1);
        api.addFilter(fieldRegistry.getRegisteredField("record_fiscal_quarter"), "in", [1, 4]);

        api.addSorting(fieldRegistry.getRegisteredField("record_date"), "desc");
        api.addSorting(fieldRegistry.getRegisteredField("src_line_nbr"), "asc");

        return api;
    }

    let api = getAPIClient();

    assert.notStrictEqual(api.getFilters(), "");
    assert.notStrictEqual(api.getSorting(), "");

    api.clearFilters();
    assert.strictEqual(api.getFilters(), "");

    api = getAPIClient();

    assert.notStrictEqual(api.getFilters(), "");
    assert.notStrictEqual(api.getSorting(), "");

    api.clearSorting();
    assert.strictEqual(api.getSorting(), "");

    api = getAPIClient();

    assert.notStrictEqual(api.getFilters(), "");
    assert.notStrictEqual(api.getSorting(), "");
    assert.strictEqual(api.getPageSize(), 50);
    assert.strictEqual(api.getPageNumber(), 1);

    api.setPageSize(100);
    api.setPageNumber(20);
    assert.strictEqual(api.getPageSize(), 100);
    assert.strictEqual(api.getPageNumber(), 20);

    api.reset();

    assert.strictEqual(api.getFilters(), "");
    assert.strictEqual(api.getSorting(), "");
    assert.strictEqual(api.getPageSize(), 50);
    assert.strictEqual(api.getPageNumber(), 1);
});
import objectPath from 'object-path';
import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, Alert } from 'react-native';

const FINANCIAL_KEYS_TRANSLATIONS = {
    "meta.currency": "Moneda", 
    "data.assets.current_assets.cash": "Efectivo y equivalentes en efectivo", 
    "data.assets.current_assets.short_term_investment": "Instrumentos financieros", 
    "data.assets.current_assets.current_accounts_receivables": "Deudores comerciales y otras cuentas por pagar", 
    "data.assets.current_assets.inventory": "Inventario", 
    "data.assets.current_assets.expense_advances": "Gastos pagados por anticipado", 
    "data.assets.current_assets.others": "Otros...", 
    "data.assets.current_assets.total": "Activos corrientes (< 1 año)", 
    "data.assets.long_term_assets.property_plant_and_equipment": "Propiedades, planta y equipos", 
    "data.assets.long_term_assets.lendable_property": "Bienes de arrendamiento", 
    "data.assets.long_term_assets.intangibles": "Intangibles", 
    "data.assets.long_term_assets.biological": "Biológicos vegetales y animales", 
    "data.assets.long_term_assets.others": "Otros...", 
    "data.assets.long_term_assets.total": "Activos corrientes no operativos (> 1 año)", 
    "data.assets.other_assets.investment_in_companies": "Inversiones en asociada y otros", 
    "data.assets.other_assets.investment_property": "Propiedades de inversión", 
    "data.assets.other_assets.long_term_accounts_receivables": "Deudores a largo plazo", 
    "data.assets.other_assets.long_term_investment": "Instrumentos financieros a largo plazo y otros", 
    "data.assets.other_assets.others": "Otros", 
    "data.assets.other_assets.total": "Otros activos no operativos", 
    "data.assets.total": "Activos", 
    "data.liabilities.current_liabilities.current_notes_and_loans_payables": "Obligaciones financieras", 
    "data.liabilities.current_liabilities.supplier_liabilities": "Proveedores", 
    "data.liabilities.current_liabilities.current_account_payables": "Cuentas por pagar", 
    "data.liabilities.current_liabilities.income_tax_payable": "Impuestos, gravámenes y tasas", 
    "data.liabilities.current_liabilities.labor_liabilities": "Beneficios a empleados", 
    "data.liabilities.current_liabilities.provision_and_contingent": "Pasivos estimados y provisiones", 
    "data.liabilities.current_liabilities.accrued_liabilities": "Diferidos", 
    "data.liabilities.current_liabilities.others": "Otros...", 
    "data.liabilities.current_liabilities.total": "Pasivos corrientes", 
    "data.liabilities.long_term_liabilities.long_term_notes_and_loans_payables": "Obligaciones financieras a largo plazo", 
    "data.liabilities.long_term_liabilities.long_term_accounts_payables": "Cuentas por pagar", 
    "data.liabilities.long_term_liabilities.others": "Otros...", 
    "data.liabilities.long_term_liabilities.total": "Pasivos no corrientes", 
    "data.liabilities.total": "Pasivos", 
    "data.equity.share_capital": "Capital social", 
    "data.equity.capital_surplus": "Superávit de capital", 
    "data.equity.reserves": "Reservas de ganancias", 
    "data.equity.other_integral_earnings": "Otro resultado integral", 
    "data.equity.retained_earnings": "Utilidades retenidas", 
    "data.equity.yearly_earning": "Utilidad de ejercicio", 
    "data.equity.others": "Otros...", 
    "data.equity.total": "Patrimonio",


    "data.sales_revenue": "Ventas netas", 
    "data.cost_of_goods_sold": "Costo de ventas", 
    "data.gross_pprofit": "Utilidad bruta",  
    "data.expenses.total": "Gastos", 
    "data.expenses.selling_expenses": "Gastos de venta", 
    "data.expenses.administrative_expenses": "Gastos administrativos", 
    "data.operating_income": "Utilidad operacional", 
    "data.non_operating_income.total": "Ingresos no operacionales", 
    "data.non_operating_income.interest_and_dividend_revenue": "Ingresos financieros", 
    "data.non_operating_expenses.total": "Gastos no operacionales", 
    "data.non_operating_expenses.non_disbursable_expenses": "Gastos amortizados y depreciaciones", 
    "data.non_operating_expenses.interest_on_loans": "Gastos financieros", 
    "data.profit_before_tax": "Utilidad antes de impuestos", 
    "data.tax": "Imporrenta del periodo", 
    "data.net_profit": "Utilidad neta"
}

const flattenObject = (obj = {}, parent, res = {}) => {
    // Iterate over keys
    for(const key of Object.keys(obj)){
        // Concatenate names
        const propname = parent ? `${parent}.${key}` : key;
        // If is object, repeat
        if(typeof obj[key] === 'object')
            flattenObject(obj[key], propname, res);
        else
            res[propname] = obj[key];
    }
    return res;
}

export default class FinancialTable extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const rows = flattenObject(this.props.data);
        return <View>
            {
                Object.keys(rows).forEach(key => (
                    <View>
                        <Text>{FINANCIAL_KEYS_TRANSLATIONS[key]}</Text> 
                        <Text>{ objectPath.get(this.props.data, key) }</Text>
                    </View>
                ))
            }
        </View>
    }
}
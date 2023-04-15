import {home, expenses, transactions, income} from "./Icons"

export const navItems = [
    {
        id: 1,
        title: 'Home',
        icon: home,
        link: '/home'
    },
    {
        id: 2,
        title: "View Transactions",
        icon: transactions,
        link: "/transactions",
    },
    {
        id: 3,
        title: "Incomes",
        icon: income,
        link: "/income",
    },
    {
        id: 4,
        title: "Expenses",
        icon: expenses,
        link: "/expenses",
    },
]
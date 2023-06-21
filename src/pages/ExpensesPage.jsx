/* eslint-disable no-undef */
import { useLoaderData } from "react-router-dom"
import { deleteItem, fetchData } from "../helper";
import Table from "../components/Table";
import { toast } from "react-toastify";

export async function expensesLoader() {
    const expenses = fetchData("expenses")
    return { expenses }
}

export async function expensesAction({ request }) {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data)

    if (_action === "deleteExpense") {
        try {
            deleteItem({
                key: "expenses",
                id: values.expenseId
            });
            return toast.success("Expense deleted");
        } catch (e) {
            throw new Error("There was a problem creating the expense")
        }
    }

}

const ExpensesPage = () => {
    const { expenses } = useLoaderData();

    return (
        <div className="grid-lg">
            <h1>All expenses</h1>
            {
                expenses && expenses.length > 0 ? (
                    <div className="grid-md">
                        <h2>Last Expenses <small>({expenses.length})</small></h2>
                        <Table expenses={expenses} />
                    </div>
                ) : (<p>No expenses yet</p>
            )}
        </div>
    )
}

export default ExpensesPage

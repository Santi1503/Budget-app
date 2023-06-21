import { toast } from "react-toastify"
import { deleteItem, getAllMatchingItems } from "../helper"
import { redirect } from "react-router-dom"

export function deleteBudget({params}) {
    try {
        deleteItem({
            key: "budgets",
            id: params.id,
        })

        const associetedExpenses = getAllMatchingItems({
            category: "expenses",
            key: "budgetId",
            value: params.id
        })

        associetedExpenses.forEach((expense) => {
            deleteItem({
                key: "expenses",
                id: expense.id
            })
        })

        toast.success("Budget deleted")
    } catch (e) {
        throw new Error("There are problems deleting the budget")
    }

    return redirect("/")
}

export default deleteBudget

import { redirect } from "react-router-dom";
import { deleteItem } from "../helper";
import { toast } from "react-toastify";

export async function logoutAction() {
    deleteItem({
        key: "userName"
    })
    toast.success("The account has been deleted.")

    return redirect("/")
}
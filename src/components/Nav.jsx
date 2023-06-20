import { Form, NavLink } from "react-router-dom"
import logomark from "../assets/budget.png"
import { TrashIcon } from '@heroicons/react/24/solid'


const Nav = ({ userName }) => {
  return (
    <nav>
      <NavLink to="/" aria-label="Go to home">
        <img src={logomark} alt="" height={30} />
        <span>BudgetControl</span>
      </NavLink>
      {
        userName && (
          <Form method="post" action="/logout" onSubmit={(e) => {
            if (!confirm("Delete user and all data?")){
              e.preventDefault()
            }
          }}>
            <button type="submit" className="btn btn--warning">
              <span>Delete user</span>
              <TrashIcon width={20} />
            </button>
          </Form>
        )
      }
    </nav>
  )
}

export default Nav

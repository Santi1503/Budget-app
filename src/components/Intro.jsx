/* eslint-disable react/no-unescaped-entities */

import { Form } from "react-router-dom"
import { UserPlusIcon } from "@heroicons/react/24/solid"
import illustration from "../assets/stock.png"

const Intro = () => {
  return (
    <div className="intro">
      <div>
        <h1>Take control of <span className="accent">Your economic life</span></h1>
        <p>Personal budgeting is very essential for financial freedom. Let's start the journey</p>
        <Form method="post">
            <input 
             type="text" 
             name="userName" 
             required 
             placeholder="Tell us your name" 
             aria-label="Your Name" 
             autoComplete="given-name" 
            />
            <input type="hidden" name="_action" value="newUser" />
            <button type="submit" className="btn btn--dark">
                <span>Create Account</span>
                <UserPlusIcon width={20} />
            </button>
        </Form>
      </div>
      <img src={illustration} alt="Bullish Stock" />
    </div>
  )
}

export default Intro

import { Link } from "react-router-dom"


export const ActionPage = () => {
  return (
    <div>
        <h1>What would you like to do next?</h1>
        <Link to="/api/create-house-for-sale">Sell a house</Link>
    </div>
  )
}

import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"
import { useCollection } from "../hooks/useCollection"
import RecipeList from "../components/RecipeList"


function Home() {
  const {user, dispatch} = useContext(GlobalContext)
  const {documents:recipe} = useCollection("recipe", ["uid", "==", user.uid])
  return (
    <div> 
      {recipe && <RecipeList recipe={recipe}/>}
    </div>
  )
}

export default Home
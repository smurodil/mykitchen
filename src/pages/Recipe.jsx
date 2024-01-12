import { useParams } from "react-router-dom"
import { useGetADocument } from '../hooks/useGetADocument'
import { useState } from "react"

function Recipe() {
  const { id } = useParams()
  const { getDocument } = useGetADocument()
  const [document, setDocument] = useState(null)
  const [error, setError] = useState(null)

  getDocument('recipe', id)
    .then((data) => setDocument(data))
    .catch((error) => setError(error))
  return (
    <div>
      <h1 className="text-3xl my-4 font-bold">Recipe:</h1>
      {document && <>
        <div className="hero flex gap-5">
          <div className="carousel carousel-center w-1/2 max-w-md space-x-4 rounded-box bg-neutral p-4">
            <div className="carousel-item">
              <img src={document.images[0]} className="object-cover rounded-xl h-[500px] md:h-full w-[150px] sm:w-[500px]" />
            </div>
            <div className="carousel-item">
              <img src={document.images[1]} className="object-cover rounded-xl h-[500px] md:h-full w-[150px] sm:w-[500px]" />
            </div>
            <div className="carousel-item">
              <img src={document.images[2]} className="object-cover rounded-xl h-[500px] md:h-full w-[150px] sm:w-[500px]" />
            </div>
            <div className="carousel-item">
              <img src={document.images[3]} className="object-cover rounded-xl h-[500px] md:h-full w-[150px] sm:w-[500px]" />
            </div>
          </div>
          <div className="right w-1/2">
            <h1 className="text-2xl mb-5"><strong>Food's name:</strong> {document.title}</h1>
            <h3 className="text-xl mb-5"><strong>Cooking times:</strong> {document.cookingTime}</h3>
            <h3 className="text-xl mb-5"><strong>Ingredients: </strong>{document.ingredients.map((ing, index, ingArray) => {
              return <span className="list-none" key={ing}>{ing}{index == ingArray.length - 1 ? '.' : ','} </span>
            })}</h3>
            <p className="text-base mb-5"><strong>Method:</strong> {document.method}</p>
          </div>
        </div>
      </>}
    </div>
  )
}

export default Recipe
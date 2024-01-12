import { useEffect, useRef, useState } from "react";
import { useAddNewDoc } from "../hooks/useAddNewDoc";
import { useNavigate } from "react-router-dom";
import Button from '../components/Button'
import { useGlobalContext } from '../hooks/useGlobalContext'
import { toast } from "react-toastify";
import Preview from "../components/Preview";


function Create() {
  const { user } = useGlobalContext()
  const navigate = useNavigate()
  const { addNewDoc, isPending, newRecipe } = useAddNewDoc(null)
  const title = useRef()
  const [method, setMethod] = useState('')
  const photoUrl = useRef()
  const cookingTime = useRef()
  const ingredient = useRef()
  const [ingredients, setIngredients] = useState([])
  const [images, setImages] = useState([])

  const handleAddIngredient = (e) => {
    e.preventDefault()

    let newIng = ingredient.current.value.trim()
    if (!ingredients.includes(newIng)) {
      setIngredients((prev) => {
        return [...prev, newIng]
      })
    }

    ingredient.current.value = ''
  }


  const handleSubmit = (e) => {
    e.preventDefault()

    addNewDoc('recipe', {
      title: title.current.value,
      cookingTime: cookingTime.current.value + ' minutes',
      method,
      ingredients,
      images,
      uid: user.uid
    }) 

    // const addNewDoc = ('recipe', {
    //   title: title.current.value,
    //   cookingTime: cookingTime.current.value + " minutes",
    //   method: method.current.value,
    //   ingredients,
    //   images,
    // })


  }

  const handleAddImage = (e) => {
    e.preventDefault()
    const imageUrlRegex = /\.(jpeg|jpg|gif|png|svg|JPEG|JPG|GIF|PNG|SVG)$/i

    let newImage = photoUrl.current.value.trim()
    if (imageUrlRegex.test(newImage)) {
      setImages((prev) => {
        return [...prev, newImage]
      })
    }
    photoUrl.current.value = ''
  }

  const handlePreview = () => {
    if (title && method && cookingTime && ingredients.length && images.length) {
      document.getElementById("my_modal_1").showModal()
    } else {
      toast.error("Please, fill all inputs complately !")
    }
  }

  useEffect(() => {
    if (!isPending && newRecipe) {
      navigate('/')
    }
  }, [isPending, newRecipe])

  return (
    <div className="max-container">
      <Preview
        title={title}
        method={method}
        cookingTime={cookingTime}
        ingredients={ingredients}
        images={images}
      />
      <h1 className="my-10 text-center text-4xl font-semibold">
        Create New Recipe
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col mb-7 items-center">
        <label className="form-control mb-4 w-full max-w-lg">
          <div className="label">
            <span className="label-text text-2xl">Title</span>
          </div>
          <input
            ref={title}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-lg"
          />
        </label>
        <label className="form-control mb-4 w-full max-w-lg">
          <div className="label">
            <span className="label-text text-2xl">Ingredients</span>
          </div>
          <div className="flex ">
            <input
              ref={ingredient}
              type="text"
              placeholder="Type here"
              className="mr-5 input w-full input-bordered max-w-lg"
            />
            <button onClick={handleAddIngredient} className="btn btn-primary">Add</button>
          </div>
          <div>
            {ingredients.length > 0 && ingredients.map((ing, index, ingArray) => {
              return <span style={{ display: 'inline-block' }} key={ing}>{ing}{index == ingArray.length - 1 ? '.' : ','}</span>
            })}
          </div>
        </label>
        <label className="form-control mb-4 w-full max-w-lg">
          <div className="label">
            <span className="label-text text-2xl">Cooking Time:</span>
          </div>
          <div>
            <input
              ref={cookingTime}
              type="text"
              placeholder="Type here"
              className="input w-full input-bordered max-w-lg"
            />
          </div>
        </label>
        <label className="form-control mb-4 w-full max-w-lg">
          <div className="label">
            <span className="label-text text-2xl">Images URL</span>
          </div>
          <div className="flex">
            <input
              ref={photoUrl}
              type="text"
              placeholder="Type here"
              className=" mr-5 input w-full input-bordered max-w-lg"
            />
            <button onClick={handleAddImage} className="btn btn-primary">Add</button>
          </div>
          <div className="py-2 flex gap-2">
            {images.length > 0 && images.map((image) => {
              return <img key={image} src={image} alt="" width={100} height={100} />
            })}
          </div>
        </label>
        <label className="form-control mb-4 w-full max-w-lg">
          <div className="label">
            <span className="label-text text-2xl">Method</span>
          </div>
          <textarea
          onChange={(e) => {
            setMethod(e.target.value)
          }}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-lg"
          />
        </label>
        <div className="flex justify-between">
        {!isPending && <Button disabled={false} text={'Add Recipe'}/>}
        {isPending && <Button disabled={true} text={'Loading...'}/>}

          <button type="button" className="btn btn-sm md:btn-md btn-success md:w-2/5 w-full" onClick={handlePreview}>Preview</button>
        </div>

      </form>
    </div>
  );
}

export default Create;

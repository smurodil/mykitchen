import React from "react";
import { useDeleteDoc } from "../hooks/useDeleteDoc";
import { Link } from "react-router-dom";
import { FaClock } from "react-icons/fa6";

function RecipeList(recipe) {
    const { deleteTodo } = useDeleteDoc()
  return (
    <>
      <ul className="grid grid-cols-2 my-10 gap-5"> 
        {recipe && recipe.recipe.map((recipe) => {
          return (
            <li key={recipe.id} className="card card-compact w-full bg-base-100 shadow-xl">
              <figure>
                <img className="object-cover w-full h-52" src={recipe.images[0]} alt="" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                {recipe.title}</h2>
                <div className="flex items-center gap-2"><FaClock/> <span>{recipe.cookingTime}</span></div>
                <p className="mb-3 line-clamp-3">{recipe.method}...</p>
                <div className="card-actions justify-end">
                  <Link to={`/recipe/${recipe.id}`} className="pt-3 btn btn-sm md:btn-md md:text-base btn-primary tooltip tooltip-bottom" data-tip="Read More">Read More</Link>
                  <button onClick={() => deleteTodo('recipe', recipe.id)} className="btn btn-secondary btn-sm md:btn-md md:text-base tooltip tooltip-bottom" data-tip="Delete">Delete</button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default RecipeList;

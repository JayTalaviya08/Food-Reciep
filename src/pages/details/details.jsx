import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../context/context";

export default function FoodDetails() {
  const { id } = useParams();
  const {
    recipeDetailsData,
    setRecipeDetailsData,
    handleAddToFavorite,
    favoriteList,
  } = useContext(GlobalContext);

  useEffect(() => {
    async function getRecipeDetails() {
      try {
        const response = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
        );
        const data = await response.json();
        if (data?.data?.recipe) {
          setRecipeDetailsData(data?.data?.recipe);
        }
      } catch (e) {
        console.log(`Error occured! please wait`);
      }
    }

    getRecipeDetails();
  }, []);

  //   console.log(recipeDetailsData);

  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="row-start-2  mx-auto lg:row-start-auto">
        <div className="h-96 flex flex-col overflow-hidden rounded-xl group">
          <img
            src={recipeDetailsData?.image_url}
            className="w-full h-full object-cover block group-hover:scale-105 duration-300"
          />
        </div>
        <button
          onClick={() => navigate(-1)}
          className="font-bold mt-3 p-3 px-8 rounded-lg uppercase tracking-wider inline-block shadow-md bg-black text-white hover:bg-white hover:text-black"
        >
          Back
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-3xl truncate text-black">
          {recipeDetailsData?.title}
        </h3>
        <span className="text-sm text-cyan-700 font-medium">
          {recipeDetailsData?.publisher}
        </span>
        <div>
          <button
            onClick={() => handleAddToFavorite(recipeDetailsData)}
            className="p-2 px-6 rounded-lg tracking-wider inline-block shadow-md bg-black text-white hover:bg-white hover:text-black"
          >
            {favoriteList &&
            favoriteList.length > 0 &&
            favoriteList.findIndex(
              (item) => item.id === recipeDetailsData.id
            ) !== -1
              ? "Remove From Favorite"
              : "Add To Favorite"}
          </button>
        </div>
        <div>
          <p className="font-bold text-xl truncate text-black">
            Time: {recipeDetailsData?.cooking_time} min
          </p>
          <p className="font-bold text-xl truncate text-black">
            Servings: {recipeDetailsData?.servings}
          </p>
          <p className="font-bold text-xl truncate text-black">Ingredients: </p>
          {recipeDetailsData?.ingredients.map((ingrad, index) => (
            <div key={index} className="font-bold mt-2 ml-2">
              {ingrad.quantity ? (
                <div>
                  <span>
                    item{index + 1}: {ingrad?.quantity} {ingrad?.unit}
                  </span>
                  <span className="ml-2">{ingrad.description}</span>
                </div>
              ) : (
                <span>
                  item{index + 1}: {ingrad.description}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
{
  /* <div className="flex w-full owerflow-hidden p-5 bg-white/75 shadow-xl gap-10 border border-white rounded-2xl">
      <div className="max-h-screen w-[50%] flex flex-col gap-y-8 rounded-2xl justify-center overflow-hidden items-center">
        <img
          src={recipeDetailsData?.image_url}
          alt="recipe item"
          className="block w-full rounded-2xl"
        />
        <button className="font-bold p-3 px-8 rounded-lg uppercase tracking-wider inline-block shadow-md bg-black text-white hover:bg-white hover:text-black">
          <Link to={`/`}>Back</Link>
        </button>
      </div>
      <div className="flex flex-col gap-y-2">
        <h3 className="font-bold text-4xl truncate text-black">
          {recipeDetailsData?.title}
        </h3>
        <span className="text-sm text-cyan-700 font-medium">
          {recipeDetailsData?.publisher}
        </span>
        <p className="font-bold text-xl truncate text-black">
          Time: {recipeDetailsData?.cooking_time} min
        </p>
        <p className="font-bold text-xl truncate text-black">
          Servings: {recipeDetailsData?.servings}
        </p>
        <p className="font-bold text-xl truncate text-black">Ingredients: </p>
        {recipeDetailsData?.ingredients.map((ingrad, index) => (
          <div className="flex flex-col font-bold ml-4">
            <span className="mt-1">
              item-{index + 1}: {ingrad.description}
            </span>

            <span className="flex">
              {ingrad.quantity ? (
                <div>
                  quantity: {ingrad?.quantity} {ingrad?.unit}
                </div>
              ) : null}
            </span>
          </div>
        ))}
    </div>
</div> */
}

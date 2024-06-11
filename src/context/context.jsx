import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("banana");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favoriteList, setFavoriteList] = useState([]);

  //   *****************************************************
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );
      const data = await response.json();
      if (data?.data?.recipes) {
        // console.log(data?.data?.recipes);
        setRecipeList(data?.data?.recipes);
        setSearchParam("");
        navigate("/");
      }
    } catch (error) {
      console.log(`Error occured in fetching Data! ${error}`);
      setRecipeList([]);
      setSearchParam("");
    }
    setLoading(false);
  }

  function handleAddToFavorite(getCurrentItem) {
    // console.log(getCurrentItem);
    let cpyFavoriteList = [...favoriteList];
    const index = cpyFavoriteList.findIndex(
      (item) => item.id === getCurrentItem.id
    );
    if (index === -1) {
      cpyFavoriteList.push(getCurrentItem);
    } else {
      cpyFavoriteList.splice(index, 1);
    }

    setFavoriteList(cpyFavoriteList);
  }

  console.log(favoriteList);

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        setSearchParam,
        handleSubmit,
        loading,
        recipeList,
        recipeDetailsData,
        setRecipeDetailsData,
        handleAddToFavorite,
        favoriteList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

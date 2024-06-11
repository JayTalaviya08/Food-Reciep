import { useContext } from "react";
import { GlobalContext } from "../../context/context";
import RecipeItem from "../../components/recipeitem";

export default function HomePage() {
  const { loading, recipeList } = useContext(GlobalContext);
  if (loading) return <h2>Loading data! please wait...</h2>;
  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {recipeList && recipeList.length > 0 ? (
        recipeList.map((item) => <RecipeItem key={item.id} item={item} />)
      ) : (
        <div>
          <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
            No items. Please search something
          </p>
        </div>
      )}
    </div>
  );
}

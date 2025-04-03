import { GetAllCategories } from "../../hooks/UseCategory/useCateogry";
import Loading from "../../ui/Loading";
import CategoryList from "./CategoryList";

function FetchCategory({ search }) {
  const { AllCategory, error, isPending: isLoading } = GetAllCategories();

  console.log("AllCategory:", AllCategory);

  if (error) {
    return <h1 className="text-red-500 text-center mt-4">No Data Found</h1>;
  }

  return (
    <div className="flex flex-col gap-4 w-full py-3 dark:bg-slate-900 dark:text-white bg-gray-50 px-5">
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {isLoading ? (
          <div className="col-span-2 md:col-span-3 lg:col-span-4 flex justify-center items-center">
            <Loading />
          </div>
        ) : (
          AllCategory?.filter((item) => {
            return item === ""
              ? item
              : item.name.toLowerCase().includes(search.toLowerCase());
          }).map((item) => <CategoryList item={item} key={item._id} />)
        )}
      </ul>
    </div>
  );
}

export default FetchCategory;

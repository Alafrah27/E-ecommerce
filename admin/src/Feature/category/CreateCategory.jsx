import { useState } from "react";
import { Loader } from "lucide-react";
import { UseCategory } from "../../hooks/UseCategory/useCateogry";

function CreateCategory({ onCloseModal }) {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const { category, isPending } = UseCategory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const catgoryObj = { name };

      if (image) catgoryObj.image = await readFileAsDataURL(image);

      category(catgoryObj);
    } catch (error) {
      console.log("error from category", error);
    }
    onCloseModal();
  };

  function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      readFileAsDataURL(file).then(setPreviewImage);
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <div className="flex flex-col gap-4 ">
      {previewImage && (
        <div className="mt-4">
          <img
            src={previewImage}
            alt="Selected"
            className="w-full h-[250px] object-cover rounded-lg"
          />
        </div>
      )}
      <form
        className="flex flex-col gap-7 w-full h-full bg-white p-4 mt-4"
        onSubmit={handleSubmit}
      >
        <label>Category Name</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Category Name"
          className="flex j py-5 px-3 border-gray-300 border-solid-3   bg-none border rounded-md focus:outline-none w-full"
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <div className="flex flex-row justify-end items-center gap-4">
          <button
            disabled={isPending}
            type="submit"
            className="dark:bg-slate-900 bg-blue-500 text-white text-base py-2 px-3 lg:py-5 lg:px-5 rounded-md border-none focus:outline-none"
          >
            {isPending ? (
              <Loader size={30} className="animate-spin" />
            ) : (
              " Create Category"
            )}
          </button>
          <button
            onClick={() => onCloseModal?.()}
            className="bg-red-500 dark:bg-slate-900 text-white text-base py-2 px-3 lg:py-5 lg:px-5  rounded-md border-none focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateCategory;

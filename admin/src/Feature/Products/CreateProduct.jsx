import { useForm } from "react-hook-form";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import {
  UseCategory,
  UseCreate,
  UseUpdate,
} from "../../hooks/Product/useProducts";

import { useState, useEffect } from "react";
import { readFileAsDataURL } from "../../helper/ReadFileAsDataURL";

function CreateProduct({ productToEdit = {}, onCloseModal }) {
  const [value, setValue] = useState("");

  const { Product, isPending, error } = UseCreate();
  const { useupdateProduct, isPending: isUpdatePending } = UseUpdate();
  const { Category } = UseCategory();
  console.log("category", Category);

  const productId = productToEdit._id;

  const isEditSession = Boolean(productId);

  useEffect(() => {
    if (isEditSession && productToEdit.subdescription) {
      setValue(productToEdit.subdescription);
    }
  }, [productToEdit, isEditSession]);

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: isEditSession ? { ...productToEdit } : {},
  });
  const { errors } = formState;

  // Create a pre-submit handler to debug form submission
  const onSubmit = async (data) => {
    let upload = null;
    try {
      if (isEditSession && typeof data.image === "string") {
        upload = data.image;
      } else if (data.image && data.image[0]) {
        const imageFile = await readFileAsDataURL(data.image[0]);
        upload = imageFile;
      }

      if (upload === null) {
        console.error("No valid image upload found");
        return; // Exit or handle accordingly
      }

      if (isEditSession) {
        useupdateProduct(
          {
            NewUpdate: { ...data, image: upload, subdescription: value },
            id: productId,
          },
          {
            onSuccess: (data) => {
              console.log(data);
              reset();
              onCloseModal?.();
            },
          }
        );
        console.log(" update", data);
      } else {
        const formData = {
          ...data,
          image: upload,
          subdescription: value,
        };
        console.log("create", formData);
        Product(formData, {
          onSuccess: (data) => {
            console.log(data);
            reset();
            onCloseModal?.();
          },
        });
      }

      // Now use the explicit condition for the main logic
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const isWorking = isPending || isUpdatePending;
  if (error) return <h1>something went wrong</h1>;

  return (
    <div className="p-4 w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-full"
      >
        <div className="flex flex-col lg:flex-row gap-5 ">
          <div className="flex flex-col gap-5 w-full">
            <label>Name</label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "This field is required" })}
              placeholder="Enter Product Name"
              className="px-3 py-4 w-full focus:outline-none border border-grey-300 rounded-sm"
              disabled={isWorking}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-5 w-full">
            <label>Description</label>
            <textarea
              type="text"
              id="description"
              {...register("description", {
                required: "This field is required",
              })}
              placeholder="Enter Product Description"
              className="px-3 py-4 w-full focus:outline-none border border-grey-300 rounded-sm"
              disabled={isWorking}
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>
        </div>

        {/* Rest of your form fields remain the same */}
        {/* ... */}
        <div className="flex flex-row gap-5 ">
          <div className="flex flex-col gap-5 w-full">
            <label>sub category</label>
            <input
              type="text"
              id="subcategory"
              {...register("subcategory", {
                required: "This field is required",
              })}
              placeholder="Enter Product subcategory"
              className="px-3 py-4 w-full focus:outline-none border border-grey-300 rounded-sm"
              disabled={isWorking}
            />
            {errors.subcategory && (
              <p className="text-red-500">{errors.subcategory.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-5 w-full">
            <label>Category</label>
            <select
              id="category"
              {...register(
                "category",
                isEditSession ? {} : { required: "This field is required" }
              )}
              className="px-3 py-4 w-full focus:outline-none border border-grey-300 rounded-sm"
              disabled={isWorking}
            >
              {Category?.map((cat) => (
                <option key={cat?._id} value={cat?.name}>
                  {cat?.name}
                </option>
              ))}
            </select>
            {!isEditSession && errors.category && (
              <p className="text-red-500">{errors.category.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-row gap-5 ">
          <div className="flex flex-col gap-5 w-full">
            <label>In Stock</label>
            <input
              type="number"
              id="inStock"
              {...register("inStock", {
                required: "This field is required",
              })}
              placeholder="Enter Stock Amount"
              className="px-3 py-4 w-full focus:outline-none border border-grey-300 rounded-sm"
              disabled={isWorking}
            />
            {errors.inStock && (
              <p className="text-red-500">{errors.inStock.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-5 w-full">
            <label>Price</label>
            <input
              type="number"
              id="price"
              {...register("price", { required: "This field is required" })}
              placeholder="Enter Product Price"
              className="px-3 py-4 w-full focus:outline-none border border-grey-300 rounded-sm"
              disabled={isWorking}
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-row gap-5 ">
          <div className="flex flex-col gap-5 w-full">
            <label>Sizes</label>
            <select
              id="size"
              {...register(
                "size",
                isEditSession ? {} : { required: "This field is required" }
              )}
              className="px-3 py-4 w-full focus:outline-none border border-grey-300 rounded-sm"
              disabled={isWorking}
            >
              <option value="">Select Size</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
            {!isEditSession && errors.size && (
              <p className="text-red-500">{errors.size.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-5 w-full">
            <label>Color</label>
            <select
              id="color"
              {...register(
                "color",
                isEditSession
                  ? {}
                  : {
                      required: "This field is required",
                    }
              )}
              className="px-3 py-4 w-full focus:outline-none border border-grey-300 rounded-sm"
              disabled={isWorking}
            >
              <option value="">Select Color</option>
              <option value="black">Black</option>
              <option value="white">White</option>
              <option value="red">yellow</option>
              <option value="blue">Blue</option>
            </select>
            {!isEditSession && errors.color && (
              <p className="text-red-500">{errors.color.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5 w-full">
          <label>Sub Description</label>
          <ReactQuill
            theme="snow"
            className="flex-1 rounded-xl bg-white"
            value={value}
            onChange={setValue}
            readOnly={isWorking}
          />
        </div>

        <div className="flex flex-col gap-5 mt-4">
          <label>Upload Image</label>
          <input
            accept="image/*"
            type="file"
            id="image"
            {...register(
              "image",
              isEditSession ? {} : { required: "This field is required" }
            )}
            className="px-3 py-4 w-full focus:outline-none border border-grey-300 rounded-sm"
            disabled={isWorking}
          />
          {!isEditSession && errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
        </div>

        <div className="flex flex-row justify-end items-center my-1 gap-4">
          <button
            type="submit"
            disabled={isWorking}
            className="dark:bg-slate-950 bg-blue-500 text-white py-5 px-5 rounded-md border-none focus:outline-none"
          >
            {isEditSession ? "Update" : "Create"}
          </button>
          <button
            type="button"
            onClick={() => onCloseModal?.()}
            className="bg-red-500 text-white py-5 px-5 rounded-md border-none focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
export default CreateProduct;

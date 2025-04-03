import { UseProducts } from "../hooks/useProduct/UseProduct";

function OperactionPrice() {
  const { handleSort } = UseProducts();
  return (
    <div className="flex items-center gap-10">
      <Filter
        options={[
          { value: "desc", label: "high to low price" },
          { value: "asc", label: "low to high price" },
          { value: "new", label: "newest products" },
          { value: "old", label: "oldest products" },
        ]}
        onChange={handleSort}
      />
    </div>
  );
}

function Filter({ options, onChange }) {
  return (
    <select
      onChange={onChange}
      className="bg-none outline-none px-6 py-4 dark:bg-slate-950 dark:border-slate-800 border-gray-300 border-2"
    >
      <option value="">Sort Option </option>
      <option value="/product/all"> All </option>
      {options?.map((option) => (
        <option key={option?.value} value={option?.value}>
          {option?.label}
        </option>
      ))}
    </select>
  );
}

export default OperactionPrice;

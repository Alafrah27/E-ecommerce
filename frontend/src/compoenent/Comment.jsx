import { UseSingleProduct } from "../hooks/useProduct/UseProduct";

function Comment() {
  const { SingleProduct } = UseSingleProduct();
  return (
    <div dangerouslySetInnerHTML={{ __html: SingleProduct?.subdescription }} />
  );
}

export default Comment;

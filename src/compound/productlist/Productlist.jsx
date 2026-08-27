import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useProductStore from "../../store/Store";

const Productdetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    product,
    loading,
    error,
    fetchProductDetails,
  } = useProductStore();

  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
    }
  }, [id, fetchProductDetails]);

  if (loading) {
    return (
      <div className="
        min-h-screen
        flex
        justify-center
        items-center
      ">
        <p className="text-xl font-semibold">
          Loading product details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-10">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <div className="
        max-w-5xl
        mx-auto
        bg-white
        rounded-2xl
        shadow-lg
        overflow-hidden
      ">

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
        ">

          {/* Image */}
          <div className="
            bg-slate-50
            flex
            items-center
            justify-center
            p-8
          ">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="
                w-full
                max-h-[450px]
                object-contain
              "
            />
          </div>

          {/* Details */}
          <div className="p-8">

            <span className="
              inline-block
              bg-slate-100
              px-3
              py-1
              rounded-full
              text-sm
              text-slate-600
            ">
              {product.category}
            </span>

            <h1 className="
              text-3xl
              font-bold
              mt-4
              text-slate-900
            ">
              {product.title}
            </h1>

            <p className="
              text-slate-500
              mt-4
              leading-7
            ">
              {product.description}
            </p>

            <div className="
              mt-6
              flex
              items-center
              gap-4
            ">
              <span className="
                text-3xl
                font-bold
                text-green-600
              ">
                ${product.price}
              </span>

              <span className="text-orange-500">
                ⭐ {product.rating}
              </span>
            </div>

            <div className="
              mt-6
              space-y-3
              text-slate-600
            ">
              <p>
                <strong>Brand:</strong>{" "}
                {product.brand || "N/A"}
              </p>

              <p>
                <strong>Stock:</strong>{" "}
                {product.stock}
              </p>

              <p>
                <strong>Discount:</strong>{" "}
                {product.discountPercentage}%
              </p>
            </div>

            {/* Back */}
            <button
              onClick={() => navigate(-1)}
              className="
                mt-8
                bg-slate-900
                text-white
                px-6
                py-3
                rounded-lg
                hover:bg-indigo-600
                transition
              "
            >
              ← Back
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Productdetails;
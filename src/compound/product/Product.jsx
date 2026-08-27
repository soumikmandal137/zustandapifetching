import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useProductStore from "../../store/Store";

const Productlist = () => {
  const navigate = useNavigate();

  const {
    products,
    loading,
    error,
    fetchProducts,
  } = useProductStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // =========================
  // SEARCH
  // =========================
  const filteredProducts = products.filter((product) => {
    const search = searchTerm.toLowerCase();

    return (
      product.title?.toLowerCase().includes(search) ||
      product.category?.toLowerCase().includes(search) ||
      product.description?.toLowerCase().includes(search)
    );
  });

  // =========================
  // PAGINATION
  // =========================
  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const startIndex =
    (currentPage - 1) * productsPerPage;

  const endIndex =
    startIndex + productsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    endIndex
  );

  // =========================
  // SEARCH HANDLER
  // =========================
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // =========================
  // PAGE CHANGE
  // =========================
  const handlePageChange = (page) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold">
          Loading products...
        </p>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================
  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      {/* ================= HEADER ================= */}
      <h1 className="text-3xl font-bold text-slate-900 text-center mb-8">
        Products
      </h1>

      {/* ================= SEARCH ================= */}
      <div className="max-w-xl mx-auto mb-10">

        <div className="relative">

          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search products..."
            className="
              w-full
              bg-white
              border
              border-slate-200
              rounded-xl
              px-5
              py-4
              pr-12
              text-slate-900
              placeholder-slate-400
              outline-none
              focus:ring-2
              focus:ring-indigo-500
              focus:border-indigo-500
              shadow-sm
            "
          />

          <span
            className="
              absolute
              right-5
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          >
            🔍
          </span>

        </div>

        <p className="text-sm text-slate-500 mt-2">
          {filteredProducts.length} product
          {filteredProducts.length !== 1 ? "s" : ""} found
        </p>

      </div>

      {/* ================= PRODUCTS ================= */}

      {currentProducts.length === 0 ? (

        <div className="text-center py-20">

          <p className="text-xl font-semibold text-slate-700">
            No products found
          </p>

          <p className="text-sm text-slate-500 mt-2">
            Try searching for another product.
          </p>

        </div>

      ) : (

        <>

          <div
            className="
              max-w-7xl
              mx-auto
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              gap-7
            "
          >

            {currentProducts.map((product) => (

              <div
                key={product.id}
                className="
                  group
                  bg-white
                  rounded-2xl
                  overflow-hidden
                  border
                  border-slate-200
                  shadow-sm
                  hover:shadow-xl
                  transition-all
                  duration-300
                "
              >

                {/* ================= IMAGE ================= */}

                <div
                  className="
                    relative
                    h-56
                    bg-slate-50
                    overflow-hidden
                  "
                >

                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="
                      w-full
                      h-full
                      object-cover
                      group-hover:scale-105
                      transition-transform
                      duration-500
                    "
                  />

                  {/* Discount */}

                  <span
                    className="
                      absolute
                      top-3
                      left-3
                      bg-red-500
                      text-white
                      text-xs
                      font-bold
                      px-3
                      py-1.5
                      rounded-full
                    "
                  >
                    {Math.round(
                      product.discountPercentage || 0
                    )}
                    % OFF
                  </span>

                  {/* Rating */}

                  <div
                    className="
                      absolute
                      top-3
                      right-3
                      bg-white
                      px-3
                      py-1.5
                      rounded-full
                      shadow
                      flex
                      items-center
                      gap-1
                    "
                  >

                    <span className="text-yellow-500 text-sm">
                      ★
                    </span>

                    <span className="text-sm font-semibold text-slate-700">
                      {product.rating}
                    </span>

                  </div>

                </div>

                {/* ================= CONTENT ================= */}

                <div className="p-5">

                  {/* Category */}

                  <p
                    className="
                      text-xs
                      font-semibold
                      text-indigo-600
                      uppercase
                      tracking-wide
                    "
                  >
                    {product.category}
                  </p>

                  {/* Title */}

                  <h2
                    className="
                      mt-2
                      text-lg
                      font-bold
                      text-slate-900
                      truncate
                    "
                  >
                    {product.title}
                  </h2>

                  {/* Description */}

                  <p
                    className="
                      mt-2
                      text-sm
                      text-slate-500
                      leading-5
                      line-clamp-2
                      h-10
                    "
                  >
                    {product.description}
                  </p>

                  {/* Price */}

                  <div className="mt-5">

                    <span
                      className="
                        text-2xl
                        font-bold
                        text-slate-900
                      "
                    >
                      ${product.price}
                    </span>

                    {product.discountPercentage > 0 && (
                      <span
                        className="
                          ml-2
                          text-sm
                          text-slate-400
                          line-through
                        "
                      >
                        $
                        {(
                          product.price /
                          (1 -
                            product.discountPercentage / 100)
                        ).toFixed(2)}
                      </span>
                    )}

                  </div>

                  {/* Stock */}

                  <div className="mt-3 flex items-center gap-2">

                    <span
                      className="
                        w-2
                        h-2
                        rounded-full
                        bg-green-500
                      "
                    />

                    <span
                      className="
                        text-xs
                        font-medium
                        text-green-600
                      "
                    >
                      In Stock
                    </span>

                  </div>

                  {/* Button */}

                  <button
                    onClick={() =>
                      navigate(`/products/${product.id}`)
                    }
                    className="
                      mt-5
                      w-full
                      bg-slate-900
                      text-white
                      py-3
                      rounded-xl
                      font-semibold
                      hover:bg-indigo-600
                      transition-colors
                      duration-200
                    "
                  >
                    View Details
                  </button>

                </div>

              </div>

            ))}

          </div>

          {/* ================= PAGINATION ================= */}

          {totalPages > 1 && (

            <div className="flex justify-center items-center gap-2 mt-12">

              {/* Previous */}

              <button
                onClick={() =>
                  handlePageChange(currentPage - 1)
                }
                disabled={currentPage === 1}
                className="
                  px-4
                  py-2
                  rounded-lg
                  border
                  border-slate-200
                  bg-white
                  font-medium
                  text-slate-700
                  hover:bg-slate-900
                  hover:text-white
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                  transition
                "
              >
                ← Previous
              </button>

              {/* Page Numbers */}

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (

                <button
                  key={page}
                  onClick={() =>
                    handlePageChange(page)
                  }
                  className={`
                    w-10
                    h-10
                    rounded-lg
                    border
                    font-medium
                    transition
                    ${
                      currentPage === page
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-indigo-600 hover:text-white"
                    }
                  `}
                >
                  {page}
                </button>

              ))}

              {/* Next */}

              <button
                onClick={() =>
                  handlePageChange(currentPage + 1)
                }
                disabled={currentPage === totalPages}
                className="
                  px-4
                  py-2
                  rounded-lg
                  border
                  border-slate-200
                  bg-white
                  font-medium
                  text-slate-700
                  hover:bg-slate-900
                  hover:text-white
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                  transition
                "
              >
                Next →
              </button>

            </div>

          )}

          {/* Page Info */}

          {filteredProducts.length > 0 && (

            <p className="text-center text-sm text-slate-500 mt-4">
              Page {currentPage} of {totalPages}
            </p>

          )}

        </>

      )}

    </div>
  );
};

export default Productlist;
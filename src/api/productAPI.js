import axios from "axios";

const BASE_URL = "https://dummyjson.com/products";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const makePurchase = async (selectedProductIds, totalDeduction) => {
  // Example API endpoint to handle purchase
  try {
    const response = await axios.post("https://dummyjson.com/checkout", {
      productIds: selectedProductIds,
      totalDeduction: totalDeduction,
    });
    return response.data;
  } catch (error) {
    console.error("Error during purchase:", error);
    throw error;
  }
};

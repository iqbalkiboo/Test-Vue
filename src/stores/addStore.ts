import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

interface Product {
  id?: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const useProductStore = defineStore("product", () => {
  const products = ref<Product[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const successMessage = ref<string | null>(null);

  const fetchProducts = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      products.value = response.data;
    } catch (err) {
      error.value = "Gagal mengambil data produk";
    } finally {
      loading.value = false;
    }
  };

  const addProduct = async (product: Product) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.post(
        "https://fakestoreapi.com/products",
        product
      );
      products.value.push(response.data);
      successMessage.value = "Produk berhasil ditambahkan!";
    } catch (err) {
      error.value = "Gagal menambahkan produk";
    } finally {
      loading.value = false;
    }
  };

  return {
    products,
    loading,
    error,
    successMessage,
    fetchProducts,
    addProduct,
  };
});

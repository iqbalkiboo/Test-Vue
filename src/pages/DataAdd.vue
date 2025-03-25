<script setup lang="ts">

import { ref } from 'vue';
import { useProductStore } from '@/stores/addStore';
import { useRouter } from 'vue-router';
import Preview from "@/components/Base/Preview";
import Dropzone, { type DropzoneElement } from "@/components/Base/Dropzone";

const productStore = useProductStore();
const router = useRouter();

const product = ref({
  title: '',
  price: 0,
  description: '',
  category: '',
  image: '',
});

const showAlert = ref(false);
const alertMessage = ref('');

const displayAlert = (message: string) => {
  alertMessage.value = message;
  showAlert.value = true;
  setTimeout(() => {
    showAlert.value = false;
  }, 5000); // Hide alert after 3 seconds
};

// Add transition for alert
const handleSubmit = async () => {
  await productStore.addProduct(product.value);
  if (productStore.successMessage) {
    displayAlert('Product successfully created!');
    setTimeout(() => {
      router.push('/');
    }, 4000);
  }
};
</script>

<template>
  <div class="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">Tambah Produk</h2>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium">Nama Produk</label>
        <input v-model="product.title" type="text" class="w-full p-2 border rounded" required />
      </div>

      <div>
        <label class="block text-sm font-medium">Harga</label>
        <input v-model="product.price" type="number" class="w-full p-2 border rounded" required />
      </div>

      <div>
        <label class="block text-sm font-medium">Deskripsi</label>
        <textarea v-model="product.description" class="w-full p-2 border rounded" required></textarea>
      </div>

      <div>
        <label class="block text-sm font-medium">Kategori</label>
        <input v-model="product.category" type="text" class="w-full p-2 border rounded" required />
      </div>

      <div>
        <label class="block text-sm font-medium">Gambar (URL)</label>
        <!-- <input v-model="product.image" type="text" class="w-full p-2 border rounded" required /> -->
        <!-- <Dropzone 
                refKey="dropzoneSingleRef" 
                v-model="product.image"
                required
                :options="{
                  url: 'https://httpbin.org/post',
                  thumbnailWidth: 150,
                  maxFilesize: 0.5,
                  maxFiles: 1,
                  headers: { 'My-Awesome-Header': 'header value' },
                }" 
                class="dropzone"
              >
                <div class="text-lg font-medium">
                    Drop files here or click to upload.
                </div>
                <div class="text-gray-600">
                    This is just a demo dropzone. Selected files are
                    <span class="font-medium">not</span> actually uploaded.
                </div>
            </Dropzone> -->
            <div class="px-5 py-2 mt-4 flex flex-col gap-3.5">
              <Preview.Panel>
                <Dropzone
                  refKey="dropzoneSingleRef"
                  :options="{
                    url: 'https://httpbin.org/post',
                    thumbnailWidth: 150,
                    maxFilesize: 0.5,
                    maxFiles: 1,
                    headers: {
                      'My-Awesome-Header': 'header value',
                    },
                  }"
                  class="dropzone"
                >
                  <div class="text-lg font-medium">
                    Drop files here or click to upload.
                  </div>
                  <div class="text-gray-600">
                    This is just a demo dropzone. Selected files are
                    <span class="font-medium">not</span>
                    actually uploaded.
                  </div>
                </Dropzone>
              </Preview.Panel>
              <Preview.Panel type="source">
                <Preview.Highlight>
                  {{`
                    <Dropzone
                      refKey="dropzoneSingleRef"
                      :options="{
                        url: 'https://httpbin.org/post',
                        thumbnailWidth: 150,
                        maxFilesize: 0.5,
                        maxFiles: 1,
                        headers: { 'My-Awesome-Header': 'header value' },
                      }"
                      class="dropzone"
                    >
                      <div class="text-lg font-medium">
                        Drop files here or click to upload.
                      </div>
                      <div class="text-gray-600">
                        This is just a demo dropzone. Selected files are
                        <span class="font-medium">not</span> actually
                        uploaded.
                      </div>
                    </Dropzone>
                  `}}
                </Preview.Highlight>
            </Preview.Panel>
          </div>
      </div>
      <div class="flex items-center">
        <button 
          type="submit" 
          class="w-full p-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="productStore.loading"
        >
          <span v-if="!productStore.loading">Tambah Produk</span>
          <span v-else class="flex items-center justify-center">
            <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle 
                class="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                stroke-width="4"
                fill="none"
              />
              <path 
                class="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </span>
        </button>
      </div>

      <p v-if="productStore.successMessage" class="text-green-600 mt-2">
        <!-- {{ productStore.successMessage }} -->
        <Transition name="slide">
          <div v-if="showAlert" class="notification success" style="left: 50%; transform: translateX(-50%);">
            {{ productStore.successMessage }}
          </div>
        </Transition>
      </p>
    </form>
  </div>
</template>

<style>
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 25px;
  border-radius: 4px;
  color: white;
  animation: slideIn 0.3s ease-in-out;
  text-align: center;
  z-index: 9999;
}

.notification.success {
  background-color: #48bb78;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>

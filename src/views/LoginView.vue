<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')

const login = () => {
  if (email.value === 'admin@oraflow.com' && password.value === '123456') {
    localStorage.setItem('authenticated', 'true')
    router.push(name = 'Dashboard')
  } else {
    error.value = 'Email ou mot de passe incorrect'
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center px-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-indigo-600">OraFlow</h1>
        <p class="text-gray-500 mt-2">Connexion à votre espace</p>
      </div>

      <form @submit.prevent="login" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"> Adresse email </label>

          <input
            v-model="email"
            type="email"
            placeholder="admin@oraflow.com"
            class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"> Mot de passe </label>

          <input
            v-model="password"
            type="password"
            placeholder="********"
            class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <p v-if="error" class="text-red-500 text-sm">
          {{ error }}
        </p>

        <button
          type="submit"
          class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition"
        >
          Se connecter
        </button>
      </form>
    </div>
  </div>
</template>

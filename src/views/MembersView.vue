<!--
  -   @project     OraFlow
  -   @file        MembersView.vue
  -   @author      Manfred MOUKATE <moukatemanfred@gmail.com>
  -   @version     1.0.0
  -   @since       08/06/2026, 21:48
  -   @copyright   © 2026 Manfred MOUKATE. All rights reserved.
  -->

<script setup>
import { ref, computed } from 'vue'

const members = ref(['ABIBI', 'JORDAN', 'WILL', 'MARIE', 'PAUL', 'ESTHER', 'DAVID', 'SARAH'])

const newMember = ref('')

const totalMembers = computed(() => members.value.length)

const addMember = () => {
  const name = newMember.value.trim().toUpperCase()

  if (!name) return

  if (members.value.includes(name)) {
    alert('Ce membre existe déjà')
    return
  }

  members.value.push(name)
  newMember.value = ''
}

const removeMember = (index) => {
  if (confirm('Supprimer ce membre ?')) {
    members.value.splice(index, 1)
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-100 p-6">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-slate-800">Gestion des membres</h1>

      <p class="text-slate-500 mt-1">Ajoutez ou supprimez les membres de l'équipe de prière.</p>
    </div>

    <!-- Stat -->
    <div class="bg-white rounded-2xl shadow-sm p-5 mb-6">
      <div class="text-sm text-slate-500">Nombre total de membres</div>

      <div class="text-4xl font-bold text-indigo-600 mt-2">
        {{ totalMembers }}
      </div>
    </div>

    <!-- Ajout -->
    <div class="bg-white rounded-2xl shadow-sm p-5 mb-6">
      <h2 class="text-lg font-semibold mb-4">Ajouter un membre</h2>

      <div class="flex gap-3">
        <input
          v-model="newMember"
          type="text"
          placeholder="Nom du membre"
          class="flex-1 border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          @keyup.enter="addMember"
        />

        <button
          @click="addMember"
          class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 rounded-lg font-medium transition"
        >
          Ajouter
        </button>
      </div>
    </div>

    <!-- Liste -->
    <div class="bg-white rounded-2xl shadow-sm p-5">
      <h2 class="text-lg font-semibold mb-4">Liste des membres</h2>

      <div v-if="members.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="(member, index) in members"
          :key="member"
          class="border border-slate-200 rounded-xl p-4 flex items-center justify-between"
        >
          <div>
            <div class="font-semibold text-slate-800">
              {{ member }}
            </div>
          </div>

          <button @click="removeMember(index)" class="text-red-500 hover:text-red-700">
            Supprimer
          </button>
        </div>
      </div>

      <div v-else class="text-center py-12 text-slate-500">Aucun membre enregistré.</div>
    </div>
  </div>
</template>

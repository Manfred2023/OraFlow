<!--
  -   @project     OraFlow
  -   @file        ProgramView.vue
  -   @author      Manfred MOUKATE <moukatemanfred@gmail.com>
  -   @version     1.0.0
  -   @since       08/06/2026, 21:50
  -   @copyright   © 2026 Manfred MOUKATE. All rights reserved.
  -->

<template>
  <div class="min-h-screen bg-slate-100">
    <div class="max-w-7xl mx-auto p-5 md:p-10">
      <!-- HEADER -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-slate-800">Programme hebdomadaire</h1>

          <p class="text-slate-500 mt-1">Génération automatique du programme de prière.</p>
        </div>

        <button
          @click="generateProgram"
          class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium"
        >
          Générer le programme
        </button>
      </div>

      <!-- CONTENT -->
      <div v-if="program.length" class="grid gap-5">
        <div v-for="item in program" :key="item.day" class="bg-white rounded-2xl shadow-sm p-5">
          <h2 class="text-xl font-bold text-indigo-600 mb-4">
            {{ item.day }}
          </h2>

          <div class="space-y-3">
            <div>
              <span class="font-semibold">Responsable :</span>
              {{ item.responsible }}
            </div>

            <div>
              <span class="font-semibold">Animation :</span>
              {{ item.animation }}
            </div>

            <div>
              <span class="font-semibold">Prière :</span>
              {{ item.prayer }}
            </div>

            <div>
              <label class="block mb-1 font-semibold"> Verset </label>

              <input
                v-model="item.verse"
                type="text"
                placeholder="Ex : Jean 3:16"
                class="w-full border border-slate-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- EMPTY STATE -->
      <div v-else class="bg-white rounded-2xl p-10 text-center text-slate-500">
        Aucun programme généré.
      </div>
      <div class="pt-10"></div>
      <div class="flex gap-3">
        <button
          @click="generateProgram"
          class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium"
        >
          Générer
        </button>

        <button
          @click="copyToWhatsApp"
          class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium"
        >
          Copier WhatsApp
        </button>

        <button
          @click="downloadTxt"
          class="bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-xl font-medium"
        >
          Télécharger
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const members = [
  'JUNIOR',
  'MAMA GISELE',
  'MAMA KATHY',
  'DIAMANT BLEU',
  'MAMA POUPINA',
  'MAMA FLORENTINE',
  'PAPA JP',
  'NKANA',
  'TATARA',
  'PATRIACHE',
  'PAPA GUY',
  'ANDY',
  'PAPA FELIX',
  'ABOUTCHOU',
  'MAMYNYANGA',
  'ABIBI',
  'MAMA CLAUDE',
  'PAPA REPE',
  'NDOME',
  'EVRA',
  'PRINCESSE',
  'KRITIKOS',
]

const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

const program = ref([])

function getWeekRange(date = new Date()) {
  const start = new Date(date)

  // Lundi = début de semaine
  const day = start.getDay()
  const diff = day === 0 ? -6 : 1 - day
  start.setDate(start.getDate() + diff)

  const end = new Date(start)
  end.setDate(start.getDate() + 6)

  return { start, end }
}
function formatDateShort(date) {
  const d = String(date.getDate()).padStart(2, '0')
  const m = String(date.getMonth() + 1).padStart(2, '0')
  return `${d}/${m}`
}
function formatWhatsApp(program) {
  const { start, end } = getWeekRange()

  const title = `📖 PROGRAMME DE PRIÈRE\nDu ${formatDateShort(start)} au ${formatDateShort(end)}\n\n`

  let text = title

  program.forEach((item) => {
    text += `📅 *${item.day}*\n`
    text += `Responsable : ${item.responsible}\n`
    text += `Animation : ${item.animation}\n`
    text += `Prière : ${item.prayer}\n`
    text += `Verset : ${item.verse || '—'}\n\n`
  })

  text += `🙏 Que Dieu vous bénisse !`

  return text
}
function copyToWhatsApp() {
  const text = formatWhatsApp(program.value)

  navigator.clipboard.writeText(text)

  alert('Programme copié pour WhatsApp !')
}
function downloadTxt() {
  const text = formatWhatsApp(program.value)

  const blob = new Blob([text], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = 'programme-priere.txt'
  a.click()

  URL.revokeObjectURL(url)
}

function shuffle(array) {
  const arr = [...array]

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }

  return arr
}

function generateProgram() {
  const shuffled = shuffle(members)

  const required = days.length * 3

  if (shuffled.length < required) {
    alert(`Il faut au moins ${required} membres.`)
    return
  }

  let index = 0

  program.value = days.map((day) => ({
    day,
    verse: '',
    responsible: shuffled[index++],
    animation: shuffled[index++],
    prayer: shuffled[index++],
  }))
}
</script>

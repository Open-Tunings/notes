<script setup>
import { useLessons } from '~~/composables/useLessons'

const route = useRoute()
const levelId = Number(route.params.id)

const { topics, fetchTopics } = useLessons()

onMounted(() => {
  fetchTopics(levelId)
})
</script>

<template>
  <ul>
    <li v-for="topic in topics" :key="topic.id">
      <NuxtLink :to="`/topics/${topic.id}`">
        {{ topic.title }}
      </NuxtLink>
    </li>
  </ul>
</template>

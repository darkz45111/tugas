<script setup lang="ts">
import { ref } from 'vue'
import type { ContentItem } from '../../types/content'
import ContentCard from './ContentCard.vue'

defineProps<{
  title: string
  items: ContentItem[]
  size?: 'small' | 'medium' | 'large'
}>()
</script>

<template>
  <div class="section-slider mb-8">
    <h2 class="section-title">{{ title }}</h2>
    
    <div class="slider">
      <div 
        v-for="item in items" 
        :key="`${item.type}-${item.id}`"
        class="slider-item"
      >
        <ContentCard :item="item" :size="size" />
      </div>
    </div>
  </div>
</template>
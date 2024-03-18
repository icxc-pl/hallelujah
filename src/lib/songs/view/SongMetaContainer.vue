<script lang="ts" setup>
import { type PropType } from 'vue';
import { type ISongMeta } from '../model';
import TermDescription from '@/components/elements/TermDescription.vue';

defineProps({
  meta: {
    type: Object as PropType<ISongMeta>,
    required: true
  }
});
</script>

<template>
  <div class="song-meta-container">
    <dl>
      <TermDescription name="Autor" :value="meta.author" />
      <TermDescription name="Alternatywny tytuł" :value="meta.alternativeTitle" />
      <TermDescription name="Oryginalny tytuł" :value="meta.originalTitle" />
      <TermDescription name="Album" :value="meta.album" />
      <TermDescription name="Copyright" :value="meta.copyright" />
      <TermDescription name="Tłumaczenie" :value="meta.translation" />
      <TermDescription name="Na podstawie" :value="meta.basedOn" />
      <TermDescription name="Tekst" :value="meta.lyrics" />
      <TermDescription name="Muzyka" :value="meta.music" />
      
      <template v-if="meta.url">
      <dt>Link</dt>
      <dd>
        <a :href="meta.url.value" target="_blank" rel="noopener noreferrer">
          {{ meta.url.type }}
        </a>
      </dd>
      </template>
    </dl>
  </div>
</template>

<style lang="less">
.song-meta-container {
  padding: var(--side-margin-h) var(--side-margin-v);

  dl {
    display: grid;
    grid-template-columns: 37% 1fr;
    font-size: 0.75em;

    dt {
      color: var(--color-inferior-text);
    }
  }
}
</style>

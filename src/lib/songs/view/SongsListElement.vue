<script lang="ts" setup>
import '@/assets/components/SongsListElement.less';

import { computed, type PropType } from 'vue';
import { RouterLink } from 'vue-router';
import { type ISong } from '../model';

const props = defineProps({
  song: {
    type: Object as PropType<ISong>,
    required: true
  },
  searchingActive: {
    type: Boolean,
    default: false
  },
  searchingPhrase: {
    type: String,
    default: ''
  }
});

const link = computed((): string => {
  return '/song/' + props.song.hash;
});

const isAuthor = computed((): boolean => {
  return props.song.meta.author != null;
});

const getOccurrence = computed((): string => {
  const regex = new RegExp(props.searchingPhrase, 'ig');
  const lines = props.song.searchText.split("\n");
  let findings: string[] = [];
  let lastOccurrence = -1;
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (regex.test(line)) {
      if (lastOccurrence > -1 && i - lastOccurrence >= 3) {
        findings.push(lines[lastOccurrence + 1]);
      }
      
      if (lastOccurrence > -1 && i - lastOccurrence > 3) {
        findings.push('...');
      } 

      if (i - lastOccurrence >= 2) {
        findings.push(lines[i - 1]);
      }
      
      findings.push(
        line.replace(regex, (m: string) => `<mark>${m}</mark>`)
      );
      lastOccurrence = i;
    }
  }

  if (lastOccurrence != lines.length - 1) {
    findings.push(lines[lastOccurrence + 1]);
  }

  return findings.join("<br>");
});

</script>

<template>
  <li class="songs-list-element">
    <RouterLink :to="link">
      <strong>{{ song.title }}</strong>
      <span v-if="searchingActive"
        class="subtext"
        title="Znalezione wystąpienie"
        v-html="getOccurrence"></span>
      <span v-else-if="isAuthor"
        class="subtext"
        title="Autor">{{ song.meta.author }}</span>
    </RouterLink>
  </li>
</template>

<style lang="less">
</style>

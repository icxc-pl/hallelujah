<script lang="ts" setup>
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
  <li class="song-list-element">
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
li.song-list-element {
  display: block;
  overflow: auto;

  a {
    display: block;
    color: var(--color-link);
    text-decoration: none;
    margin: var(--side-margin-h) var(--side-margin-v);
    position: relative;

    strong {
      display: block;
      font-size: 1.1rem;
    }

    span.subtext {
      display: block;
      font-size: 0.9rem;
      color: var(--color-inferior-text);
    }

    &::after {
      display: block;
      content: '';
      border-top: 2px solid var(--separator-color);
      position: relative;
      bottom: calc(-1 * var(--side-margin-h));
    }
  }
}
</style>

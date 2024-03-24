<script lang="ts" setup>
import { shallowReactive, computed } from 'vue';
import { DataContainer } from '@/lib/vue/DataContainer';

import { type ISong } from '@/lib/songs/model/ISong';
import { getSongsList, searchSongs } from '@/lib/client';

import ViewLayout from '@/components/ViewLayout.vue';
import SearchInput from '@/components/elements/SearchInput.vue';
import InfoScreen from '@/components/elements/InfoScreen.vue';
import SongsList from '@/lib/songs/view/SongsList.vue';

const container: DataContainer = shallowReactive(new DataContainer());
const searching = shallowReactive({
  active: false,
  phrase: ''
});

const areSongs = computed(() => {
  return (container.data as Array<ISong>).length > 0;
});

const noSongsScreenTitle = computed(() => {
  return searching.active ? 'Nie znaleziono' : 'Brak piosenek';
});

const noSongsScreenText = computed(() => {
  return searching.active ? 'W śpiewniku nie ma żadnej piosenki pasującej do szukanej frazy' : 'Wygląda na to, że nie ma żadnych piosenek w bazie';
});

function handleSearch(phrase: string) {
  phrase = phrase.trim();

  if (phrase.length > 2) {
    if (!searching.active || searching.phrase !== phrase) {
      searchFor(phrase);
    }
  } else {
    if (searching.active) {
      getWholeList();
    }
  }
}

function searchFor(phrase: string) {
  container.loading = true;
  searching.active = true;
  searching.phrase = phrase;
  searchSongs(phrase).then((data: Array<ISong>) => {
    container.setData(data);
  });
}

function getWholeList() {
  container.loading = true;
  searching.active = false;
  searching.phrase = '';
  getSongsList().then((data: Array<ISong>) => {
    container.setData(data);
  });
}

getWholeList();
</script>

<template>
  <ViewLayout
    :loading-enabled="true"
    :loading-state="container.loading">

    <template #toolbar>
      <SearchInput @input="handleSearch" />
    </template>

    <template #content>
        <SongsList v-if="areSongs"
          :songs="(container.data as Array<ISong>)"
          :searching-active="searching.active"
          :searching-phrase="searching.phrase" />
        <InfoScreen v-else
          icon="EmojiSad"
          :title="noSongsScreenTitle"
          :text="noSongsScreenText" />
    </template>

  </ViewLayout>
</template>

<style lang="less">

</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import { Song } from '../model/Song';
import { SongMeta } from '../model/SongMeta';
import { SongMetaType } from '../model/SongMetaType';

export default defineComponent({
  components: {
    RouterLink
  },

  props: {
    song: {
      type: Song,
      required: true
    }
  },

  computed: {
    link(): string {
      return '/song/' + this.song.id;
    },

    metaList(): SongMeta[] {
      const metaList: SongMeta[] = [];
      
      for (const meta of this.song.meta) {
        if (meta.type == SongMetaType.AUTHOR) {
          metaList.push(meta);
        }
      }

      return metaList;
    },

    shouldRenderMeta(): boolean {
      return this.metaList.length > 0;
    }
  }
});
</script>

<template>
  <li>
    <RouterLink :to="link">
      <strong>{{ song.title }}</strong>
      <dl v-if="shouldRenderMeta">
        <template v-for="meta in metaList"
          :key="meta.uuid">
          <dt>{{ meta.type }}</dt>
          <dd>{{ meta.value }}</dd>
        </template>
      </dl>
    </RouterLink>
  </li>
</template>

<style lang="less" scoped>
li {
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
      font-size: 1.1em;
    }

    dl {
      color: var(--color-inferior-text);
      margin-block: 0;

      dt {
        position: absolute !important;
        height: 1px;
        width: 1px;
        overflow: hidden;
        clip: rect(1px, 1px, 1px, 1px);
      }
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

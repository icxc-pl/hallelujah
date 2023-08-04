<script lang="ts">
import { defineComponent, h, type VNode, ref } from 'vue';
import { SongPresenter } from '@/songs/view/SongPresenter';
import { useSongsStore } from '@/stores/songs';
import SearchBar from '@/components/SearchBar.vue'
import dice from 'fast-dice-coefficient';

export default defineComponent({
  setup() {
    const { songs, state } = useSongsStore();
    let searchedPhrase = ref("");

    return () => {
      const children: VNode[] = [];

      if (searchedPhrase.value == "") {
        // show whole list
        for (let song of songs) {
          const songPresenter = new SongPresenter(song);
          children.push(songPresenter.renderListItem());
        }

      } else {
        // show only search results
        for (let song of songs) {
          const d = dice(song.title.toLocaleLowerCase().replace(" ", ""), searchedPhrase.value);
          console.log(song.title, d);
          if (d < 0.25) {
            console.log('pass')
            continue;
          }

          const songPresenter = new SongPresenter(song);
          children.push(songPresenter.renderListItem());
        }
      }

      return h('div', [
        h(SearchBar, {
          onInput: (phrase: string) => {
            searchedPhrase.value = phrase.toLocaleLowerCase().replace(" ", "");
          }
        }),
        h('ul', children)
      ]);
    };
  }
});
</script>

<style lang="less" scoped>
div {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 3rem 1fr;
  grid-template-areas: 'search-bar' 'song-list';

  form {
    grid-area: search-bar;
  }

  ul {
    grid-area: song-list;
    overflow: auto;
    display: block;
    list-style: none;
    margin: 0;
    padding: 0;

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
  }
}
</style>

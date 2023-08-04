<script lang="ts">
import { defineComponent, h, type VNode } from 'vue';
import { SongPresenter } from '@/songs/view/SongPresenter';
import { useSongsStore } from '@/stores/songs';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const { setCurrent, state } = useSongsStore();
    const route = useRoute()
    setCurrent(route.params['id'] as string);

    return () => {
      if (state.song == null) {
        return [];
      }

      const children: VNode[] = [];
      const songPresenter = new SongPresenter(state.song);

      children.push(songPresenter.renderTitle());
      children.push(...songPresenter.renderVerses());

      return h('article', children);
    };
  }
});
</script>

<style lang="less" scoped>

article {
  overflow: auto;

  h1, p {
    margin: var(--side-margin-h) var(--side-margin-v);
  }

  h1 {
    line-height: 1em;
  }
}

</style>

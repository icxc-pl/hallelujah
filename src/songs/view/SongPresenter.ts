import { h, type VNode, type VNodeArrayChildren } from 'vue';
import { RouterLink } from 'vue-router';
import { Song } from '../model/Song';
import { SongMeta } from '../model/SongMeta';
import { SongMetaType } from '../model/SongMetaType';
import { SongVerse } from '../model/SongVerse';

export class SongPresenter {
  song: Song;

  constructor(song: Song) {
    this.song = song;
  }

  getLink() {
    return '/song/' + this.song.id;
  }

  renderTitle(): VNode {
    return h('h1', this.song.title);
  }

  renderVerses(): VNode[] {
    return this.song.verses.map(this.renderVerse);
  }

  renderVerse(verse: SongVerse): VNode {
    const children: VNodeArrayChildren = [];    
    for (const line of verse.lines) {
      if (children.length > 0) {
        children.push(h('br'));
      }

      children.push(line.text);
    }

    return h('p', children);
  }

  renderListItem(): VNode {
    return h('li', [
      h(
        RouterLink,
        {
          to: this.getLink()
        },
        () => {
          const children: VNode[] = [h('strong', this.song.title)];

          const metaData = this.renderMeta();
          if (metaData != null) {
              children.push(metaData);
          }

          return children;
        }
      )
    ]);
  }

  renderMeta(): VNode | null {
    const children: VNode[] = [];

    {
      const authorEntry: SongMeta | null = this.song.getMetaByType(SongMetaType.AUTHOR);
      if (authorEntry != null) {
        children.push(...this.renderMetaEntry(authorEntry));
      }
    }

    if (children.length > 0) {
      return h('dl', children);
    }

    return null;
  }

  renderMetaEntry(entry: SongMeta): VNode[] {
    return [h('dt', entry.type), h('dd', entry.value)];
  }
}

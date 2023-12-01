import ABCPlayer from './components/Player';
import CustomMenu from './components/Menu';
import ThemeToggle from './components/ThemeToggle';
import { ListFile, MusicFile } from './type';
import { useFetch } from './hooks/useFetch';
import { Show } from 'solid-js';

const App = () => {

  const [filesData] = useFetch<{ files: ListFile[] }, ListFile[]>('https://ungh.cc/repos/holy-two/musicbox-papertape/files/main', 'json', {
    parseFn(from) {
      return from.files.filter(item => item.path.includes('tapes'))
    },
    defaultValue() {
      return []
    },
  })

  const [musicData, {
    refetch
  }] = useFetch<MusicFile, string>('https://ungh.cc/repos/holy-two/musicbox-papertape/files/main/tapes/index.abc', 'json', {
    parseFn(from) {
      return from.file.contents
    },
    defaultValue() {
      return ''
    }
  })

  const handOnClick = (item: ListFile) => {
    refetch(`https://ungh.cc/repos/holy-two/musicbox-papertape/files/main/${item.path}`)
  }

  return <>
    <aside class="na-layout-aside na-watermark pt-1em">
      <CustomMenu onclick={handOnClick} files={filesData()} />
      <ThemeToggle />
    </aside>
    <Show when={!!musicData()}>
      <ABCPlayer getMusicData={musicData} />
    </Show>
  </>
};

export default App;

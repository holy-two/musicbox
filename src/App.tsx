import ABCPlayer from './components/Player';
import CustomMenu from './components/Menu';
import { ListFile, MusicFile, MusicList } from './type';
import { useFetch } from './hooks/useFetch';
import { Show } from 'solid-js';

const App = () => {

  const [filesData] = useFetch<{ files: ListFile[] }, ListFile[]>('https://ungh.cc/repos/holy-two/musicbox-papertape/files/main', 'json', {
    parseFn(from) {
      return from.files.filter(item => item.path.includes('docs'))
    },
    defaultValue() {
      return []
    },
  })

  const [musicData, {
    refetch
  }] = useFetch<MusicFile, string>('https://ungh.cc/repos/holy-two/musicbox-papertape/files/main/docs/index.abc', 'json', {
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

  return <div class="flex justify-around w-full h-screen  overflow-hidden" >
    <CustomMenu onclick={handOnClick} files={filesData()} />
    <Show when={!!musicData()}>
      <ABCPlayer musicData={musicData()} />
    </Show>
  </div>
};

export default App;

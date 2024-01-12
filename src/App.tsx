import ABCPlayer from './components/Player';
import CustomMenu from './components/Menu';
import ThemeToggle from './components/ThemeToggle';
import { ListFile, MusicFile } from './type';
import { useFetch } from './hooks/useFetch';
import { Show } from 'solid-js';

const App = () => {
  console.log(import.meta.env);
  
  const [filesData] = useFetch<{ files: ListFile[] }, ListFile[]>(
    import.meta.env.VITE_ABC_GITHUB_REPOSITORY_BASE_URL,
    'json',
    {
      parseFn(from) {
        return from.files.filter(item => item.path.includes('tapes'))
      },
      defaultValue() {
        return []
      },
    }
  )

  const [musicData, {
    refetch
  }] = useFetch<MusicFile, string>(
    import.meta.env.VITE_ABC_GITHUB_REPOSITORY_BASE_URL
    +
    import.meta.env.VITE_INDEX_ABC_PATH,
    'json',
    {
      parseFn(from) {
        return from.file.contents
      },
      defaultValue() {
        return ''
      }
    }
  )

  const handOnClick = (item: ListFile) =>
    refetch(`${import.meta.env.VITE_ABC_GITHUB_REPOSITORY_BASE_URL}/${item.path}`)

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

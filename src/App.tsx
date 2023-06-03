import { Component, createEffect, createSignal } from 'solid-js';
import ABCPlayer from './components/Player';
import CustomMenu from './components/Menu';
import { ListFile, MusicFile, MusicList } from './type';
import { useFetch } from './unitl/useFetch';

const App: Component = () => {
  const [filesData, setFilesData] = createSignal(null);
  const [musicData, setMusicData] = createSignal(null);
  createEffect(() => {
    useFetch('https://ungh.cc/repos/holy-two/musicbox-papertape/files/main').then((res: MusicList)=>{
       const filesArr = res.files.filter(item => item.path.includes("docs"))
      setFilesData(filesArr)
     })
    
    useFetch('https://ungh.cc/repos/holy-two/musicbox-papertape/files/main/docs/Air auf der G-Saite.abc').then((res: MusicFile) => {
      console.log(res)
      setMusicData(res.file.contents)
        
    })
  }, [])
  const handOnClick = (item: ListFile, i: number)=>{
  console.log(item, i)
    useFetch(`https://ungh.cc/repos/holy-two/musicbox-papertape/files/main/${item.path}`).then((res: MusicFile) => {
      console.log(res)
      setMusicData(res.file.contents)
    })
}

  return <div class="flex justify-around w-full h-screen  overflow-hidden" >
    <CustomMenu onclick={(item, i) => handOnClick(item, i)} files={filesData()} />
    <ABCPlayer musicData={musicData() }/>
  </div>
};

export default App;

import { createEffect, createSignal } from "solid-js";
import { ListFile } from "../../type";
const useSubstring = (sub: string) => {
  const startIndex = sub.indexOf('/') + 1;
  const endIndex = sub.indexOf('.');
  if (startIndex > 0 && endIndex > 0) {
    const extractedString = sub.substring(startIndex, endIndex);
    return extractedString;
  }
  return null;
}

const Tree = ({ treeOnclick, filesArr }) => {
  return <div >
    {
      filesArr.map((item: ListFile, i: number) => <div class="w-auto h-6 b-purple-400 b-l-0 b-r-0 b-1.5 b-solid p-1.5 cursor-pointer hover:bg-blue-200"
        onClick={() => treeOnclick(item, i)}
      >
        {useSubstring(item.path)}
      </div>)
    }
  </div>
}


const CustomMenu = (props: { files: ListFile[], onclick: (item: ListFile, i: number) => void }) => {
  return (
    <div class="w-80 h-auto  bg-red-200 overflow-auto">
      {props.files.length > 0 && <Tree filesArr={props.files} treeOnclick={(item: ListFile, i: number) => props.onclick(item, i)}></Tree>}
    </div>
  );
};

export default CustomMenu;

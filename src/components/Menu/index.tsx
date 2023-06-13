import { Show, For } from "solid-js";
import { ListFile } from "../../type";

const Tree = ({ treeOnclick, filesArr }) => {
  const substringOf = (resource: string) => [resource.indexOf('/') + 1, resource.indexOf('.')]
    .reduce((acc, n, index) => {
      if (index == 0) {
        acc.start = n
        return acc
      }
      if (index == 1) {
        acc.end = n
        return acc
      }
      return acc
    }, {
      start: 0,
      end: resource.length,
      get result() {
        const { start, end } = this
        if (start > 0 && end > 0) {
          return resource.substring(this.start, this.end)
        }
        return ''
      }
    }).result

  return <For each={filesArr}>
    {
      (item, index) => <div class="w-a h-6 b-purple-400 b-l-0 b-r-0 b-1.5 b-solid p-1.5 cursor-pointer hover:bg-blue-200"
        onClick={() => treeOnclick(item, index)}
      >
        {substringOf(item.path)}
      </div>
    }
  </For>
}

const CustomMenu = (props: { files: ListFile[], onclick: (item: ListFile, i: number) => void }) => {
  return (
    <div class="w-80 h-auto  bg-red-200 overflow-auto">
      <Show when={props.files.length > 0}>
        <Tree filesArr={props.files} treeOnclick={(item: ListFile, i: number) => props.onclick(item, i)} />
      </Show>
    </div>
  );
};

export default CustomMenu;

import { Show, For } from "solid-js";
import { ListFile } from "../../type";


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

const CustomMenu = ((props: {
  files: ListFile[],
  onclick: (item: ListFile) => void
}) => {
  return (
    <div class="flex flex-col w-80 h-auto bg-red-200 overflow-auto">
      <Show when={props.files.length > 0}>
        <For each={props.files}>
          {
            item => <div style={{
              order: substringOf(item.path) === 'index' ? -1 : 1
            }} class="w-a h-6 b-purple-400 b-l-0 b-r-0 b-1.5 b-solid p-1.5 cursor-pointer hover:bg-blue-200"
              onClick={() => props.onclick(item)}
            >
              {substringOf(item.path)}
            </div>
          }
        </For>
      </Show>
    </div>
  );
});

export default CustomMenu;

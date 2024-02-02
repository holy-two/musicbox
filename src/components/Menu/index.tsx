import { Show, For, createSignal } from "solid-js";
import { ListFile } from "𝄞/type";

const getFileName = (path: string) => path.match(/\/(.*?).abc$/)?.at(-1);
const [getCurrentName, setCurrentName] = createSignal<string>("index");

const CustomMenu = (props: {
  files: ListFile[];
  onclick: (item: ListFile) => void;
}) => {
  return (
    <Show when={props.files.length > 0}>
      <ul class="na-menu">
        <For each={props.files}>
          {(item) => (
            <li
              class="na-menu-item cursor-pointer"
              style={{ order: getFileName(item.path) === "index" ? -1 : 1 }}
              {...(getFileName(item.path) === getCurrentName()
                ? {
                    "data-selected": "",
                  }
                : {})}
              onClick={() => {
                setCurrentName(getFileName(item.path));
                props.onclick(item);
              }}
            >
              {getFileName(item.path)}
            </li>
          )}
        </For>
      </ul>
    </Show>
  );
};

export default CustomMenu;

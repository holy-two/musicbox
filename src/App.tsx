import ABCPlayer from "𝄞/components/Player"
import CustomMenu from "𝄞/components/Menu"
import MenuFoldToggle from "𝄞/components/Toggle/menu-fold"
import ThemeToggle from "𝄞/components/Toggle/theme"
import { ListFile, MusicFile } from "𝄞/types"
import { useFetch } from "𝄞/hooks/useFetch"
import { createSignal, Show } from "solid-js"
import { pathJoin } from "𝄞/utils"

const App = () => {
  const [filesData] = useFetch<{ files: ListFile[] }, ListFile[]>(
    import.meta.env.VITE_ABC_GITHUB_REPOSITORY_BASE_URL,
    "json",
    {
      parseFn(from) {
        return from.files.filter(item =>
          new RegExp(
            `^${import.meta.env.VITE_ABC_DIRECTORY_PATH}.*\.abc$`
          ).test(item.path)
        )
      },
      defaultValue() {
        return []
      },
    }
  )

  const [ABCAccessor, { refetch }] = useFetch<MusicFile, string>(
    pathJoin(
      import.meta.env.VITE_ABC_GITHUB_REPOSITORY_BASE_URL,
      import.meta.env.VITE_ABC_DIRECTORY_PATH,
      import.meta.env.VITE_INDEX_ABC_NAME + ".abc"
    ),
    // @ts-ignore
    import.meta.env.VITE_ABC_GITHUB_FILE_REDIRECT ? "text" : "json",
    import.meta.env.VITE_ABC_GITHUB_FILE_REDIRECT
      ? {}
      : {
          parseFn(from) {
            return from.file.contents
          },
          defaultValue() {
            return ""
          },
        }
  )

  const handOnClick = (item: ListFile) =>
    refetch(
      pathJoin(import.meta.env.VITE_ABC_GITHUB_REPOSITORY_BASE_URL, item.path)
    )

  const collapsed = createSignal<boolean>(true)

  return (
    <>
      <aside
        class="na-layout-aside na-watermark pt-1em"
        {...(collapsed[0]()
          ? {
              "data-collapsed": "",
            }
          : {})}
      >
        <CustomMenu onclick={handOnClick} files={filesData()} />
      </aside>
      <Show when={!!ABCAccessor()}>
        <ABCPlayer ABCAccessor={ABCAccessor} />
      </Show>
      <ThemeToggle />
      <MenuFoldToggle collapsed={collapsed} />
    </>
  )
}

export default App

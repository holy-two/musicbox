import type { Accessor } from "solid-js";
import { effect } from "solid-js/web";

export default function useEffect(effection: Parameters<typeof effect>[0], deps: Array<Accessor<unknown>>) {
  return effect(() => {
    for (const access of deps) {
      access()
    }
    effection()
  })
}

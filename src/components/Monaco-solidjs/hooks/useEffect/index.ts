import { AccessorArray, createEffect, on, onCleanup } from "solid-js";

export default function useEffect(effection: () => (() => void) | undefined, deps: AccessorArray<unknown>) {
  return createEffect(on(deps, () => {
    const cleanup = effection()
    cleanup && onCleanup(cleanup)
  }),)
}

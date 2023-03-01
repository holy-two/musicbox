import type { Accessor } from "solid-js";
import { effect, } from "solid-js/web";
import { ref } from "../../utils";
import useEffect from "../useEffect";

export default function useUpdate(effection: Parameters<typeof effect>[0], deps: Array<Accessor<unknown>>, applyChanges = true) {
  const isInitialMounted = ref(true)

  useEffect(isInitialMounted.value || !applyChanges ? () => {
    isInitialMounted.value = false
  } : effection, deps)
}

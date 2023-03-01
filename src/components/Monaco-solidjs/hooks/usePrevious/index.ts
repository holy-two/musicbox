import { createSignal } from "solid-js";
import { ref } from "../../utils";
import useEffect from "../useEffect";

export default function usePrevious<V>(value: V) {
  const [get] = createSignal(value)
  const _ref = ref<V>()

  useEffect(() => {
    _ref.value = get()
  }, [get])
  return _ref.value
}

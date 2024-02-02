import { Accessor, createSignal, onMount } from "solid-js";

export const useFetch = useFetchV2;

export type ResultType = "text" | "blob" | "json";

export type UseFetchReturnType<T extends {}> = [
  result: T,
  otherResults: {
    error: Accessor<Error>;
    fetchCountor: Accessor<number>;
    refetch(resource?: string, fetchOptions?: RequestInit): void;
  }
];

export type ResultTypeToReturnType<
  RT extends ResultType,
  JSONType extends Record<string, any> = any
> = RT extends "json"
  ? UseFetchReturnType<Accessor<JSONType>>
  : RT extends "text"
  ? UseFetchReturnType<Accessor<string>>
  : UseFetchReturnType<Accessor<Blob>>;

export type UseFetchOptionsNotJSON = RequestInit & {
  immediate?: boolean;
  once?: boolean;
};

export type UseFetchOptions<
  RT extends ResultType,
  R
> = UseFetchOptionsNotJSON & {
  defaultValue: RT extends "blob" ? undefined : () => R;
};

export type FetchResultParseFn<From, R = From> = (from: From) => R;

export type UseFetchJSONMOptionsWithParseFn<
  From,
  RT extends ResultType,
  R
> = UseFetchOptions<RT, R> & { parseFn: FetchResultParseFn<From, R> };

export function useFetchV2<
  ResponseJSONType extends Record<string, any>,
  R,
  Options extends UseFetchJSONMOptionsWithParseFn<
    ResponseJSONType,
    "json",
    R
  > = UseFetchJSONMOptionsWithParseFn<ResponseJSONType, "json", R>
>(
  resource: string,
  resultType: "json",
  fetchOption: Options
): ResultTypeToReturnType<"json", R>;
export function useFetchV2<ResponseJSONType extends Record<string, any>>(
  resource: string,
  resultType: "json",
  fetchOption?: UseFetchOptions<"json", ResponseJSONType>
): ResultTypeToReturnType<"json", ResponseJSONType>;
// @ts-ignore 暂时没办法解决重载跟实现检测冲突的问题
export function useFetchV2(
  resource: string,
  resultType: "text",
  fetchOption?: UseFetchOptions<"text", string>
): ResultTypeToReturnType<"text">;
export function useFetchV2(
  resource: string,
  resultType: "blob",
  fetchOption?: UseFetchOptions<"blob", never>
): ResultTypeToReturnType<"blob">;
export function useFetchV2<
  ResponseJSONType extends Record<string, any>,
  RT extends ResultType
>(
  resource: string,
  resultType: RT,
  fetchOption?: UseFetchJSONMOptionsWithParseFn<ResponseJSONType, RT, unknown>
) {
  const {
    immediate = true,
    once,
    parseFn,
    defaultValue,
    ..._restFetchOptions
  } = fetchOption ?? {};

  const [result, setResult] = createSignal<ResponseJSONType | Blob | string>(
    // @ts-ignore 这个地方为了让初始化可以实现
    typeof defaultValue == "function" ? defaultValue() : undefined
  );
  const [error, setError] = createSignal<Error>();

  const [fetchResource, setFetchResource] = createSignal(encodeURI(resource));

  const [fetchCountor, setFetchCountor] = createSignal(0);

  const [restFetchOptions, setRestFetchOptions] = createSignal(
    _restFetchOptions as RequestInit
  );

  const fetchInvoke = () => {
    if (once && fetchCountor() > 0) {
      return;
    }

    fetch(fetchResource(), restFetchOptions())
      .then((response) => {
        try {
          if (resultType == "blob") {
            return response.blob();
          }
          if (resultType == "json") {
            return response.json();
          }
          if (resultType == "text") {
            return response.text();
          }
        } catch (reason) {
          return Promise.reject(reason);
        }
      })
      .then((res) => {
        if (resultType == "json" && typeof parseFn == "function") {
          setResult(parseFn(res) as any);
          return;
        }
        setResult(res);
      })
      .catch((reason) => {
        setError(reason);
      })
      .finally(() => {
        setFetchCountor((n) => n + 1);
      });
  };

  const refetch: UseFetchReturnType<unknown>[1]["refetch"] = (
    resource,
    fetchOption
  ) => {
    if (resource) {
      setFetchResource(encodeURI(resource));
    }

    if (fetchOption) {
      setRestFetchOptions(fetchOption);
    }
    fetchInvoke();
  };

  onMount(() => {
    if (immediate) {
      fetchInvoke();
    }
  });

  return [
    result,
    {
      error,
      refetch,
    },
  ] as ResultTypeToReturnType<RT, ResponseJSONType>;
}

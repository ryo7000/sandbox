import type { SWRConfiguration } from "swr";

function debounce(func: () => void, wait = 1000) {
  let timer: ReturnType<typeof setTimeout> | undefined = undefined;
  return function () {
    clearTimeout(timer);

    if (timer === undefined) {
      timer = setTimeout(() => {
        timer = undefined;
        func();
      }, wait);
    }
  };
}

export const localStorageProvider = () => {
  const map = new Map(JSON.parse(localStorage.getItem("app-cache") || "[]"));

  const set = (key: string, value: any) => {
    map.set(key, value);

    debounce(() => {
      const appCache = JSON.stringify(Array.from(map.entries()));
      localStorage.setItem("app-cache", appCache);
    })();
  };

  return {
    get: (key: string) => map.get(key),
    set,
    delete: (key: string) => map.delete(key),
  };
};

export const config: SWRConfiguration = {
  suspense: true,
  revalidateOnFocus: false,
  revalidateIfStale: false,
};

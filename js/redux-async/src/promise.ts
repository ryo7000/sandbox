export const wrapPromise = <T>(promise: Promise<T>) => {
  let status: "pending" | "fulfilled" | "rejected" = "pending";
  let result: T | Error;

  const suspender = promise.then(
    (res) => {
      status = "fulfilled";
      result = res;
    },
    (err) => {
      status = "rejected";
      result = err;
    }
  );

  const read = () => {
    if (status === "pending") {
      throw suspender;
    } else if (status === "rejected") {
      throw result;
    }

    return result as T;
  };

  return { read };
};

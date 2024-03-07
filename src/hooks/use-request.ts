"use client";

import useSWR from "swr";

interface UseRequestProps {
  url: string;
}

export function useRequest({ url }: UseRequestProps) {
  const request = async (url: string) =>
    fetch(url, { next: { revalidate: 60 } }).then(async (res) => res.json());

  const { data, error, isLoading, mutate, isValidating } = useSWR(url, request);

  return { data, error, isLoading, mutate, isValidating };
}

import { type mutate as mutateSWR } from "swr";

import Button from "./ui/button";

export default function RepositoriesListErrorMessage({
  mutate,
  getRepositoriesAPIUrl,
}: {
  mutate: typeof mutateSWR;
  getRepositoriesAPIUrl: string;
}) {
  return (
    <div className="flex select-none gap-5 items-center justify-center bg-rose-500 bg-opacity-5 p-4 w-fit text-rose-500 rounded-md">
      <h6>😥 Error to get GitHub repositories, please:</h6>
      <Button
        size={"sm"}
        variant={"outline"}
        onClick={async () => {
          await mutate(getRepositoriesAPIUrl, {
            revalidate: true,
          });
        }}
        className="hover:bg-rose-500 hover:text-rose-500 hover:bg-opacity-10"
      >
        Try again
      </Button>
    </div>
  );
}

"use client";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import MainContent from "./components/MainContent";

const queryClient = new QueryClient();


export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainContent />
    </QueryClientProvider>
  );
}

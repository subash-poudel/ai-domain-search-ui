"use client";
import { KeyboardEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import DomainTable from "./DomainTable";
import { DomainItem, DomainResponse } from "../models/models";
axios.defaults.withCredentials = false;

const apiUrl = "https://domain-search-api-288564799326.us-central1.run.app";
// const apiUrl = "http://localhost:8080";

export default function MainContent() {
  const [searchText, setSearchText] = useState("");
  const [domains, setDomains] = useState<DomainItem[]>([]);
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      mutation.mutate(searchText);
    }
  };
  const mutation = useMutation<DomainItem[], unknown, string>({
    mutationFn: async (data: string) => {
      const response = await axios.post(apiUrl + "/domains", {
        question: data,
      });
      const domainResponse =  response.data as DomainResponse;
      setDomains(domainResponse.domains.domains);
      return domainResponse.domains.domains;
    },
    onSuccess: () => {
      // Handle successful post, e.g., show a success message
    },
    onError: (error) => {
      // Handle error, e.g., show an error message
      console.error("Error posting data:", error);
    },
  });
  return (
    <>
      <header className="bg-blue-500 text-white text-center py-4">
        <h1 className="text-3xl font-bold">Search domains</h1>
      </header>

      <div className="mx-24">
        <div className="mt-6">
          <input
            type="text"
            placeholder="Search for domain names ex: Suggest domain names for a pet store in seattle"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="mt-6 overflow-x-auto">
          <DomainTable domains={domains} />
        </div>
      </div>
    </>
  );
}

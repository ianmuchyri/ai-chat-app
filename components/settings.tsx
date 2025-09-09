"use client";

import { getCookies } from "@/lib/cookies";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";

interface Props {
  secret: string;
}
export function Settings({ secret }: Props) {
  const [model, setModel] = useState("gpt-4o-mini");
  const [apiKey, setApiKey] = useState("");

  // useEffect(() => {
  //   const fetchCookies = async () => {
  //     const { model, key } = await getCookies();
  //     if (model) setModel(model.value);
  //     if (key)  {
  //       try {
  //         const decrypted = await crypto.subtle.decrypt(
  //           {
  //             name: "AES-GCM",
  //             iv: new Uint8Array(12),
  //           },
  //           secret,
  //           Buffer.from(key.value, "base64")
  //         );
  //         setApiKey(new TextDecoder().decode(decrypted));
  //       } catch (error) {
  //         console.error("Error decrypting API key:", error);
  //       }
  //     }
  //   }
  // },[])
  const handleSave = () => {
    console.log("This has not been set up yet. Please be patient with us.");
  };
  return (
    <div className="flex items-center gap-2">
      <Select value={model} onValueChange={setModel}>
        <SelectTrigger>
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="gpt-4o-mini">gpt-4o-mini</SelectItem>
          <SelectItem value="gpt-4o">gpt-4o</SelectItem>
          <SelectItem value="gpt-5-nano">gpt-5-nano</SelectItem>
        </SelectContent>
      </Select>

      <Input
        type="password"
        placeholder="Enter API Key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        className="border rounded px-2 py-1"
      />

      <Button
        onClick={handleSave}
        className="bg-blue-500 text-white px-3 py-1 rounded"
        disabled={!model || !apiKey}
      >
        Save
      </Button>
    </div>
  );
}

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {cn} from "@/lib/utils";
import {XIcon} from "lucide-react";
import {useCallback, useRef, useState, type FormEvent} from "react";

type Method = "GET" | "PUT";

const GET_VALUE = "/api/hello";
const PUT_VALUE = "/api/hello/[your_name]";

export function APITester() {
  const responseInputRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [method, setMethod] = useState<Method>("GET");
  const [url, setUrl] = useState<string>("");

  const testEndpoint = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (url === PUT_VALUE) {
      alert("Validation called.. 🤠");
      return;
    }

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const endpoint = formData.get("endpoint") as string;
      const url = new URL(endpoint, location.href);
      const method = formData.get("method") as string;
      const res = await fetch(url, {method});

      const data = await res.json();
      responseInputRef.current!.value = JSON.stringify(data, null, 2);
    } catch (error) {
      responseInputRef.current!.value = String(error);
    }
  };

  const getValue = useCallback(
    (val?: Method) => {
      return method === "GET" || (val && val === "GET") ? GET_VALUE : PUT_VALUE;
    },
    [method],
  );

  return (
    <div className="mt-8 mx-auto w-full max-w-2xl text-left flex flex-col gap-4">
      <form
        onSubmit={testEndpoint}
        className="flex items-center gap-2 bg-card p-3 rounded-xl font-mono border border-input w-full">
        <Select
          name="method"
          value={method}
          onValueChange={(val) => {
            setMethod(val as Method);
            setUrl(getValue(val as Method));
          }}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GET">GET</SelectItem>
            <SelectItem value="PUT">PUT</SelectItem>
          </SelectContent>
        </Select>

        <Input
          ref={inputRef}
          type="text"
          name="endpoint"
          className={cn(
            "flex-1 font-mono",
            "bg-transparent border-0 shadow-none",
            "focus-visible:ring-0 focus-visible:ring-offset-0",
          )}
          value={url}
          placeholder={getValue()}
          onFocus={(e) => {
            method === "GET" ? setUrl(GET_VALUE) : setUrl(PUT_VALUE);

            setTimeout(() => {
              if (!inputRef.current) return;

              const {value} = e.target;
              const start = value.indexOf("[");
              const end = value.indexOf("]");
              console.log({start, end});

              if (start !== -1 && end !== -1 && end > start) {
                inputRef.current.setSelectionRange(start, end + 1);
              }
            }, 100);
          }}
          onChange={(e) => setUrl(e.target.value)}
        />

        {url.trim() ? (
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              setUrl("");
              if (responseInputRef.current) {
                responseInputRef.current.value = "";
              }
            }}>
            <XIcon />
          </Button>
        ) : null}

        <Button type="submit" variant="secondary">
          Send
        </Button>
      </form>

      <textarea
        ref={responseInputRef}
        readOnly
        placeholder="Response will appear here..."
        className={cn(
          "w-full min-h-[140px] bg-card",
          "border border-input rounded-xl p-3",
          "font-mono resize-y",
          "placeholder:text-muted-foreground",
        )}
      />
    </div>
  );
}

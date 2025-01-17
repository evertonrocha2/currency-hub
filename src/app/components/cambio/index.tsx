"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRightLeft } from "lucide-react";

export default function Cambio() {
  const [cambioTax, setCambioTax] = useState<number | null>(null);
  const [convertedValue, setConvertedValue] = useState<number | null>(null);
  const [valueToConvert, setValueToConvert] = useState<number>(0);
  const [base, setBase] = useState<string>("BRL");
  const [destiny, setDestiny] = useState<string>("USD");

  const getCambioTax = async (base: string, destiny: string) => {
    const url = `https://economia.awesomeapi.com.br/json/last/${base}-${destiny}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      const taxa = parseFloat(data[`${base}${destiny}`]?.bid);
      setCambioTax(taxa);
      return taxa;
    } catch (error) {
      console.error("Erro ao obter a taxa de câmbio:", error);
      return null;
    }
  };

  const convertCurrency = async (base: string, destiny: string) => {
    const taxa = await getCambioTax(base, destiny);
    if (taxa) {
      const valorConvertido = valueToConvert * taxa;
      setConvertedValue(valorConvertido);
    } else {
      console.error("Não foi possível obter a taxa de câmbio.");
    }
  };

  const invertValues = () => {
    setBase((prevBase) => destiny);
    setDestiny((prevDestiny) => base);
  };

  const data = [
    { label: "BRL", value: "BRL" },
    { label: "USD", value: "USD" },
    { label: "EUR", value: "EUR" },
  ];

  return (
    <div className="flex flex-col gap-8 items-center w-96 mx-auto font-[family-name:var(--font-geist-sans)]">
      <div className="w-full">
        <label>Valor</label>
        <Input
          type="number"
          onChange={(e) => setValueToConvert(parseFloat(e.target.value))}
        />
      </div>
      <div className="w-full">
        <label>Converter de</label>
        <Select onValueChange={(e) => setBase(e)} value={base}>
          <SelectTrigger>
            <SelectValue placeholder="BRL" />
          </SelectTrigger>
          <SelectContent>
            {data.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <ArrowRightLeft
          onClick={invertValues}
          className="text-[#94DB23] cursor-pointer"
        />
      </div>
      <div className="w-full">
        <label>Para</label>
        <Select onValueChange={(e) => setDestiny(e)} value={destiny}>
          <SelectTrigger>
            <SelectValue placeholder="USD" />
          </SelectTrigger>
          <SelectContent>
            {data.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <button disabled={!valueToConvert}
        className={`bg-[#94DB23] text-zinc-900 py-2 px-4 rounded-md hover:bg-[#95db23d8] transition-all  duration-300 ${
          valueToConvert ? "" : "cursor-not-allowed"
        }`}
        onClick={() => convertCurrency(base, destiny)}
      >
        Converter
      </button>
  
      {convertedValue && (
        <div className="bg-zinc-900 p-8 flex flex-col gap-4 rounded-md border-zinc-600 border-[0.2px]">
          <h1 className="font-[family-name:var(--font-geist-sans)] text-2xl">
            Resultado da Conversão
          </h1>
          <div>
            <h2>Conversão de: <span className="text-[#94DB23] font-semibold">{base}</span></h2>
            <p>Valor: <span className="text-[#94DB23] font-semibold">{valueToConvert.toFixed(2)}</span></p>
          </div>
          <div>
            <h2>Para: {destiny}</h2>
            <div>
            {destiny === "BRL" && convertedValue && (
            <p>Valor Convertido:  <span className="text-[#94DB23] font-semibold">R$ {convertedValue.toFixed(2)}</span></p>
          )}
          {destiny === "USD" && convertedValue && (
            <p>Valor Convertido: <span className="text-[#94DB23] font-semibold">$ {convertedValue.toFixed(2)}</span></p>
          )}
          {destiny === "EUR" && convertedValue && (
            <p>Valor Convertido: <span className="text-[#94DB23] font-semibold">€ {convertedValue.toFixed(2)}</span></p>
          )}
              </div>
          </div>
        </div>
      )}
    </div>
  );
}

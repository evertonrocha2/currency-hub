import Cambio from "./components/cambio";

export default function Home() {
  return (
   <div className="md:w-[1440px] mx-auto py-8 h-screen flex md:flex-row flex-col items-center justify-around z-[10]">
    <div className="bg-img z-0 h-screen w-full absolute">
    </div>

    <div className="flex flex-col gap-4">
      <div>
      <h1 className="font-[family-name:var(--font-geist-sans)] text-6xl tracking-tighter text-center"><span className="text-[#94DB23]">Currency</span>Hub</h1>
      <p className="font-[family-name:var(--font-geist-mono)] text-center tracking-tighter">Converta qualquer moeda e saiba os valores!</p>
      </div>
      <img src="money.svg"/>
    </div>
    <div className="mt-8">
      <Cambio/>
    </div>
   </div>
  );
}

import Navbar from "@/components/navbar";
import { fetchGeneralData, fetchGetDolar } from "@/utils/fetch";
import { ChartDolarObservado } from "@/components/charts";
import { formatArrayDateAndReverse } from "@/utils/utils";

export default async function Home() {
  // const generalData = await fetchGeneralData();
  const dolarData = await fetchGetDolar();
  const dolarDaily = formatArrayDateAndReverse(dolarData.serie)

  return (
    <>
      <Navbar />

      <ul
        className="grid grid-cols-[_repeat(auto-fit,_minmax(250px,_1fr))]
      gap-12"
      >
        <li className="w-full h-auto">
          <ChartDolarObservado chartData={dolarDaily} />
        </li>
        {/* <li className="w-full h-auto ">
          <CharTest chartData={chartData} />
        </li> */}
      </ul>
    </>
  );
}

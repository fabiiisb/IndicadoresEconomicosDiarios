import Navbar from "@/components/navbar";
import { fetchGetCurrency } from "@/utils/fetch";
import { AreaChart, BarChart, PieChart } from "@/components/charts";
import { formatArrayDateAndReverse, calculateAveragePerYear } from "@/utils/utils";

export default async function Home() {
  //Unidad de medida / Moneda 
  const dolarData = await fetchGetCurrency('dolar');
  const euroData = await fetchGetCurrency('euro');
  const bitcoinData = await fetchGetCurrency('bitcoin');
  const ufData = await fetchGetCurrency('uf');
  const utmData = await fetchGetCurrency('utm');

  const dolarDaily = formatArrayDateAndReverse(dolarData.serie)
  const euroDaily = formatArrayDateAndReverse(euroData.serie)
  const bitcoinDaily = formatArrayDateAndReverse(bitcoinData.serie)
  const ufDaily = formatArrayDateAndReverse(ufData.serie)
  const utmDaily = formatArrayDateAndReverse(utmData.serie)
  //Unidad de medida / Moneda 

  //Unidad de medida / Porcentaje 
  const tpmData = await fetchGetCurrency('tpm');
  const imacecData = await fetchGetCurrency('imacec');
  const tasaDesempleoData = await fetchGetCurrency('tasa_desempleo');

  const tpmDaily = tpmData.serie.reverse()
  const imacecDaily = imacecData.serie.reverse()
  const tasaDesempleoDaily = tasaDesempleoData.serie.reverse()
  const averageTasaDesempleo = calculateAveragePerYear(tasaDesempleoDaily)
  //Unidad de medida / Porcentaje 

  return (
    <>
      <Navbar />

      <div className="flex flex-col gap-12">
        <section>
          <ul
            className="grid grid-cols-[_repeat(auto-fit,_minmax(350px,_1fr))] gap-12"
          >
            <li className="w-full h-auto">
              <AreaChart
                title={'Dólar observado'}
                chartData={dolarDaily}
                color={'hsl(0 100% 62.16%)'}
                currency={'CLP'}
              />
            </li>
            <li className="w-full h-auto">
              <AreaChart
                title={'Euro observado'}
                chartData={euroDaily}
                color={'hsl(219.02 100% 64.12%)'}
                currency={'CLP'}
              />
            </li>
            <li className="w-full h-auto">
              <AreaChart
                title={'Bitcoin'}
                chartData={bitcoinDaily}
                color={'hsl(19.02 100% 64.12%)'}
                currency={'USD'}
              />
            </li>
            <li className="w-full h-auto">
              <AreaChart
                title={'Unidad de fomento (UF)'}
                chartData={ufDaily}
                color={'hsl(114.97 100% 64.9%)'}
                currency={'CLP'}
              />
            </li>
            <li className="w-full h-auto">
              <AreaChart
                title={'Unidad Tributaria Mensual (UTM)'}
                chartData={utmDaily}
                color={'hsl(250.82 100% 64.12%)'}
                currency={'CLP'}
              />
            </li>
            <li className="w-full h-auto">
              <PieChart
                title={'Media de desempleo anual'}
                chartData={averageTasaDesempleo}
              />
            </li>
          </ul>
        </section>

        <section>
          <ul className="flex flex-col gap-12">
            <li>
              <BarChart
                title={'Tasa Política Monetaria (TPM)'}
                chartData={tpmDaily}
                color={'hsl(36.07 100% 64.12%)'}
              />
            </li>
            <li>
              <BarChart
                title={'Imacec'}
                chartData={imacecDaily}
                color={'hsl(188.85 100% 64.12%)'}
              />
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}

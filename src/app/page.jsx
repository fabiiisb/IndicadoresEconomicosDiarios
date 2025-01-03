import Navbar from "@/components/navbar";
import { fetchGetCurrency } from "@/utils/fetch";
import dynamic from "next/dynamic";
import { formatArrayDateAndReverse, calculateAveragePerYear } from "@/utils/utils";

const AreaChart = dynamic(() => import("@/components/charts").then(mod => mod.AreaChart));
const BarChart = dynamic(() => import("@/components/charts").then(mod => mod.BarChart));
const PieChart = dynamic(() => import("@/components/charts").then(mod => mod.PieChart));

export default async function Home() {
  try {
    const [dolarData, euroData, bitcoinData, ufData, utmData, tpmData, imacecData, tasaDesempleoData] = 
      await Promise.all([
        fetchGetCurrency('dolar'),
        fetchGetCurrency('euro'),
        fetchGetCurrency('bitcoin'),
        fetchGetCurrency('uf'),
        fetchGetCurrency('utm'),
        fetchGetCurrency('tpm'),
        fetchGetCurrency('imacec'),
        fetchGetCurrency('tasa_desempleo')
      ]);

    const dolarDaily = formatArrayDateAndReverse(dolarData.serie);
    const euroDaily = formatArrayDateAndReverse(euroData.serie);
    const bitcoinDaily = formatArrayDateAndReverse(bitcoinData.serie);
    const ufDaily = formatArrayDateAndReverse(ufData.serie);
    const utmDaily = formatArrayDateAndReverse(utmData.serie);

    const tpmDaily = tpmData.serie.reverse();
    const imacecDaily = imacecData.serie.reverse();
    const tasaDesempleoDaily = tasaDesempleoData.serie.reverse();
    const averageTasaDesempleo = calculateAveragePerYear(tasaDesempleoDaily);

    return (
      <>
        <Navbar />

        <main className="flex flex-col gap-12 p-6">
          {/* Indicadores Monetarios */}
          <section>
            <h2 className="text-3xl font-bold mb-4">Indicadores monetarios</h2>
            <p className="mb-6 text-muted-foreground">
              Explora la evolución diaria de indicadores económicos clave como el dólar, euro y más.
            </p>
            <ul className="grid grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))] gap-12">
              <li>
                <AreaChart
                  title="Dólar observado"
                  chartData={dolarDaily}
                  color="hsl(0 100% 62.16%)"
                  currency="CLP"
                  aria-label="Gráfico que muestra la variación del dólar en pesos chilenos"
                />
              </li>
              <li>
                <AreaChart
                  title="Euro observado"
                  chartData={euroDaily}
                  color="hsl(219.02 100% 64.12%)"
                  currency="CLP"
                  aria-label="Gráfico que muestra la variación del euro en pesos chilenos"
                />
              </li>
              <li>
                <AreaChart
                  title="Bitcoin"
                  chartData={bitcoinDaily}
                  color="hsl(19.02 100% 64.12%)"
                  currency="USD"
                  aria-label="Gráfico que muestra la variación del bitcoin en dólares"
                />
              </li>
              <li>
                <AreaChart
                  title="Unidad de Fomento (UF)"
                  chartData={ufDaily}
                  color="hsl(114.97 100% 64.9%)"
                  currency="CLP"
                  aria-label="Gráfico que muestra la variación de la Unidad de Fomento en pesos chilenos"
                />
              </li>
              <li>
                <AreaChart
                  title="Unidad Tributaria Mensual (UTM)"
                  chartData={utmDaily}
                  color="hsl(250.82 100% 64.12%)"
                  currency="CLP"
                  aria-label="Gráfico que muestra la variación de la Unidad Tributaria Mensual en pesos chilenos"
                />
              </li>
            </ul>
          </section>

          {/* Indicadores en Porcentaje */}
          <section>
            <h2 className="text-3xl font-bold mb-4">Indicadores en porcentaje</h2>
            <p className="mb-6 text-muted-foreground">
              Analiza datos como la tasa de política monetaria y la media anual del desempleo.
            </p>
            <ul className="flex flex-col gap-12">
              <li>
                <PieChart
                  title="Media de Desempleo Anual"
                  chartData={averageTasaDesempleo}
                  aria-label="Gráfico que muestra la media anual del desempleo en porcentaje"
                />
              </li>
              <li>
                <BarChart
                  title="Tasa Política Monetaria (TPM)"
                  chartData={tpmDaily}
                  color="hsl(36.07 100% 64.12%)"
                  aria-label="Gráfico que muestra la evolución de la Tasa Política Monetaria"
                />
              </li>
              <li>
                <BarChart
                  title="Imacec"
                  chartData={imacecDaily}
                  color="hsl(188.85 100% 64.12%)"
                  aria-label="Gráfico que muestra la variación mensual del Imacec"
                />
              </li>
            </ul>
          </section>
        </main>
      </>
    );
  } catch (error) {
    console.error("Error al cargar los datos:", error);
    return <p>Error al cargar los datos. Intenta nuevamente más tarde.</p>;
  }
}

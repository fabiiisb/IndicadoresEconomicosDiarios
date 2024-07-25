"use client"
import { Area, AreaChart as AreaChartRecharts, Bar, BarChart as BarChartRecharts, CartesianGrid, Cell, Pie, PieChart as PieChartRecharts, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { formatDate } from "@/utils/utils"

export function AreaChart({ title, chartData, color, currency }) {
  const values = chartData.map((item) => item.valor)
  const minValue = Math.min(...values)
  const maxValue = Math.max(...values)

  const firstDate = chartData[0].fecha
  const lastDate = chartData[chartData.length - 1].fecha

  const chartConfig = {
    desktop: {
      label: "chart",
      color: color,
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          Mostrando desde la fecha {firstDate} hasta {lastDate}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChartRecharts
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray={"3 3"} />
            <XAxis
              dataKey="fecha"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              domain={[minValue * 0.995, maxValue * 1.005]}
              axisLine={false}
              tickLine={false}
              tick={false}
              width={0}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                />
              }
              currency={currency}
            />
            <Area
              dataKey="valor"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChartRecharts>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export function BarChart({ title, chartData, color }) {
  const firstDate = formatDate(chartData[0].fecha)
  const lastDate = formatDate(chartData[chartData.length - 1].fecha)

  const chartConfig = {
    desktop: {
      label: "chart",
      color: color,
    },
  }

  return (
    <Card className='h-full'>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            Mostrando desde la fecha {firstDate} hasta {lastDate}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChartRecharts
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="fecha"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("es-CL", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("es-CL", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={'valor'} fill={'var(--color-desktop)'} radius={8}>
              {chartData.map((item) => (
                <Cell
                  key={item.fecha}
                  fill={
                    item.valor > 0
                      ? color
                      : "#FF3939"
                  }
                />
              ))}
            </Bar>
          </BarChartRecharts>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export function PieChart({ title, chartData }) {
  const firstDate = chartData[0].fecha
  const lastDate = chartData[chartData.length - 1].fecha

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          Desde {firstDate} hasta {lastDate}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 ">
        <ChartContainer
          config={{}}
          className="mx-auto aspect-square max-h-[250px] pb-0 "
        >
          <PieChartRecharts>
            <Pie data={chartData} dataKey="media" label nameKey="fecha" />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          </PieChartRecharts>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}


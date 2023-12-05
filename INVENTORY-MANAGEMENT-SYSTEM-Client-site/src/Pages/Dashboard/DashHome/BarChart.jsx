import autoprefixer from "autoprefixer";
import { BarChart } from "keep-react";
import Container from "../../../ShareComponent/Container/Container";
const BarChartData = [
  {
    name: "2",
    price: 340,
    sell: 140,
  },
  {
    name: "4",
    price: 300,
    sell: 200,
  },
  {
    name: "6",
    price: 170,
    sell: 120,
  },
  {
    name: "8",
    price: 190,
    sell: 130,
  },
  {
    name: "10",
    price: 450,
    sell: 120,
  },
  {
    name: "12",
    price: 400,
    sell: 213,
  },
  {
    name: "14",
    price: 250,
    sell: 180,
  },
  {
    name: "16",
    price: 320,
    sell: 150,
  },
  {
    name: "18",
    price: 280,
    sell: 160,
  },
  {
    name: "20",
    price: 390,
    sell: 110,
  },
  {
    name: "22",
    price: 220,
    sell: 90,
  },
  {
    name: "24",
    price: 360,
    sell: 170,
  },
  {
    name: "26",
    price: 410,
    sell: 140,
  },
  {
    name: "28",
    price: 280,
    sell: 200,
  },
  {
    name: "30",
    price: 330,
    sell: 160,
  },
];

const BarCharts = () => {

  return (
    <Container>
      <div className=" shadow-md p-5">
      <BarChart
        height={500}
        width={1000}
        active
        activeIndex={5}
        dataKey="price"
        chartData={BarChartData}
        barRadius={[4, 4, 0, 0]}
        showLegend={true}
        showBg={true}
        showXaxis={true}
        showYaxis={true}
        showTooltip={true}
        secondaryDataKey="sell"
      />
    </div>
    </Container>
  );
};

export default BarCharts;

import InsightRoll from "@/src/components/About/InsightRoll";


const insights = [
   "Investing in the stock market is like planting a tree — patience and consistency will grow your wealth, but only if you weather the storms with a smile. 🌱📈😊"
  ];

export default function AboutLayout({ children }) {
  return (
    <main className="w-full flex flex-col items-center justify-between">
      <InsightRoll insights={insights} />
      {children}
    </main>
  );
}

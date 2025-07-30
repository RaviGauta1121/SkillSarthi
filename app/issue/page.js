import FAQ from "@/components/Shared/FAQ";
import { FAQITEMS } from "@/constants/faq";




export default function Home() {
  return (
    <main className="flex justify-center items-center">
      <div className="w-[1000px] space-y-10 px-5 md:px-10 py-24">
        {FAQITEMS.map((item, i) => (
          <div key={i} className="space-y-5">
            <h1 className="font-bold text-3xl">{item.category}</h1>
            <div className="space-y-3">
              {item.items.map((faq, i) => (
                <FAQ key={i} title={faq.title} content={faq.content} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

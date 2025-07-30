import Image from 'next/image';


export default function TeamSection() {
  return (
    <section className="py-16 bg-black" id="team">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
        <p className="text-lg text-gray-600 mb-8">
          We are a passionate group of individuals working together to create amazing experiences.
        </p>
        <div className="flex justify-center">
  <div className="relative w-full h-[700px] max-w-5xl"> {/* Increase height */}
    <Image
      src="/images/img2.jpg"
      alt="Team"
      layout="fill"
      objectFit="cover"
      className="rounded-lg shadow-lg"
    />
  </div>
</div>

      </div>
    </section>
  );
}

import ProductCards from "@/components/cards";

export default function Home() {
  const events = [1, 2, 3, 5, 6, 7];
  const date = new Date();
  const newDate = date.toISOString().split("T");
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <br />
      <div className="card card-side bg-accent shadow-xl">
        <figure>
          <img
            src="https://picsum.photos/1280/720"
            alt="Album"
            className="h-full"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title font-extrabold">
            Ayo belanja di New Mexico
          </h2>
          <h3 className="font-bold">Location: </h3>
          <p>308 Negra Arroyo Lane, Albuquerque, New Mexico.</p>
          <div className="card-actions justify-between">
            <div>
              start: <span className="badge">{`${newDate[0]}`}</span>
            </div>
            <div>
              end: &nbsp;<span className="badge">{`${newDate[0]}`}</span>
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-base-100 text-7xl py-8">Product</h1>
      <div className="card-container flex flex-row gap-5 flex-wrap xs:justify-center md:justify-space pt-5">
        {events.map((e) => {
          return <ProductCards key={e} />;
        })}
      </div>
    </main>
  );
}

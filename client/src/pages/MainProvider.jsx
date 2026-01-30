import style from "../style/MainProvider.module.css";

const ProviderCard = [
  {
    name: "Website Landing Page Design",
    description: "Need a modern landing page for a startup marketplace.",
    price: "Budget: $150",
    category: "Category: Design",
  },

  {
    name: "Translation Arabic → English",
    description: "Looking for professional translation of 10 pages document.",
    price: "Budget: $80",
    category: "Category: Translation",
  },
];

function MainProvider() {
  return (
    <>
      {/* Page Title */}
      <div className={style.header}>
        <h2>New Service Requests</h2>
        <p>Clients are looking for providers like you. Apply now.</p>
      </div>

      {/* Requests Grid */}
      <div className={style.requestsGrid}>
        {/* Request Card */}

        {ProviderCard.map((item) => (
          <div className={style.card}>
            <h3>{item.name}</h3>

            <p className={style.desc}>{item.description}</p>

            <div className={style.meta}>
              <span>{item.price}</span>
              <span>{item.category}</span>
            </div>

            <button className={style.btn}>Apply Offer</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default MainProvider;

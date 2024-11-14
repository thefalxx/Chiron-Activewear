// components/CatalogCards.js
import Image from "next/image";

const CatalogCards = () => {
  const items = [
    { id: 1, price: "₱850", title: "T-Shirt", image: "/assets/item-1.png" },
    { id: 2, price: "₱850", title: "Jacket", image: "/assets/item-1.png" },
    { id: 3, price: "₱850", title: "Jeans", image: "/assets/item-1.png" },
    { id: 4, price: "₱850", title: "Sneakers", image: "/assets/item-1.png" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 mx-4 ">
      {items.map((item) => (
        <div key={item.id}>
          <div className="bg-white overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              width={431}
              height={647}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="px-4 flex flex-col items-center justify-center">
            {" "}
            {/* Changed 'flex' to 'flex flex-col' */}
            <h3 className="text-sm xl:text-lg font-semibold text-gray-700">
              {item.title} - Gray
            </h3>
            <p className="mt-2 text-center text-sm xl:text-lg">{item.price}</p>{" "}
            {/* Added 'mt-2' for spacing and 'text-center' for alignment */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CatalogCards;

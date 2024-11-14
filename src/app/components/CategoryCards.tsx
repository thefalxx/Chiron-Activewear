// components/CategoryCards.jsx
import Image from "next/image";

const CategoryCards = () => {
  // Initialize items directly within the component
  const items = [
    { id: 1, title: "MEN", image: "/assets/item-1.png" },
    { id: 2, title: "SHIRTS", image: "/assets/item-1.png" },
    { id: 3, title: "SHORTS", image: "/assets/item-1.png" },
    { id: 4, title: "WOMEN", image: "/assets/item-1.png" },
    { id: 5, title: "SETS", image: "/assets/item-1.png" },
    { id: 6, title: "LEGS", image: "/assets/item-1.png" },
    // Add more categories as needed
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 p-4 ">
      {items.map((item) => (
        <div
          key={item.id}
          className="relative h-24 xl:h-32 w-full bg-cover bg-center overflow-hidden"
        >
          <Image
            src={item.image}
            alt={item.title}
            layout="fill"
            objectFit="cover"
            className="absolute w-full h-full"
          />
          <div className="absolute inset-0 bg-black opacity-25"></div>
          <h3 className="absolute bottom-4 right-4 text-white text-md xl:text-2xl font-bold">
            {item.title}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default CategoryCards;

import Image from "next/image";

const ProductViewCards = () => {
  const items = [
    { id: 1, image: "/assets/item-1.png" },
    { id: 2, image: "/assets/item-1.png" },
    // { id: 3, image: "/assets/item-1.png" },
    // { id: 4, image: "/assets/item-1.png" },
  ];

  return (
    <div className="grid grid-cols-2 gap-1 p-2 mx-2"> 
      {items.map((item) => (
        <div key={item.id}>
          <div>
            <div className="bg-white overflow-hidden">
              <Image
                src={item.image}
                alt={item.image}
                width={520}
                height={647}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="px-4 flex flex-col items-center justify-center">
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductViewCards;

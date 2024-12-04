import React from 'react'
import { useState } from 'react'
import { FaTachometerAlt, FaBoxOpen, FaUsers, FaClipboardList, FaTools, FaUserFriends, FaRedo } from "react-icons/fa";


const Sidebar = () => {

const [activeItem, setActiveItem] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt /> },
    { name: "Products", icon: <FaBoxOpen /> },
    { name: "Orders", icon: <FaClipboardList /> },
    { name: "Customers", icon: <FaUsers /> },
    { name: "Returns", icon: <FaRedo /> },
  ];

  const toolItems = [
    { name: "Settings", icon: <FaTools /> },
    { name: "Users", icon: <FaUserFriends /> },
  ];

  return (
    <div>
         <div className="w-64 h-full bg-white shadow-lg p-4">
      <h1 className="text-2xl font-bold mb-24 mt-10 flex items-center justify-center">CHIRON</h1>

      <div className="space-y-2">
        {menuItems.map((item) => (
          <div
            key={item.name}
            className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${
              activeItem === item.name ? "bg-gray-200" : ""
            }`}
            onClick={() => setActiveItem(item.name)}
          >
            <div className="text-xl">{item.icon}</div>
            <span className="text-lg font-medium">{item.name}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 text-gray-500 text-sm">TOOLS</div>
      <div className="space-y-2 mt-2">
        {toolItems.map((item) => (
          <div
            key={item.name}
            className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${
              activeItem === item.name ? "bg-gray-200" : ""
            }`}
            onClick={() => setActiveItem(item.name)}
          >
            <div className="text-xl">{item.icon}</div>
            <span className="text-lg font-medium">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default Sidebar

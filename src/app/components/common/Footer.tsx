// components/Footer.jsx

const Footer = () => {
  return (
    <footer className="bg-white py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Main Menu and Support */}
        <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0">
          {/* Main Menu */}
          <div>
            <h4 className="font-bold mb-4">MAIN MENU</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Women’s
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Men’s
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Collections
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  GIFT CARD
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-4">SUPPORT</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Men’s Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Women’s Size Guide
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Socials and Policies */}
        <div className="flex flex-col items-start md:items-end space-y-8">
          {/* Socials */}
          <div>
            <h4 className="font-bold mb-4">SOCIALS</h4>
            <div className="flex space-x-4">
              {/* Replace "#" with actual links */}
              <a href="#" aria-label="Facebook" className="hover:text-gray-500">
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-gray-500"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="TikTok" className="hover:text-gray-500">
                <i className="fab fa-tiktok"></i>
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-gray-500">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-bold mb-4">POLICIES</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

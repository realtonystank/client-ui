import Image from "next/image";
import logo from "@/../public/logo.svg";
import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "../ui/button";
import CartCounter from "./cart-counter";
import TenantSelect from "./tenant-select";

const Header = async () => {
  const tenantResponse = await fetch(
    `${process.env.BACKEND_URL}/api/auth/tenants?perPage=10000`,
    {
      next: {
        revalidate: 3600, // 1 hour
      },
    }
  );
  if (!tenantResponse.ok) {
    throw new Error("Failed to fetch tenants.");
  }
  const restaurants = await tenantResponse.json();

  return (
    <header className="bg-white flex justify-center">
      <nav className="container p-5 flex justify-between items-center">
        <div className="px-35 flex items-center justify-start space-x-4 ">
          <Image src={logo} alt={"logo"} />
          <TenantSelect restaurants={restaurants} />
        </div>
        <div className="flex items-center space-x-4">
          <ul className="flex items-center font-medium space-x-4">
            <li>
              <Link className="hover:text-primary" href={"/"}>
                Menu
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" href={"/"}>
                Orders
              </Link>
            </li>
          </ul>
          <CartCounter />
          <div className="flex items-center gap-x-2w ml-6">
            <Phone />
            <span>+91 9770653716</span>
          </div>
          <Button size={"sm"}>Logout</Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;

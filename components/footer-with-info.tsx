import Link from "next/link"
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from "lucide-react"

export function FooterWithInfo() {
  const currentYear = new Date().getFullYear()

  // City service areas
  const cityLinks = [
    { name: "Orange City", path: "/locations/orange-city" },
    { name: "DeLand", path: "/locations/deland" },
    { name: "Deltona", path: "/locations/deltona" },
    { name: "All Locations", path: "/locations" },
  ]

  return (
    <footer className="bg-[#1e3a8a] text-white py-16">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <h3 className="text-2xl font-bold mb-5">Royalty Fence</h3>
            <p className="mb-5 text-base leading-relaxed">
              Your trusted fence repair and installation experts in Orange City and throughout Volusia County since
              2008.
            </p>
            <div className="flex space-x-5">
              <Link href="https://facebook.com" className="hover:text-orange-300">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://instagram.com" className="hover:text-orange-300">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-5">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <Phone className="h-6 w-6 shrink-0 text-orange-300" />
                <div>
                  <p className="font-medium text-lg">Phone</p>
                  <Link href="tel:3864798379" className="hover:text-orange-300 text-base">
                    (386) 479-8379
                  </Link>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Mail className="h-6 w-6 shrink-0 text-orange-300" />
                <div>
                  <p className="font-medium text-lg">Email</p>
                  <Link href="mailto:RoyaltyFenceOrangeCity@gmail.com" className="hover:text-orange-300 text-base">
                    royaltyfenceorangecity@gmail.com
                  </Link>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <MapPin className="h-6 w-6 shrink-0 text-orange-300" />
                <div>
                  <p className="font-medium text-lg">Service Areas</p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {cityLinks.map((city) => (
                      <Link
                        key={city.path}
                        href={city.path}
                        className="text-base hover:text-orange-300 transition-colors"
                      >
                        {city.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-5">Service Hours</h3>
            <ul className="space-y-3">
              <li className="flex justify-between text-base">
                <span>Monday - Friday</span>
                <span>8:00 AM - 5:00 PM</span>
              </li>
              <li className="flex justify-between text-base">
                <span>Saturday</span>
                <span>9:00 AM - 5:00 PM</span>
              </li>
              <li className="flex justify-between text-base">
                <span>Sunday</span>
                <span>Closed</span>
              </li>
            </ul>
            <div className="mt-5 p-4 bg-blue-800 rounded-md">
              <p className="text-base flex items-center">
                <Clock className="h-5 w-5 mr-2 text-orange-300" />
                24/7 Emergency Storm Response Available
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800 pt-6 pb-2">
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            <span className="inline-flex items-center rounded-full bg-white bg-opacity-20 px-4 py-2 text-sm font-medium">
              Veteran Discount Program
            </span>
            <span className="inline-flex items-center rounded-full bg-white bg-opacity-20 px-4 py-2 text-sm font-medium">
              Climate Pledge Friendly
            </span>
          </div>
        </div>

        <div className="text-center text-sm text-white text-opacity-70">
          <p>© {currentYear} Royalty Fence. All rights reserved. | License #CBC1264058</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy-policy" className="hover:text-orange-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-orange-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

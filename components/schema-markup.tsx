export default function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "Royalty Fence",
    image: "https://yourdomain.com/logo.png",
    telephone: "+13864798379",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Your Street Address", // Update with actual address
      addressLocality: "Orange City",
      addressRegion: "FL",
      postalCode: "32763", // Update with actual zip
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.9472, // Update with actual coordinates
      longitude: -81.2989, // Update with actual coordinates
    },
    url: "https://yourdomain.com/",
    priceRange: "$$",
    description:
      "Expert fence repair & installation in Orange City, FL. Hurricane-proof fencing systems with lifetime warranty. Serving Volusia County including DeBary, Deltona, and Sanford.",
    areaServed: [
      {
        "@type": "City",
        name: "Orange City",
      },
      {
        "@type": "City",
        name: "DeBary",
      },
      {
        "@type": "City",
        name: "Deltona",
      },
      {
        "@type": "City",
        name: "Sanford",
      },
      {
        "@type": "City",
        name: "DeLand",
      },
    ],
    sameAs: [
      "https://www.facebook.com/yourpage", // Update with actual social links
      "https://www.instagram.com/yourpage",
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

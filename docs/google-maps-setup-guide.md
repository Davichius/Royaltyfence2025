# Google Maps Setup Guide

This guide will help you set up Google Maps integration for the Royalty Fence website.

## Getting a Google Maps API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Library"
4. Search for and enable the following APIs:
   - Maps JavaScript API
   - Maps Embed API
   - Places API
   - Geocoding API
5. Go to "APIs & Services" > "Credentials"
6. Click "Create Credentials" > "API Key"
7. Copy the generated API key
8. (Optional but recommended) Restrict the API key to only the APIs you're using and to your website's domain

## Adding the API Key to Your Project

### IMPORTANT SECURITY UPDATE
For security reasons, we now use a server-side approach to protect your Google Maps API key.

1. Create a `.env.local` file in the root of your project (if it doesn't exist already)
2. Add the following line to the file:
   \`\`\`
   GOOGLE_MAPS_API_KEY=your_api_key_here
   \`\`\`
3. Replace `your_api_key_here` with the API key you generated
4. Restart your development server

### Security Best Practices

- **DO NOT** use the `NEXT_PUBLIC_` prefix for your Google Maps API key
- Our application now handles all Google Maps requests through secure server-side API routes
- This prevents your API key from being exposed in client-side code

## Verifying the Integration

1. Open the website and navigate to the service area section
2. You should see a Google Maps integration showing the service area
3. If you see the custom map visualization instead, check that:
   - The API key is correctly set in your environment variables
   - The APIs are enabled in the Google Cloud Console
   - There are no console errors related to Google Maps

## Customizing the Map

You can customize the map by editing the map components:

- Adjust the center coordinates in the SimpleGoogleMap component
- Modify the zoom level to show more or less of the service area
- Update the query parameter to highlight specific locations

## Troubleshooting

If you encounter issues with the Google Maps integration:

1. Check the browser console for errors
2. Verify that the API key is correctly set in your environment variables
3. Ensure that billing is enabled for your Google Cloud project
4. Confirm that the necessary APIs are enabled
5. Check that the API key has the correct restrictions (if any)

The website will automatically fall back to a custom map visualization if the Google Maps integration fails.

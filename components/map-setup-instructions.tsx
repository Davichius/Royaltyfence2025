import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, ExternalLink } from "lucide-react"

export function MapSetupInstructions() {
  return (
    <Alert className="mb-6 bg-blue-50 border-blue-200">
      <AlertCircle className="h-4 w-4 text-blue-600" />
      <AlertTitle className="text-blue-800">Google Maps Setup Instructions</AlertTitle>
      <AlertDescription className="text-blue-700">
        <p className="mb-2">To enable the interactive Google Maps on your website:</p>
        <ol className="list-decimal pl-5 space-y-2 text-sm">
          <li>
            Go to the{" "}
            <a
              href="https://console.cloud.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline flex items-center"
            >
              Google Cloud Console <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </li>
          <li>Create a new project or select an existing one</li>
          <li>Enable the "Maps JavaScript API" and "Geocoding API"</li>
          <li>Create an API key with appropriate restrictions</li>
          <li>Replace "YOUR_API_KEY" in the service-area-map.tsx file with your actual API key</li>
        </ol>
      </AlertDescription>
    </Alert>
  )
}

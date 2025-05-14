"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { analyticsService, type TimePeriod, type AggregatedMetrics } from "@/lib/analytics-service"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Loader2, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("daily")
  const [metrics, setMetrics] = useState<AggregatedMetrics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeSessions, setActiveSessions] = useState(0)
  const [staffPerformance, setStaffPerformance] = useState<any[]>([])
  const [sessionData, setSessionData] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [usingFallback, setUsingFallback] = useState(false)

  // Colors for charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  // Load metrics when time period changes
  useEffect(() => {
    const loadMetrics = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Initialize analytics service if needed
        await analyticsService.initialize()

        const data = await analyticsService.getMetrics(timePeriod)
        setMetrics(data)

        // Get active sessions count
        const activeCount = await analyticsService.getActiveSessionsCount()
        setActiveSessions(activeCount)

        // Check if we're using in-memory fallback
        if (data && Object.values(data).every((val) => val === 0 || val === null)) {
          setUsingFallback(true)
        }

        // Load staff performance data (mock data for now)
        // In a real implementation, you would fetch this from your analytics service
        setStaffPerformance([
          { name: "Sarah", sessions: 24, satisfaction: 4.8, responseTime: 45, conversionRate: 15 },
          { name: "John", sessions: 18, satisfaction: 4.5, responseTime: 60, conversionRate: 12 },
          { name: "Emily", sessions: 30, satisfaction: 4.7, responseTime: 30, conversionRate: 18 },
        ])

        // Load session data (mock data for now)
        // In a real implementation, you would fetch this from your analytics service
        setSessionData([
          { hour: "9 AM", sessions: 5, messages: 45 },
          { hour: "10 AM", sessions: 8, messages: 72 },
          { hour: "11 AM", sessions: 12, messages: 108 },
          { hour: "12 PM", sessions: 10, messages: 90 },
          { hour: "1 PM", sessions: 15, messages: 135 },
          { hour: "2 PM", sessions: 18, messages: 162 },
          { hour: "3 PM", sessions: 14, messages: 126 },
          { hour: "4 PM", sessions: 9, messages: 81 },
        ])
      } catch (error) {
        console.error("Error loading metrics:", error)
        setError("Failed to load analytics data. Please try again later.")
        setUsingFallback(true)
      } finally {
        setIsLoading(false)
      }
    }

    loadMetrics()

    // Refresh data every minute
    const interval = setInterval(loadMetrics, 60000)

    return () => clearInterval(interval)
  }, [timePeriod])

  // Format time for display
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Render loading state
  if (isLoading && !metrics) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <span className="ml-2 text-lg">Loading analytics data...</span>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Chat Analytics Dashboard</h1>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {usingFallback && !error && (
        <Alert className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Limited Data Available</AlertTitle>
          <AlertDescription>
            Using in-memory storage for analytics. Data will be reset when the server restarts. Check your KV
            environment variables to enable persistent storage.
          </AlertDescription>
        </Alert>
      )}

      <div className="mb-6 flex items-center justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="staff">Staff Performance</TabsTrigger>
            <TabsTrigger value="conversions">Conversions</TabsTrigger>
          </TabsList>
        </Tabs>

        <Select value={timePeriod} onValueChange={(value) => setTimePeriod(value as TimePeriod)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hourly">Hourly</SelectItem>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <TabsContent value="overview" className="mt-0">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics?.totalSessions || 0}</div>
              <p className="text-xs text-muted-foreground">{activeSessions} active now</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics?.totalMessages || 0}</div>
              <p className="text-xs text-muted-foreground">
                {metrics?.userMessages || 0} from users, {metrics?.staffMessages || 0} from staff
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatTime(metrics?.avgResponseTime || 0)}</div>
              <p className="text-xs text-muted-foreground">Time between user message and staff response</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Satisfaction Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metrics?.satisfactionScore ? metrics.satisfactionScore.toFixed(1) : "N/A"}/5
              </div>
              <p className="text-xs text-muted-foreground">Based on user ratings</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Chat Sessions Over Time</CardTitle>
              <CardDescription>Number of chat sessions by hour</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sessionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sessions" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Message Distribution</CardTitle>
              <CardDescription>User vs. Staff messages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "User Messages", value: metrics?.userMessages || 0 },
                        { name: "Staff Messages", value: metrics?.staffMessages || 0 },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {[0, 1].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="sessions" className="mt-0">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Session Duration</CardTitle>
              <CardDescription>Average time spent in chat</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sessionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="messages" fill="#8884d8" name="Messages per Hour" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Wait Time</CardTitle>
              <CardDescription>Time until staff responds</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sessionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sessions" stroke="#82ca9d" name="Sessions per Hour" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="staff" className="mt-0">
        <div className="grid grid-cols-1 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Staff Performance</CardTitle>
              <CardDescription>Comparison of key metrics by staff member</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={staffPerformance} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={80} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sessions" fill="#8884d8" name="Sessions Handled" />
                    <Bar dataKey="satisfaction" fill="#82ca9d" name="Satisfaction (out of 5)" />
                    <Bar dataKey="conversionRate" fill="#ffc658" name="Conversion Rate (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Response Time by Staff</CardTitle>
              <CardDescription>Average time to respond to user messages (seconds)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={staffPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="responseTime" fill="#ff8042" name="Avg. Response Time (sec)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="conversions" className="mt-0">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Rate</CardTitle>
              <CardDescription>Percentage of chats that lead to conversions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-80 items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold text-blue-500">
                    {metrics?.conversionRate ? metrics.conversionRate.toFixed(1) : "0"}%
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">Overall conversion rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conversion by Type</CardTitle>
              <CardDescription>Breakdown of different conversion types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Quote Request", value: 45 },
                        { name: "Appointment", value: 30 },
                        { name: "Phone Call", value: 15 },
                        { name: "Brochure Download", value: 10 },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {[0, 1, 2, 3].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </div>
  )
}

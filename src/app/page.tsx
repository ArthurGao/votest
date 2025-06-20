import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Shield, Lock, Users } from "lucide-react"
import Link from "next/link"
import { SimpleAuthButton } from "@/components/auth/simple-auth-button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">CISO360AI</span>
            </div>

            <div className="flex items-center space-x-3">
              <SimpleAuthButton />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Welcome to CISO360AI</h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Comprehensive cybersecurity management platform powered by AI.
            <br />
            Streamline your security operations, manage risks, and protect your
            <br />
            organization.
          </p>

          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" className="bg-black hover:bg-gray-800">
              <Link href="/auth/signin">Get Started →</Link>
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
          <p className="text-lg text-gray-600">Everything you need to manage your cybersecurity posture</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Analytics Card */}
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Get insights with AI-powered analytics and comprehensive reporting
              </CardDescription>
            </CardContent>
          </Card>

          {/* Risk Management Card */}
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-xl">Risk Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Identify, assess, and mitigate cybersecurity risks across your organization
              </CardDescription>
            </CardContent>
          </Card>

          {/* Compliance Card */}
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Ensure compliance with industry standards and regulatory requirements
              </CardDescription>
            </CardContent>
          </Card>

          {/* Organisation Management Card */}
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle className="text-xl">Organisation Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Manage user accounts, roles, and permissions with advanced access controls
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

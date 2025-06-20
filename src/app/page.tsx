import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Shield, Users, BarChart3, Lock } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            Welcome to <span className="text-primary">CISO360AI</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Comprehensive cybersecurity management platform powered by AI. 
            Streamline your security operations, manage risks, and protect your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/dashboard">
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Key Features</h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to manage your cybersecurity posture
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <Link href="/dashboard">
            <Card className="text-center cursor-pointer transition-all hover:shadow-lg hover:scale-105">
              <CardHeader>
                <BarChart3 className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get insights with AI-powered analytics and comprehensive reporting
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard">
            <Card className="text-center cursor-pointer transition-all hover:shadow-lg hover:scale-105">
              <CardHeader>
                <Shield className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>Risk Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Identify, assess, and mitigate cybersecurity risks across your organization
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard">
            <Card className="text-center cursor-pointer transition-all hover:shadow-lg hover:scale-105">
              <CardHeader>
                <Lock className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Ensure compliance with industry standards and regulatory requirements
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link href="/organization/users">
            <Card className="text-center cursor-pointer transition-all hover:shadow-lg hover:scale-105">
              <CardHeader>
                <Users className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>Organisation Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Manage user accounts, roles, and permissions with advanced access controls
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

        </div>
      </section>

    </div>
  )
}
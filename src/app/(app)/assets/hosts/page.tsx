import { getIdToken, getOrgAndProjectIds } from "@/lib/auth"
import { HostManagement } from "@/components/host-management/host-management";

interface Host {
  id: string;
  hostname: string;
}

async function getHosts(): Promise<Host[]> {
    try {
        const idToken = await getIdToken();
        if (!idToken) {
            console.error("Authentication token not found.");
            return [];
        }

        const orgAndProject = await getOrgAndProjectIds();
        if (!orgAndProject) {
            // Error is logged within the helper function
            return [];
        }
        const { orgId, projectId } = orgAndProject;

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) {
            console.error("API URL is not configured.");
            return [];
        }

        const response = await fetch(`${apiUrl}/org/${orgId}/project/${projectId}/hosts`, {
            headers: {
                'Authorization': `Bearer ${idToken}`,
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            console.error(`Failed to fetch hosts: ${response.statusText}`);
            return [];
        }

        const data: Host[] = await response.json();
        return data;

    } catch (error) {
        console.error("An error occurred while fetching hosts:", error);
        return [];
    }
}


export default async function HostsPage() {
  const hosts = await getHosts();
  return <HostManagement hosts={hosts} />;
} 
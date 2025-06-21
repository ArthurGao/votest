  "use client"

  import * as React from "react"
  import { useSession } from 'next-auth/react'
  import Cookies from 'js-cookie'
  import { ChevronsUpDown, Check } from "lucide-react"

  import { cn } from '@/lib/utils'
  import { Button } from '@/components/ui/button'
  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from '@/components/ui/command'
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from '@/components/ui/popover'

  interface OrgProject {
    id: string
    name: string
  }

  interface OrgData {
    org_id: string
    organization_name: string
    projects: OrgProject[]
  }

  interface OrgSwitcherProps {
    apiUrl?: string;
  }

  export function OrgSwitcher({ apiUrl }: OrgSwitcherProps) {
    const [open, setOpen] = React.useState(false)
    const [orgs, setOrgs] = React.useState<OrgData[]>([])
    const [selectedValue, setSelectedValue] = React.useState(Cookies.get('current_org_project') || '')
    const { data: session, status } = useSession()

    console.log("OrgSwitcher rendered. Session status:", status, "Session data:", session);

    React.useEffect(() => {
      console.log("useEffect triggered. Session status:", status);
      if (status === 'authenticated' && session?.idToken && apiUrl) {
        console.log("Session authenticated, fetching projects from:", apiUrl);
        fetch(`${apiUrl}/auth/me/projects`, {
          headers: {
            Authorization: `Bearer ${session.idToken}`,
          },
        })
          .then((res) => res.json())
          .then((data: OrgData[]) => {            
            const orgsArray = Array.isArray(data) ? data : [];
            if (!Array.isArray(data)) {
              console.error("API did not return an array. Received:", data);
            }

            setOrgs(orgsArray);
            // If no project is selected in the cookie, select the first one by default
            if (!Cookies.get('current_org_project') && orgsArray.length > 0 && orgsArray[0].projects.length > 0) {
              console.log("Cookie not found, setting default...");
              const firstOrg = orgsArray[0];
              const firstProject = firstOrg.projects[0];
              const defaultValue = `${firstOrg.org_id}/${firstProject.id}`;
              setSelectedValue(defaultValue);
              console.log("Attempting to set cookie with value:", defaultValue);
              Cookies.set('current_org_project', defaultValue, { expires: 7 }); // Set cookie to expire in 7 days
              console.log("Cookie value after setting:", Cookies.get('current_org_project'));
            }
          })
          .catch(err => console.error("Failed to fetch or process projects:", err));
      }
    }, [session, status, apiUrl])

    const handleSelect = (value: string) => {
      console.log("handleSelect triggered with value:", value);
      setSelectedValue(value);
      Cookies.set('current_org_project', value);
      setOpen(false);
      // Use timeout to allow popover to close before reloading
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
    
    const selectedOrgProject = React.useMemo(() => {
      if (!selectedValue) return null;
      const [orgId, projectId] = selectedValue.split('/');
      for (const org of orgs) {
        const project = org.projects.find(p => p.id === projectId && org.org_id === orgId);
        if (project) {
          return { ...project, org_name: org.organization_name };
        }
      }
      return null;
    }, [selectedValue, orgs]);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[250px] justify-between"
          >
            {selectedOrgProject ? `${selectedOrgProject.org_name} / ${selectedOrgProject.name}` : 'Select a project...'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search project..." />
              <CommandEmpty>No project found.</CommandEmpty>
              {orgs.map((org) => (
                <CommandGroup key={org.org_id} heading={org.organization_name}>
                  {org.projects.map((project) => {
                    const itemValue = `${org.org_id}/${project.id}`;
                    return (
                      <CommandItem
                        key={itemValue}
                        value={itemValue}
                        onSelect={handleSelect}
                        className="text-sm"
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            selectedValue === itemValue
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {project.name}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
  }

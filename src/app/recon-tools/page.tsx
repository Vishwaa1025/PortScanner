"use client";

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const reconModules = [
  {
    name: 'Nmap Port Scanning',
    description: 'Scan open ports and detect running services.',
    link: '/recon-tools/nmap',
  },
  {
    name: 'WHOIS Lookup',
    description: 'Retrieve domain registration information.',
    link: '/recon-tools/whois/',
  },
  {
    name: 'DNS Enumeration (DNSRecon)',
    description: 'Perform DNS enumeration and zone transfers.',
    link: '/recon-tools/dns-enum',
  },
  {
    name: 'Subdomain Discovery (Sublist3r)',
    description: 'Discover hidden subdomains of a domain.',
    link: '/recon-tools/sublist3r',
  },
  {
    name: 'TheHarvester OSINT',
    description: 'Find emails, subdomains, and hosts using search engines.',
    link: '/recon-tools/theharvester',
  },
  {
    name: 'Amass OSINT',
    description: 'Perform OSINT and subdomain enumeration.',
    link: '/recon-tools/amass',
  },
  {
    name: 'Nikto Web Vulnerability Scanner',
    description: 'Scan web servers for known vulnerabilities.',
    link: '/recon-tools/nikto',
  },
];

export default function ReconDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-8">Reconnaissance Tools</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reconModules.map((module) => (
          <Card key={module.name} className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle>{module.name}</CardTitle>
              <CardDescription>{module.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={module.link}>
                <Button className="w-full">Start {module.name}</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

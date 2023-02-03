"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { FC } from "react";
import { Button } from "./ui/button";

export const OrganizationPicker: FC<{ organizations: any[] }> = ({
  organizations,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Orgs</Button>
      </DropdownMenuTrigger>{" "}
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          <Link href={`/dashboard/`}>{} jo</Link>
        </DropdownMenuItem>
        {organizations.map(organization => (
          <DropdownMenuItem>
            <Link href={`/dashboard/${organization?.slug}`}>
              {organization?.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

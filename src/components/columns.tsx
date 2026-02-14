import type { ColumnDef } from "@tanstack/react-table";
import type { Character } from "../types/character";
import { Badge } from "./ui/badge";
import { MoreHorizontal, Eye } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

// Tipo para as props da coluna de ações
export type CharacterActions = {
  onViewDetails: (character: Character) => void;
};

export const createColumns = (actions: CharacterActions): ColumnDef<Character>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      return (
        <div className="flex items-center gap-3">
          <img
            src={row.original.image}
            alt={name}
            className="h-10 w-10 rounded-full object-cover border-2 border-slate-700"
          />
          <span className="font-medium text-white">{name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      
      const getVariant = (status: string) => {
        switch (status.toLowerCase()) {
          case "alive":
            return "success";
          case "dead":
            return "destructive";
          default:
            return "secondary";
        }
      };

      return (
        <Badge variant={getVariant(status)}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "species",
    header: "Species",
    cell: ({ row }) => {
      return (
        <span className="text-slate-300">{row.getValue("species")}</span>
      );
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => {
      const gender = row.getValue("gender") as string;
      return (
        <span className="capitalize text-slate-300">{gender.toLowerCase()}</span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const character = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => actions.onViewDetails(character)}
              className="cursor-pointer"
            >
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

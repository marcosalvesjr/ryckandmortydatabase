import type { Character } from "../types/character";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { MapPin, Tv } from "lucide-react";

interface CharacterDetailsModalProps {
  character: Character | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CharacterDetailsModal({
  character,
  open,
  onOpenChange,
}: CharacterDetailsModalProps) {
  if (!character) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl bg-slate-900 border-slate-700 text-white overflow-hidden p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-3xl font-bold flex flex-col md:flex-row gap-6 items-start">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt blur"></div>
              <img
                src={character.image}
                alt={character.name}
                className="relative h-32 w-32 md:h-40 md:w-40 rounded-full object-cover border-4 border-slate-900 shadow-xl"
              />
            </div>
            <div className="flex-1 space-y-2 pt-2">
              <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                {character.name}
              </h2>
              <div className="flex flex-wrap gap-2 items-center">
                <Badge
                  className={`px-3 py-1 text-sm font-medium border-0 ${character.status.toLowerCase() === "alive"
                    ? "bg-green-500/20 text-green-400"
                    : character.status.toLowerCase() === "dead"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-slate-500/20 text-slate-400"
                    }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full mr-2 ${character.status.toLowerCase() === "alive"
                      ? "bg-green-400"
                      : character.status.toLowerCase() === "dead"
                        ? "bg-red-400"
                        : "bg-slate-400"
                      }`}
                  ></span>
                  {character.status} - {character.species}
                </Badge>
                {character.type && (
                  <Badge variant="outline" className="border-slate-600 text-slate-300">
                    {character.type}
                  </Badge>
                )}
                <Badge variant="outline" className="px-3 py-1 text-sm font-medium border-slate-600 text-slate-300">
                  {character.gender}
                </Badge>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-slate-800/30">
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-400" /> Locations
              </h3>
              <div className="space-y-4 pl-1">
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 hover:border-blue-500/30 transition-colors">
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Origin</span>
                  <p className="text-lg text-white font-medium mt-1">{character.origin.name}</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 hover:border-blue-500/30 transition-colors">
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Current Location</span>
                  <p className="text-lg text-white font-medium mt-1">{character.location.name}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
                <Tv className="h-5 w-5 text-purple-400" /> Appearances
              </h3>
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400">Total Episodes</span>
                  <span className="text-2xl font-bold text-white">{character.episode.length}</span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-2 mb-4">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                    style={{ width: `${Math.min((character.episode.length / 51) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-sm text-slate-500">
                  First seen in episode:{" "}
                  <span className="text-slate-300 font-medium">
                    {character.episode[0]?.split("/").pop() || "Unknown"}
                  </span>
                </p>
                {character.episode.length > 1 && (
                  <p className="text-sm text-slate-500 mt-1">
                    Last seen in episode:{" "}
                    <span className="text-slate-300 font-medium">
                      {character.episode[character.episode.length - 1]?.split("/").pop() || "Unknown"}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/80 p-6 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => onOpenChange(false)}
            className="px-6 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors font-medium text-sm"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

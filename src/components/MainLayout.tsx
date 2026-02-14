import { Outlet, useSearchParams } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarProvider,
  SidebarSeparator,
} from "./ui/sidebar";
import { Search, Filter, X, ChevronDown, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const MainLayout = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const genderFilter = searchParams.get("gender") || "";
  const statusFilter = searchParams.get("status") || "";
  const speciesFilter = searchParams.get("species") || "";
  const typeFilter = searchParams.get("type") || "";
  const nameFilter = searchParams.get("name") || "";

  // Opções de filtros
  const statusOptions = [
    { value: "", label: "Todos" },
    { value: "alive", label: "Vivo" },
    { value: "dead", label: "Morto" },
    { value: "unknown", label: "Desconhecido" },
  ];

  const genderOptions = [
    { value: "", label: "Todos" },
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
    { value: "genderless", label: "Genderless" },
    { value: "unknown", label: "Unknown" },
  ];

  const speciesOptions = [
    { value: "", label: "Todas" },
    { value: "human", label: "Humano" },
    { value: "alien", label: "Alienígena" },
    { value: "humanoid", label: "Humanoide" },
    { value: "poopybutthole", label: "Poopybutthole" },
    { value: "mythological creature", label: "Criatura Mitológica" },
    { value: "animal", label: "Animal" },
    { value: "robot", label: "Robô" },
    { value: "cronenberg", label: "Cronenberg" },
    { value: "disease", label: "Doença" },
  ];

  const typeOptions = [
    { value: "", label: "Todos" },
    { value: "genetic experiment", label: "Experimento Genético" },
    { value: "superhuman", label: "Super-humano" },
    { value: "parasite", label: "Parasita" },
    { value: "clone", label: "Clone" },
    { value: "antenna", label: "Antena" },
    { value: "god", label: "Deus" },
    { value: "demon", label: "Demônio" },
  ];

  const handleFilterChange = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === "") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newParams = new URLSearchParams(searchParams);
    if (e.target.value) {
      newParams.set("name", e.target.value);
    } else {
      newParams.delete("name");
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams({ page: "1" }));
  };

  const hasActiveFilters =
    genderFilter || statusFilter || speciesFilter || typeFilter || nameFilter;

  // Componente para grupo de filtros com DropdownMenu
  const FilterGroup = ({
    title,
    options,
    currentValue,
    onChange,
  }: {
    title: string;
    options: { value: string; label: string }[];
    currentValue: string;
    onChange: (value: string) => void;
  }) => {
    const selectedLabel = options.find((o) => o.value === currentValue)?.label;

    return (
      <SidebarGroup className="py-1">
        <SidebarGroupContent>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between text-slate-300 hover:text-white hover:bg-slate-800 px-2"
              >
                <span className="font-medium text-sm">{title}</span>
                <div className="flex items-center gap-2">
                  {currentValue && (
                    <span className="text-xs text-blue-400 truncate max-w-[80px]">
                      {selectedLabel}
                    </span>
                  )}
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-slate-900 border-slate-800 text-slate-300"
              align="start"
            >
              <DropdownMenuLabel className="text-slate-400 text-xs uppercase tracking-wider">
                {title}
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-800" />
              {options.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() =>
                    onChange(option.value === currentValue ? "" : option.value)
                  }
                  className={`cursor-pointer ${currentValue === option.value
                    ? "bg-slate-800 text-blue-400 focus:text-blue-400"
                    : "focus:bg-slate-800 focus:text-slate-200"
                    }`}
                >
                  <span className="flex-1">{option.label}</span>
                  {currentValue === option.value && (
                    <Check className="ml-auto h-4 w-4" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen futuristic-bg relative w-full">
        {/* Background effects */}
        <div className="grid-bg"></div>
        <div className="particles pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="particle"></div>
          ))}
        </div>
        <div className="scanlines pointer-events-none"></div>

        {/* Layout Container */}
        <div className="flex min-h-screen">
          {/* Sidebar - Lado esquerdo */}
          <aside className="w-64 shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col fixed left-0 top-0 h-screen z-20">
            <SidebarHeader className="border-b border-slate-800 p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-sm">R&M</span>
                </div>
                <div>
                  <h2 className="text-white font-bold text-lg">Rick & Morty</h2>
                  <p className="text-slate-400 text-xs">Database</p>
                </div>
              </div>
            </SidebarHeader>

            <SidebarContent className="flex-1 overflow-y-auto p-4">
              {/* Search */}
              <SidebarGroup>
                <SidebarGroupLabel className="text-slate-400 font-semibold uppercase text-xs tracking-wider flex items-center gap-2 mb-2">
                  <Search className="w-3 h-3" />
                  Buscar
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Nome do personagem..."
                      value={nameFilter}
                      onChange={handleSearchChange}
                      className="bg-slate-800/60 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 text-sm"
                    />
                    {nameFilter && (
                      <button
                        onClick={() => handleFilterChange("name", "")}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarSeparator className="bg-slate-800 my-4" />

              {/* Filters */}
              <FilterGroup
                title="Status"
                options={statusOptions}
                currentValue={statusFilter}
                onChange={(value) => handleFilterChange("status", value)}
              />

              <SidebarSeparator className="bg-slate-800 my-4" />

              <FilterGroup
                title="Espécie"
                options={speciesOptions}
                currentValue={speciesFilter}
                onChange={(value) => handleFilterChange("species", value)}
              />

              <SidebarSeparator className="bg-slate-800 my-4" />

              <FilterGroup
                title="Tipo"
                options={typeOptions}
                currentValue={typeFilter}
                onChange={(value) => handleFilterChange("type", value)}
              />

              <SidebarSeparator className="bg-slate-800 my-4" />

              <FilterGroup
                title="Gênero"
                options={genderOptions}
                currentValue={genderFilter}
                onChange={(value) => handleFilterChange("gender", value)}
              />

              {hasActiveFilters && (
                <>
                  <SidebarSeparator className="bg-slate-800 my-4" />
                  <SidebarGroup>
                    <SidebarGroupContent>
                      <Button
                        onClick={clearAllFilters}
                        variant="ghost"
                        className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/10 text-xs"
                      >
                        <X className="w-3 h-3 mr-1" />
                        Limpar filtros
                      </Button>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </>
              )}
            </SidebarContent>
          </aside>

          {/* Main Content Area - Lado direito com margem para sidebar */}
          <main className="flex-1 ml-64 min-h-screen flex flex-col relative z-10">
            {/* Header */}
            <header className="sticky top-0 bg-slate-900/95 backdrop-blur-xl border-b border-blue-500/30 shadow-lg shadow-blue-500/10 z-20">
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 text-glow">
                      Personagens
                    </h1>
                  </div>
                </div>

                {/* Active Filters Display */}
                {hasActiveFilters && (
                  <div className="hidden md:flex items-center gap-2 flex-wrap justify-end max-w-lg">
                    <Filter className="w-4 h-4 text-slate-400 shrink-0" />
                    <div className="flex flex-wrap gap-1">
                      {statusFilter && (
                        <Badge
                          variant="outline"
                          className="bg-slate-800 text-slate-300 border-slate-600 text-xs"
                        >
                          Status:{" "}
                          {
                            statusOptions.find((o) => o.value === statusFilter)
                              ?.label
                          }
                        </Badge>
                      )}
                      {speciesFilter && (
                        <Badge
                          variant="outline"
                          className="bg-slate-800 text-slate-300 border-slate-600 text-xs"
                        >
                          Espécie:{" "}
                          {
                            speciesOptions.find((o) => o.value === speciesFilter)
                              ?.label
                          }
                        </Badge>
                      )}
                      {typeFilter && (
                        <Badge
                          variant="outline"
                          className="bg-slate-800 text-slate-300 border-slate-600 text-xs"
                        >
                          Tipo:{" "}
                          {typeOptions.find((o) => o.value === typeFilter)?.label}
                        </Badge>
                      )}
                      {genderFilter && (
                        <Badge
                          variant="outline"
                          className="bg-slate-800 text-slate-300 border-slate-600 text-xs"
                        >
                          Gênero:{" "}
                          {
                            genderOptions.find((o) => o.value === genderFilter)
                              ?.label
                          }
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </header>

            {/* Content - Outlet renderiza a Home aqui */}
            <div className="flex-1 p-6 overflow-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DataTable } from '../components/data-table';
import { createColumns } from '../components/columns';
import { CharacterDetailsModal } from '../components/character-details-modal';
import type { Character, ApiResponse, PaginationMeta } from '../types/character';
import '../futuristic.css';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [pagination, setPagination] = useState<PaginationMeta>({
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const genderFilter = searchParams.get('gender') || '';
  const statusFilter = searchParams.get('status') || '';
  const speciesFilter = searchParams.get('species') || '';
  const typeFilter = searchParams.get('type') || '';
  const nameFilter = searchParams.get('name') || '';
  const pageParam = parseInt(searchParams.get('page') || '1', 10);

  const fetchCharacters = useCallback(async (pageNum: number) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      params.append('page', pageNum.toString());
      if (genderFilter) params.append('gender', genderFilter);
      if (statusFilter) params.append('status', statusFilter);
      if (speciesFilter) params.append('species', speciesFilter);
      if (typeFilter) params.append('type', typeFilter);
      if (nameFilter) params.append('name', nameFilter);
      
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?${params.toString()}`
      );
      
      if (!response.ok) {
        if (response.status === 404) {
          setCharacters([]);
          setPagination({
            currentPage: pageNum,
            totalPages: 1,
            hasNextPage: false,
            hasPrevPage: false,
          });
          return;
        }
        throw new Error('Erro ao buscar personagens');
      }

      const data: ApiResponse = await response.json();
      
      setCharacters(data.results);
      setPagination({
        currentPage: pageNum,
        totalPages: data.info.pages,
        hasNextPage: data.info.next !== null,
        hasPrevPage: data.info.prev !== null,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  }, [genderFilter, statusFilter, speciesFilter, typeFilter, nameFilter]);

  useEffect(() => {
    fetchCharacters(pageParam);
  }, [pageParam, fetchCharacters]);

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    setSearchParams(newParams);
  };

  const handleViewDetails = (character: Character) => {
    setSelectedCharacter(character);
    setModalOpen(true);
  };

  // Memoize columns
  const columns = useMemo(() => 
    createColumns({ onViewDetails: handleViewDetails }),
    []
  );

  return (
    <div className="relative">
      {/* Loading State */}
      {loading && characters.length === 0 && (
        <div className="flex justify-center items-center py-20">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            <div className="absolute inset-0 animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 animate-pulse"></div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-20">
          <p className="text-red-400 text-lg text-glow">{error}</p>
          <button
            onClick={() => fetchCharacters(pageParam)}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 pulse-glow"
          >
            Tentar Novamente
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && characters.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-slate-400 text-lg">
            Nenhum personagem encontrado.
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Tente ajustar os filtros no menu lateral
          </p>
        </div>
      )}

      {/* Data Table */}
      {!error && characters.length > 0 && (
        <div className="animate-slide-up space-y-4">
          <DataTable
            columns={columns}
            data={characters}
            pagination={pagination}
            onPageChange={handlePageChange}
            loading={loading}
          />
        </div>
      )}

      {/* Character Details Modal */}
      <CharacterDetailsModal
        character={selectedCharacter}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
};

export default Home;

import { useCallback, useEffect, useState } from "react";
import { LaboratoryAsset, users } from "../../services/endpoints";
import { Asset, User } from "../../shared/constants/interfaces";
import { toast } from "react-toastify";
import TableRoot from "../../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import SearchFilterRoot from "../../components/SearchFilters/SearchFilterTables";
import * as S from "./styles";
import { ModalGeneral } from "../../components/Modals/ModalGeneral";
import AddAssetModal from "./components/modals/AddAssetModal";
import defaultUserImage from "../../assets/user.jpg";

const PatrimonyPage = () => {
  const [data, setData] = useState<Asset[]>([]);
  const [dataUsers, setDataUsers] = useState<User[]>([]);
  const [filteredData, setFilteredData] = useState<Asset[]>(data);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const [userImages, setUserImages] = useState<{ [key: string]: string }>({});
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [sortField, setSortField] = useState<string>("created_at"); 
  const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("DESC");

  const fetchUserImage = async (userId: string | undefined) => {
    if (!userId) return defaultUserImage; 
  
    try {
      const response = await users.profilePictureGet(userId);
      return URL.createObjectURL(new Blob([response.data], { type: "image/jpeg" }));
    } catch (error) {
      console.error(`Erro ao buscar imagem do usuário ${userId}:`, error);
      return defaultUserImage; 
    }
  };

  const loadUserImages = async (assets: Asset[]) => {
    const imagesMap: { [key: string]: string } = {};
    for (const asset of assets) {
      if (asset.user?.id) {
        imagesMap[asset.user.id] = await fetchUserImage(asset.user.id);
      }
    }
    setUserImages(imagesMap);
  };

  const filterData = (data: any[], query: string) => {
    if (!query) return data;
    return data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleSearch = async (query: string): Promise<void> => {
    setSearchQuery(query);
    setCurrentPage(0);
    return Promise.resolve(); 
  };

  const fetchAssets = useCallback(async () => {
    try {
      setIsLoading(true);
      const responseAssets = await LaboratoryAsset.getAssest({
        take: pageSize,
        skip: currentPage * pageSize,
        [`order[${sortField}]`]: sortDirection,
        ...(searchQuery && { "search[name]": searchQuery }),
      });
      const responseUsers = await users.getUsers();
      setData(responseAssets.items);
      setDataUsers(responseUsers.items);
      setFilteredData(responseAssets.items);
      setTotalCount(responseAssets.totalCount || responseAssets.items.length); 
      await loadUserImages(responseAssets.items);
    } catch (error) {
      toast.error(`Erro ao carregar patrimônios: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, pageSize, sortField, sortDirection, searchQuery]);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets, refreshTrigger, sortField, sortDirection]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(0);
  };

  const handleSort = (field: string, direction: "ASC" | "DESC") => {
    const mappedField = {
      assetId: "assetId",
      name: "name",
      category: "category",
      manufacturer: "manufacturer",
      affiliation: "affiliation",
    }[field] || field; 
    setSortField(mappedField);
    setSortDirection(direction);
    setCurrentPage(0); 
  };

  const refreshAssets = async () => {
    setSortField("created_at"); 
    setSortDirection("DESC");   
    setCurrentPage(0);          
    await fetchAssets();        
  };

  const columnHelperAsset = createColumnHelper<Asset>();

  const assetsColumns = [
    columnHelperAsset.accessor("assetId", {
      header: () => "ID Produto",
      cell: (info) => info.getValue(),
      meta: { sortable: true },
    }),
    columnHelperAsset.accessor("name", {
      header: () => "Nome",
      cell: (info) => info.getValue(),
      meta: { sortable: true },
    }),
    columnHelperAsset.accessor("category", {
      header: () => "Categoria",
      cell: (info) => info.getValue(),
      meta: { sortable: true },
    }),
    columnHelperAsset.accessor("manufacturer", {
      header: () => "Marca",
      cell: (info) => info.getValue(),
      meta: { sortable: true },
    }),
    columnHelperAsset.accessor("affiliation", {
      header: () => "Filiação",
      cell: (info) => info.getValue(),
      meta: { sortable: true },
    }),
    columnHelperAsset.display({
      id: "user",
      header: () => "Responsável",
      cell: (info) => {
        const userId = info.row.original.user?.id;
        const imageUrl = userId ? userImages[userId] || defaultUserImage : defaultUserImage;
        return <img src={imageUrl} alt="User" width={40} height={40} style={{ borderRadius: "50%" }} />;
      },
    }),
    columnHelperAsset.accessor("options", {
      header: () => "",
      cell: (info) => info.renderValue(),
    }),
  ];

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <S.PageContainer>
      <SearchFilterRoot onSearch={handleSearch} data={data} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      
      <ModalGeneral title="Novo Patrimônio" show={isModalOpen} onClose={closeModal} width="600px">
        <AddAssetModal onClose={closeModal} users={dataUsers} refreshAssets={refreshAssets} />
      </ModalGeneral>

      <S.TableContainer>
        <TableRoot
          data={filteredData}
          columns={assetsColumns}
          users={dataUsers}
          refreshData={refreshAssets}
          totalCount={searchQuery ? filteredData.length : totalCount}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          isPaginationEnabled={true} 
          onSort={handleSort}
        />
      </S.TableContainer>

    </S.PageContainer>
  );
};

export default PatrimonyPage;

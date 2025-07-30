import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { research } from "../../services/endpoints";
import { Article, Asset, Base, ProjectTable, User, UsersProjectSummary } from "../../shared/constants/interfaces";
import RemoveAssetModal from "../../views/Patrimony/components/modals/DeleteAssetModal";
import EditAssetModal from "../../views/Patrimony/components/modals/EditAssetModal";
import UpdateProjectStatusModal from "../../views/Projects/components/Modal/UpdateStatusModal";
import AddArticleModal from "../../views/Research/components/Modals/AddArticleModal";
import AddBaseModal from "../../views/Research/components/Modals/AddBaseModal";
import { ModalTable } from "../../views/Research/components/Modals/ModalTable";
import DropdownThreeDots from "../Buttons/ThreeDotsDropdownButton";
import { ModalGeneral } from "../Modals/ModalGeneral";
import { PaginationContainer, StyledLastColumn, StyledTable } from "./styles";

interface TableProps {
  data: (Base | Article | ProjectTable | Asset | UsersProjectSummary)[];
  columns: any[];
  users?: User[];
  setBases?: React.Dispatch<React.SetStateAction<Base[]>>;
  setFilteredData?: React.Dispatch<
    React.SetStateAction<(Base | Article | ProjectTable | Asset | UsersProjectSummary )[]>
  >;
  setArticles?: React.Dispatch<React.SetStateAction<Article[]>>;
  refreshData?: () => void;
  totalCount?: number;
  currentPage?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  isPaginationEnabled?: boolean;
  onSort?: (sortField: string, sortDirection: "ASC" | "DESC") => void;
  updateProjectStatus?: (projectId: string, newStatus: string) => void;
}

const TableRoot = ({
  data,
  columns,
  users,
  setBases,
  setFilteredData,
  setArticles,
  refreshData,
  totalCount = 0,
  currentPage = 0,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
  isPaginationEnabled = false,
  onSort,
  updateProjectStatus,
}: TableProps) => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<string | null>(
    null
  );
  const [sortState, setSortState] = useState<{ field: string; direction: "ASC" | "DESC" } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<
    Base | Article | ProjectTable | Asset | UsersProjectSummary | null
  >(null); 

  const navigate = useNavigate();
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedRow(null);
  };

  const closeProjectModal = () => {
    setIsProjectModalOpen(false);
    setSelectedRow(null);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: isPaginationEnabled,
    pageCount: isPaginationEnabled ? Math.ceil(totalCount / pageSize) : undefined,
    state: {
      pagination: {
        pageIndex: currentPage,
        pageSize: pageSize,
      },
    },
    onPaginationChange: isPaginationEnabled
      ? (updater) => {
        if (typeof updater === 'function') {
          const newPagination = updater({ pageIndex: currentPage, pageSize });
          if (onPageChange && newPagination.pageIndex !== currentPage) {
            onPageChange(newPagination.pageIndex);
          }
          if (onPageSizeChange && newPagination.pageSize !== pageSize) {
            onPageSizeChange(newPagination.pageSize);
          }
        }
      }
      : undefined,
  });

  const handleSort = (field: string) => {
    const newDirection =
      sortState?.field === field && sortState.direction === "ASC" ? "DESC" : "ASC";
    setSortState({ field, direction: newDirection });
    if (onSort) {
      onSort(field, newDirection);
    }
  };

  const renderSortArrow = (field: string) => {
    if (sortState?.field === field) {
      return sortState.direction === "ASC" ? (
        <IoMdArrowDropup style={{ marginLeft: "5px" }} />
      ) : (
        <IoMdArrowDropdown style={{ marginLeft: "5px" }} />
      );
    }
    return <IoMdArrowDropdown style={{ marginLeft: "5px", opacity: 0.5 }} />; // Seta padrão pra baixo
  };

  //const location = useLocation();

  //const isBasesRoute = location.pathname === "/research/bases";

  const handleBaixarPDF = async (row: Article) => {
    try {
      const blob = await research.getPDFArticle(row.id!);
      const pdf = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = pdf;
      link.setAttribute("download", `${row.title}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast.error("PDF NÃO DISPONÍVEL")
    }
  };

  const handleDelete = async (row: Base | Article) => {
    try {
      if (isBase(row)) {
        await research.removeBase(row.id!);
      } else if (isArticle(row)) {
        await research.removeArticle(row.id!);
      }

      if (isBase(row) && setBases && setFilteredData) {
        setBases((prevData) => prevData.filter((base) => base.id !== row.id));
        setFilteredData((prevData) => prevData.filter((base) => base.id !== row.id));
      } else if (isArticle(row) && setArticles && setFilteredData) {
        setArticles((prevData) => prevData.filter((article) => article.id !== row.id));
        setFilteredData((prevData) => prevData.filter((article) => article.id !== row.id));
      }

      toast.success(`${isBase(row) ? "Base" : "Artigo"} deletado com sucesso!`);
    } catch (error) {
      toast.error("Não foi possível deletar");
    }
  };

  const handleDropdownToggle = (rowId: string) => {
    setOpenDropdownIndex((prev) => (prev === rowId ? null : rowId));
  };

  const handleEditar = async (
    newData: Base | Article | Asset,
    id?: string,
    pdfUrl?: string
  ) => {
    try {
      if (isBase(newData)) {
        await research.updateBases(newData.id!, newData);

        const updatedData = data.map((item) =>
          isBase(item) && item.id === newData.id
            ? { ...item, ...newData }
            : item
        ) as Base[];
        if (setBases) {
          setBases(updatedData);
        }
        if (setFilteredData) {
          setFilteredData(updatedData);
        }
        toast.success(`Sucesso ao editar base`);
      } else if (isArticle(newData)) {
        console.log(" Dado novo que chegou para ser editado ",newData);

        const NewPaper = await research.updatePaper(id!, newData);
        console.log("new paper : ", NewPaper)
        if (pdfUrl) {
          const fileToUpload = await fetch(pdfUrl)
            .then((res) => res.blob())
            .then((blob) => {
              const fileName = `document.${blob.type.split("/")[1]}`;
              return new File([blob], fileName, { type: blob.type });
            });
          const response = await research.uploadPdfPaper(id!, fileToUpload);
          newData = { ...newData, pdf_mongo_id: response.mongo_id };
        }
        const updatedData = data.map((item) =>
          isArticle(item) && item.id === id ? { ...item, ...newData } : item
        ) as Article[];
        if (setArticles) {
          setArticles(updatedData);
        }

        if (setFilteredData) {
          setFilteredData(updatedData);
        }
        toast.success(`Sucesso ao editar artigo`);
      } else if (isAsset(newData)) {
        const updatedData = data.map((item) =>
          isAsset(item) && item.id === newData.id ? { ...item, ...newData } : item
        ) as Article[];
        console.log(updatedData)
        setArticles && setArticles(updatedData);
        setFilteredData && setFilteredData(updatedData)
      }
    } catch (error) {
      toast.error(`Error ao editar base: ${error}`);
    }
  };

  const isBase = (item: Base | Article | ProjectTable | Asset | UsersProjectSummary | null): item is Base => {
    return (item as Base).description !== undefined && (item as Base).access_link !== undefined;
  };

  const isArticle = (
    item: Base | Article | ProjectTable | Asset | UsersProjectSummary | null
  ): item is Article => {
    return (item as Article).DOI !== undefined;
  };

  const isProject = (
    item: Base | Article | ProjectTable | Asset | UsersProjectSummary | null
  ): item is ProjectTable => {
    return (item as ProjectTable).Members !== undefined;
  };

  const isAsset = (
    item: Base | Article | ProjectTable | Asset | UsersProjectSummary | null
  ): item is Asset => {
    return (item as Asset).affiliation !== undefined;
  };

  const isUsersProjectSummary = (item: any): item is UsersProjectSummary => {
    return item.user !== undefined && item.projects !== undefined && item.totalGrantAmount !== undefined;
  };

  const handleOpenModal = (row: Base | Article | ProjectTable | Asset | UsersProjectSummary) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (row: Base | Article | ProjectTable | Asset | UsersProjectSummary) => {
    setSelectedRow(row);
    setIsDeleteModalOpen(true);
  };

  const handleOpenProjectModal = (row: ProjectTable) => {
    setSelectedRow(row);
    setIsProjectModalOpen(true);
  };

  const handleEditProjectModal = (row: ProjectTable) => {
    console.log("Editar row: ", row)
  };


  const generateOptions = (row: Base | Article | ProjectTable | Asset | UsersProjectSummary) => {
    if (isBase(row)) {
      const options = [{ title: "Editar", action: () => handleOpenModal(row) }];
      options.push({
        title: "Excluir",
        action: () => handleDelete(row),
      });

      return options;
    } else if (isArticle(row)) {
      const options = [{ title: "Editar", action: () => handleOpenModal(row), disabled: false }];

      options.push({
        title: "Baixar PDF",
        action: () => handleBaixarPDF(row),
        disabled: !row.pdf_mongo_id,
      });

      options.push({
        title: "Excluir",
        action: () => handleDelete(row),
        disabled: false,
      });

      return options;
    } else if (isProject(row)) {
      return [
        {
          title: "Ver Mais",
          action: () => navigate(`/projects/${row.id}`)
        },
        {
          title: "Alterar Status",
          action: () => handleOpenProjectModal(row),
        },
        {
          title: "Editar",
          action: () => handleEditProjectModal(row),
        },
      ];
    } else if (isAsset(row)) {
      const options = [{ title: "Editar", action: () => handleOpenModal(row), disabled: false }];
      options.push({
        title: "Excluir",
        action: () => handleOpenDeleteModal(row),
        disabled: false,
      });

      return options;
    }
    return [];
  };

  return (
    <StyledTable>
      <table>
      <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const isSortable = (header.column.columnDef.meta as any)?.sortable ?? false;
                const columnStyle = (header.column.columnDef.meta as any)?.style || {};
                return (
                  <th
                    key={header.id}
                    onClick={isSortable ? () => handleSort(header.column.id) : undefined}
                    style={{ ...columnStyle, ...(isSortable ? { cursor: "pointer" } : {}) }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                      {isSortable && renderSortArrow(header.column.id)}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell, index) => {
                const isLastColumn = index === row.getVisibleCells().length - 1;
                const rowData = row.original;
                const showDropdown = !isUsersProjectSummary(rowData);
                const cellStyle = (cell.column.columnDef.meta as any)?.style || {};
                return (
                  <td key={cell.id} style={cellStyle}>
                    {isLastColumn && showDropdown ? (
                      <StyledLastColumn>
                        <span>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </span>
                        <DropdownThreeDots
                          options={generateOptions(rowData)}
                          isOpen={openDropdownIndex === row.id}
                          onToggle={() => handleDropdownToggle(row.id)}
                        />
                      </StyledLastColumn>
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {isPaginationEnabled && (
        <PaginationContainer>
          {/* Extremidade esquerda: Itens exibidos */}
          <span className="pagination-items">
            {`${currentPage * pageSize + 1}-${Math.min((currentPage + 1) * pageSize, totalCount)} de ${totalCount} itens`}
          </span>

          <div className="pagination-controls">
            <button
              onClick={() => onPageChange && onPageChange(0)}
              disabled={!table.getCanPreviousPage()}
              className="pagination-button"
            >
              {'<<'}
            </button>
            <button
              onClick={() => onPageChange && onPageChange(currentPage - 1)}
              disabled={!table.getCanPreviousPage()}
              className="pagination-button"
            >
              {'<'}
            </button>
            <div className="pagination-pages">
              {Array.from({ length: table.getPageCount() }, (_, index) => (
                <button
                  key={index}
                  onClick={() => onPageChange && onPageChange(index)}
                  className={`page-number ${index === currentPage ? 'active' : ''}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => onPageChange && onPageChange(currentPage + 1)}
              disabled={!table.getCanNextPage()}
              className="pagination-button"
            >
              {'>'}
            </button>
            <button
              onClick={() => onPageChange && onPageChange(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="pagination-button"
            >
              {'>>'}
            </button>
          </div>
          <div className="pagination-size">
            <select
              value={pageSize}
              onChange={e => onPageSizeChange && onPageSizeChange(Number(e.target.value))}
              className="pagination-size-selector"
            >
              {[10, 20, 30, 50].map(size => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span className="pagination-size-label">Itens por página</span>
          </div>
        </PaginationContainer>
      )}

      {isModalOpen && isBase(selectedRow) && (
        <ModalTable
          width="500px"
          title="Editar Base"
          show={isModalOpen}
          onClose={closeModal}
        >
          <AddBaseModal
            onClose={closeModal}
            addBase={handleEditar}
            baseEdit={selectedRow}
          />
        </ModalTable>
      )}

      {isModalOpen &&
        isArticle(selectedRow) &&
        (
          (
            <ModalTable
              width="500px"
              title="Editar Artigo"
              show={isModalOpen}
              onClose={closeModal}
            >
              <AddArticleModal
                onClose={closeModal}
                addArticle={handleEditar}
                articleEdit={selectedRow}
              />
            </ModalTable>
          ))}

      {isModalOpen && isProject(selectedRow) && (
        <ModalTable
          width="500px"
          title="Editar Artigo"
          show={isModalOpen}
          onClose={closeModal}
        >
          <AddArticleModal onClose={closeModal} addArticle={handleEditar} />
        </ModalTable>
      )}
      {isDeleteModalOpen && isAsset(selectedRow) && (
        <ModalGeneral width="500px" title="DESEJA EXCLUIR O PATRIMÔNIO?" show={isDeleteModalOpen} onClose={closeDeleteModal}>
          <RemoveAssetModal onClose={closeDeleteModal} selectedAsset={selectedRow} refreshAsset={refreshData} />
        </ModalGeneral>
      )}
      {isModalOpen && isAsset(selectedRow) && (
        <ModalGeneral width="500px" title="Editar Patrimônio" show={isModalOpen} onClose={closeModal}>
          <EditAssetModal onClose={closeModal} users={users} asset={selectedRow} refreshAssets={refreshData} />
        </ModalGeneral>
      )}
      {isProjectModalOpen && isProject(selectedRow) && (
        <ModalGeneral
          width="300px"
          title="Alterar Status"
          show={isProjectModalOpen}
          onClose={closeProjectModal}
        >
          <UpdateProjectStatusModal
            project={selectedRow}
            onClose={closeProjectModal}
            refreshData={(newStatus) => {
              if (updateProjectStatus && selectedRow && newStatus) {
                updateProjectStatus(selectedRow.id, newStatus); 
              }
            }}
          />
        </ModalGeneral>
      )}
    </StyledTable>
  );
};

export default TableRoot;

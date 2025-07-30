import {
  Article,
  Asset,
  AuthRequest,
  AuthResponse,
  Base,
  CreateMember,
  ExpertiseOptionsResponse,
  EditAcessControlInterface,
  ProjectsResponse,
  LaboratoryAssets,
  ResetPassword,
  StacksResponse,
  UpdateFirstLoginRequest,
  UpdateUserStacksRequest,
  UsersResponse,
  UserStackRequest,
  ProjectRequest,
  UserLinkStatusResponse,
  UserLinkResponse,
  UsersProjectSummary,
} from "../shared/constants/interfaces";
import { get, post, put, remove } from "./api";

export const authEndpoints = {
  login: (params: AuthRequest) =>
    post<AuthResponse>("/api/auth/login", params).then(
      (response) => response.data
    ),
  me: (token: string) =>
    get("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    }),
  refreshToken: (refreshToken: string) =>
    post("/api/auth/refresh-token", refreshToken),
  resetPassword: (params: ResetPassword) =>
    post("/api/auth/reset-password", params).then((response) => response.data),
  logout: () => get("/api/auth/logout").then((response) => response.data),
};

export const users = {
  getUsers: (params?: any): Promise<UsersResponse> =>
    get("/api/user", { params }).then((response) => response.data),
  createUser: (params: CreateMember) =>
    post("/api/user", params).then((response) => response.data),
  updateFirstLogin: (id: string, params: UpdateFirstLoginRequest) =>
    put(`/api/user/update-first-login/${id}`, params),
  searchInfo: (subject: "university" | "course", name: string) =>
    get(`/api/user-institutional/search/${subject}?name=${name}`).then(
      (response) => response.data
    ),
  updateUser: (id: string, params: any) => put(`/api/user/${id}`, params),
  profilePicturePost: (id: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return post(`/api/user/profile-picture/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  profilePictureGet: (id: string) =>
    get(`/api/user/profile-picture/${id}`, {
      responseType: "arraybuffer",
    }),
  profilePictureGetIdImage: (id: string) =>
    get(`/static/profile-pictures/${id}`, {
      responseType: "arraybuffer",
    }),
  createUserStacks: (params: UserStackRequest) =>
    post("/api/user-stacks", params).then((response) => response.data),
  updateManyUserStacks: (userId: string, params: UpdateUserStacksRequest) =>
    put(`/api/user-stacks/many/${userId}`, params).then(
      (response) => response.data
    ),
  deleteUserStacks: (idStack: string) => remove(`/api/user-stacks/${idStack}`),
  deleteUser: (id: string) => remove(`/api/user/${id}`),
  getExpertiseOptions: () =>
    get<ExpertiseOptionsResponse>("/api/user/user-expertise").then(
      (response) => response.data
    ),
};

export const research = {
  getResourcesCount: () =>
    get("/api/research-profile/resources-count").then(
      (response) => response.data
    ),
  getResources: (relations = []) =>
    get(`/api/research-area`, {
      params: { relations: relations.join(",") },
    }).then((response) => response.data),
  getIconStatic: (icon: string) =>
    get(`/static/research-area-icons/${icon}`, { responseType: "blob" }).then(
      (response) => response.data
    ),
  getIconUser: (id: string) =>
    get(`/api/user/profile-picture/${id}`, { responseType: "blob" }).then(
      (response) => response.data
    ),
  getPDF: (id: string) =>
    get(`/api/research-area/pdf/${id}`, { responseType: "blob" }).then(
      (response) => response.data
    ),
  removeArea: (id: string) =>
    remove(`/api/research-area/${id}`).then((response) => response.data),
  getResourcesById: (id: string, relations?: string[]) =>
    get(`/api/research-area`, {
      params: {
        "where[id]": id,
        "relations[]": relations,
      },
    }).then((response) => response.data),
  createArea: (areaData: { name: string; description: string }) =>
    post("/api/research-area", areaData).then((response) => response.data),
  uploadIcon: (id: string, file: File) => {
    const formData = new FormData();
    formData.append("icon", file);
    return post(`/api/research-area/icon/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => response.data);
  },

  uploadPdf: (id: string, file: File) => {
    const formData = new FormData();
    formData.append("pdf", file);
    return post(`/api/research-area/pdf/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => response.data);
  },

  updateArea: (id: string, areaData: { name: string; description: string }) =>
    put(`/api/research-area/${id}`, areaData).then((response) => response.data),

  getBases: (params?: {
    take?: number;
    skip?: number;
    "order[created_at]"?: "ASC" | "DESC";
    "search[name]"?: string;
    "where[id]"?: string;
  }) => get(`/api/database`, { params }).then((response) => response.data),

  createBase: (data: Base) =>
    post("/api/database", data).then((response) => response.data),
  updateBases: (id: string, data: Base) =>
    put(`/api/database/${id}`, data).then((response) => response.data),
  removeBase: (id: string) =>
    remove(`/api/database/${id}`).then((response) => response.data),

  getArticles: (params?: {
    take?: number;
    skip?: number;
    "order[created_at]"?: "ASC" | "DESC";
    "search[title]"?: string;
    "where[id]"?: string;
  }) =>
    get(`/api/paper/`, {
      params: {
        ...params,
        "relations[]": "authors.user",
      },
    }).then((response) => response.data),
    
  getPDFArticle: (id: string) =>
    get(`/api/paper/pdf/${id}`, { responseType: "blob" }).then(
      (response) => response.data
    ),
  updatePaper: (id: string, data: Article) =>
    put(`/api/paper/${id}`, data).then((response) => response.data),
  uploadPdfPaper: (id: string, file: File) => {
    const formData = new FormData();
    formData.append("pdf", file);
    return post(`/api/paper/pdf/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => response.data);
  },
  createArticle: (data: Article) =>
    post("/api/paper/", data).then((response) => response.data),
  removeArticle: (id: string) =>
    remove(`/api/paper/${id}`).then((response) => response.data),

  isUserLinked: (researchAreaId: string, userId: string) =>
    get<UserLinkStatusResponse>(
      `/api/research-area/is-user-linked/${researchAreaId}/${userId}`
    ).then((response) => response.data),

  linkUserToArea: (researchAreaId: string, userId: string) =>
    post<UserLinkResponse>(
      `/api/research-area/user-to-area/${researchAreaId}/${userId}`
    ).then((response) => response.data),

  unlinkUserFromArea: (researchAreaId: string, userId: string) =>
    remove<UserLinkResponse>(
      `/api/research-area/user-from-area/${researchAreaId}/${userId}`
    ).then((response) => response.data),
};

export const stacks = {
  findStacks: () => get<StacksResponse>(`/api/stack/`),
  fetchIconStatic: (idIcon: string) =>
    get(`/static/stacks-icons/${idIcon}`, {
      responseType: "arraybuffer",
    }),
};

export const insigniaIcons = {
  fetchIconStatic: (idIcon: string) =>
    get(`/static/insignias-icons/${idIcon}`, {
      responseType: "arraybuffer",
    }),
};

export const projectsEndpoint = {
  getProjects: (params?: {
    take?: number;
    skip?: number;
    "order[created_at]"?: "ASC" | "DESC";
    "search[name]"?: string;
    "where[id]"?: string;
    "relations[]"?: string[];
  }) =>
    get<ProjectsResponse>(`/api/projects`, { params }).then(
      (response) => response.data
    ),
  createProject: (data: ProjectRequest) =>
    post(`/api/projects`, data).then((response) => response.data),
  updateProject: (id: string | undefined, data: ProjectRequest) =>
    put(`/api/projects/${id}`, data).then((response) => response.data),
  removeProject: (id: string) =>
    remove(`/api/projects/${id}`).then((response) => response.data),
  getAllUsersProjectSummary: (params?: {
    take?: number;
    skip?: number;
    "order[created_at]"?: "ASC" | "DESC";
    "search[name]"?: string;
  }) =>
    get<UsersProjectSummary[]>(`/api/projects/all-users-project-summary`, {
      params,
    }).then((response) => response.data),
};

export const LaboratoryAsset = {
  createAsset: (assetData: Asset) =>
    post(`/api/laboratory-asset`, assetData).then((response) => response.data),

  getAssest: (params?: {
    take?: number;
    skip?: number;
    "order[created_at]"?: "ASC" | "DESC";
    "search[name]"?: string;
  }) =>
    get<LaboratoryAssets>(`/api/laboratory-asset?relations[]=user`, {
      params,
    }).then((response) => response.data),

  removeAsset: (id: string | undefined) =>
    remove(`/api/laboratory-asset/${id}`).then((response) => response.data),

  updateAsset: (id: string | undefined, assetData: Asset) =>
    put(`/api/laboratory-asset/${id}`, assetData).then(
      (response) => response.data
    ),
};

export const acessControl = {
  updateAcessControl: (
    id: string | undefined,
    data: EditAcessControlInterface
  ) => put(`/api/access-control/${id}`, data).then((response) => response.data),
};

export const insignia = {
  getInsignias: () => get("api/insignias").then((response) => response.data),
  getIcon: (id: string) =>
    get(`/static/insignias-icons/${id}`, { responseType: "blob" }).then(
      (response) => response.data
    ),
  updateInsignias: (id: string, data: any) =>
    put(`/api/user/${id}`, data).then((response) => response.data),
};

export const projectDocuments = {
  get: (params?: {
    "relations[]"?: string[];
    "where[project_id]"?: string;
    "where[projectMember.id]"?: string;
    "where[status]"?: string;
  }) =>
    get(`/api/project-document`, { params }).then((response) => response.data),
};

export const researchProfile = {
  getResearchProfiles: (params?: {
    "relations[]"?: string[];
    "where[id]"?: string;
  }) => 
    get(`/api/research-profile`, { params }).then((response) => response.data),
};
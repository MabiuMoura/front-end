export interface Researcher {
  name: string;
  image: string;
}

export interface Area {
  id: number;
  name: string;
  image: string;
  route: string;
  researchers: Researcher[];
  pdf: string;
}

export interface ResearchArea {
  id: string;
  created_at: Date | string | null;
  updated_at: Date | string | null;
  deleted_at: Date | string | null;
  name: string;
  description: string;
  pdf_mongo_id: string;
  icon: string;
}

export interface Article {
  id?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  title: string;
  publicationYear?: number;
  abstract?: string;
  access_link: string;
  pdf_mongo_id?: string | null;
  DOI: string;
  authors: ResearchProfile[];
  options?: string;
}

// ARTICLE STRUCTURE BY THE BACK-END
export interface paper {
  id: string;
  created_at: Date | string | null;
  updated_at: Date | string | null;
  deleted_at: Date | string | null;
  title: string;
  publicationYear: number;
  abstract: string;
  access_link: string;
  pdf_mongo_id: string;
  DOI: string;
}

export interface Base {
  id?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  name: string;
  description: string;
  access_link: string;
  options?: string;
}

export interface ResearchDatabase {
  id: string;
  created_at: Date | string | null;
  updated_at: Date | string | null;
  deleted_at: Date | string | null;
  name: string;
  description: string;
  access_link: string;
}

export type RegisterMemberFormValues = {
  fullName: string;
  ID?: string;
  firstName?: string;
  email: string;
  birthDate: Date | null;
  confirmEmail: string;
  image?: string | null;
  memberSince?: Date | null;
  cpf?: string;
  isAdmin?: boolean;
};

export type AddBaseFormValues = {
  title: string;
  description: string;
  link: string;
};

export type AboutMeFormValues = {
  aboutText: string;
  githubLink: string;
  linkedinLink: string;
};

export type MyProfileFormValues = {
  name: string;
  especialist: string;
  memberSince: Date | null;
};

// ================ Interfaces Integration ================

export interface AuthRequest {
  type_auth: string;
  token?: string;
  email?: string;
  password?: string;
}

export interface InfoUser {
  id: string;
  username: string;
  email: string;
  fullname: string;
  birthday: string;
  photo: string;
  force_password_change: boolean;
}

export interface Role {
  id: string;
  updated_at: string;
  name: string;
  description: string;
}

export interface ProfileState {
  profileName: string;
  roles: Role[];
}

export interface AccessProfile {
  [key: string]: {
    roles: Role[];
  };
}

export interface AuthResponse {
  infoUser: InfoUser;
  access_profile: AccessProfile;
  access_token: string;
  refresh_token: string;
  is_first_login: boolean;
}

export interface ResearchProfile {
  id: string;
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
  research_databases: ResearchDatabase[];
  research_areas: ResearchArea[];
  papers: paper[];
  user: User;
}

export interface Address {
  id?: string;
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
  country: string | null;
  state: string | null;
  city: string | null;
  zip_code: string | null;
  distric: string | null;
  street: string | null;
  house_number: string | null;
}

export interface InstitutionalInfo {
  id?: string;
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
  institution: string | null;
  college_degree: string | null;
  semester: string | null;
  college_id: string | null;
  course: string | null;
}

export interface AccessControlProfile {
  id: string;
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
  tagId: string | null;
  isFingerprintRegistered: boolean;
  isFacialRegistered: boolean;
}

export interface UserStacksInterface {
  id: string;
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
  level: number;
  stackState: string;
  stack: StackInterface;
}

export interface UserStackRequest {
  level: number;
  stackState: string;
  stack: {
    id: string;
  };
  user: {
    id: string;
  };
}

export interface StackInterface {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  name: string;
  icon: string;
}

export interface StacksResponse {
  totalCount: number;
  items: StackInterface[];
}

export interface LaboratoryAssets {
  totalCount: number;
  items: Asset[];
}

export interface Asset {
  id?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  name: string;
  description: string;
  category: string;
  manufacturer: string;
  affiliation: string;
  assetId: string;
  user?: { id: string } | null;
  options?: string;
}

export interface Insignia {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  name: string;
  description: string;
  icon: string;
}

export interface MeAuth {
  id: string;
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
  name: string;
  is_first_login: boolean;
  about_me: string | null;
  linkedIn: string | null;
  github: string | null;
  expertise: string | null;
  memberSince: string | null;
  email: string;
  nickname: string;
  rg: string | null;
  cpf: string;
  birthday: string;
  phone_number: string | null;
  profile_picture_id: string | null;
  research_profile: ResearchProfile;
  address: Address;
  institutional_info: InstitutionalInfo;
  access_control_profile: AccessControlProfile;
  insignias: Insignia[];
  user_stacks: UserStacksInterface[];
  access_profiles: any[];
  project_memberships: any[];
}

export interface UpdateFirstLoginRequest {
  rg: string | null;
  phone_number: string | null;
  address: Address;
  institutional_info: InstitutionalInfo;
}

export interface ResetPassword {
  current_password: string;
  new_password: string;
  new_password_confirm: string;
  token: string;
}

export type CreateMember = {
  fullname: string;
  email: string;
  birthday: Date | string | null;
  confirm_email: string;
  cpf: string;
  is_admin: boolean;
};

export interface ResourceCounts {
  number: number;
  name: string;
  route: string;
  description: string;
}

export interface Researcher {
  userId: string;
  name: string;
  image: string;
}

interface Timestamps {
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface User extends Timestamps {
  id: string;
  name: string;
  nickname: string;
  is_first_login: boolean;
  about_me: string | null;
  linkedIn: string | null;
  github: string | null;
  expertise: string;
  memberSince: string;
  email: string;
  rg: string;
  cpf: string;
  birthday: string;
  phone_number: string;
  profile_picture_id: string;
  shield_user_id: string;
  shield_access_control_id: string;
  access_control_profile?: AccessControlProfile;
  insignias?: Insignia[];
  user_stacks?: UserStacksInterface[];
  research_profile?: ResearchProfile;
}

export interface UsersResponse {
  totalCount: number;
  items: User[];
}

export interface ResearchProfileArea extends Timestamps {
  id: string;
  user: User;
}

export interface Resources extends Timestamps {
  id: string;
  name: string;
  description: string;
  pdf_mongo_id: string;
  icon: string;
  research_profiles?: ResearchProfileArea[];
}

export interface Author {
  id: string;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
  user: User;
}

export type CreateArea = {
  title: string;
  description: string;
};
export interface UpdateUserStacksRequest {
  update?: Array<{
    stackId: string;
    level: number;
    stackState: string;
  }>;
  remove?: Array<{
    stackId: string;
  }>;
}

export type EditAcessControlInterface = {
  tagId?: string | null;
  isFingerprintRegistered?: boolean;
  isFacialRegistered?: boolean;
};
export type ProjectTable = {
  id: string;
  Name: string;
  Status: string;
  Members: Number;
  options?: any;
  description?: string;
  status?: string;
  totalMembersCount?: number;
  projectGroups?: ProjectGroups[];
};

export interface ProjectStep1 {
  name: string;
  description: string;
}

export interface ProjectGroups {
  id?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  name: string;
  description?: string;
  project_members: ProjectMembers[];
}

export interface ProjectMembers {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  user: Member;
}

export interface Member {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  name: string;
  nickname: string;
  is_first_login: boolean;
  about_me: string | null;
  linkedIn: string | null;
  github: string | null;
  expertise: string | null;
  memberSince: string | null;
  email: string;
  rg: string | null;
  cpf: string;
  birthday: string;
  phone_number: string | null;
  profile_picture_id: string | null;
}

export interface ProjectItems {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  name: string;
  description?: string;
  status?: string;
  totalMembersCount?: number;
  projectGroups?: ProjectGroups[];
  projectMembers?: ProjectMembers[];
}

export interface ProjectsResponse {
  totalCount: number;
  items: ProjectItems[];
}

export interface ProjectRequest {
  name?: string;
  status?: string;
  description?: string;
  groups?: Array<{
    name?: string;
    members?: Array<{
      id: string;
    }>;
  }>;
}

export type ExpertiseOptionsResponse = string[];

export interface UserLinkStatusResponse {
  isLinked: boolean;
}

export interface UserLinkResponse {
  status: "linked" | "unlinked";
}

export interface UsersProjectSummary {
  id?: string;
  user: {
    name: string;
    profile_picture_id: string;
  };
  projects: Array<{
    name?: string;
    endDate: string;
  }>;
  totalGrantAmount: number;
}

export interface ProjectDocument {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  name: string;
  description: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  documentHash: string;
  templateMongoId: string | null;
  submissionMongoId: string | null;
}

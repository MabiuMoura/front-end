import {
  AboutMeFormValues,
  AddBaseFormValues,
  MyProfileFormValues,
  CreateMember,
  CreateArea,
} from "./interfaces";

export const RegisterMemberValues: CreateMember = {
  fullname: "",
  email: "",
  birthday: null,
  confirm_email: "",
  cpf: "",
  is_admin: false,
  //image: null,
};

export const AddBaseValues: AddBaseFormValues = {
  title: "",
  description: "",
  link: "",
};

export const AboutMeValues: AboutMeFormValues = {
  aboutText: "",
  githubLink: "",
  linkedinLink: "",
};

export const MyProfileValues: MyProfileFormValues = {
  name: "",
  especialist: "",
  memberSince: null,
};

export const CreateAreaValues: CreateArea = {
  title: "",
  description: "",
};

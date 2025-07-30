import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Campo de e-mail obrigatório")
    .email("Por favor, insira um e-mail válido"),
  password: z.string().min(1, "Campo de senha obrigatório"),
});

export const registerMemberSchema = z.object({
  fullname: z.string().min(1, "Nome obrigatório"),
  email: z.string().email("Insira um e-mail válido"),
  birthday: z
    .date()
    .nullable()
    .refine((date) => date !== null, {
      message: "Data de nascimento obrigatória",
    }),
  confirm_email: z.string().min(1, "Campo obrigatório"),
  // image: z.string().nullable().refine((img) => img !== null, {
  //   message: "Imagem obrigatória",
  // }),
  cpf: z
    .string()
    .transform((value) => value.replace(/[^\d]/g, ""))
    .refine((value) => {
      if (value.length !== 11) return false;
      if (/^(\d)\1+$/.test(value)) return false;

      let sum = 0;
      for (let i = 0; i < 9; i++) sum += parseInt(value[i]) * (10 - i);
      let digit1 = 11 - (sum % 11);
      if (digit1 > 9) digit1 = 0;

      sum = 0;
      for (let i = 0; i < 10; i++) sum += parseInt(value[i]) * (11 - i);
      let digit2 = 11 - (sum % 11);
      if (digit2 > 9) digit2 = 0;

      return value.slice(-2) === `${digit1}${digit2}`;
    }, "CPF inválido"),
  is_admin: z.boolean(),
});

export const addBaseSchema = z.object({
  title: z.string().min(1, "Título obrigatório"),
  description: z.string().min(1, "Descrição obrigatória"),
  link: z.string().url("Link inválido").min(1, "Campo obrigatório"),
});

export const addArticleSchema = z.object({
  title: z.string().min(1, "Título obrigatório"),
  publicationYear: z.number().min(1000, "Ano inválido."),
  DOI: z.string().min(1, "O DOI é obrigatório."),
  access_link: z.string().url("Link inválido").min(1, "Campo obrigatório"),
  abstract: z.string().min(0, "O resumo (abstract) é obrigatório."),
  
});

export const aboutMeSchema = z.object({
  aboutText: z.string().min(1, "Descrição obrigatório"),
  githubLink: z.string().url("Link inválido").min(1, "Campo obrigatório"),
  linkedinLink: z.string().url("Link inválido").min(1, "Campo obrigatório"),
});

export const myProfileSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  especialist: z.string().min(1, "Especialidade obrigatória"),
  memberSince: z
    .date()
    .nullable()
    .refine((date) => date !== null, {
      message: "Data obrigatória",
    }),
});

export const stepOneSchemaRegister = z.object({
  fullName: z.string().min(3, "Nome completo é obrigatório"),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida"),
  email: z.string().email("E-mail inválido"),
  cpf: z
    .string()
    .transform((value) => value.replace(/[^\d]/g, ""))
    .refine((value) => {
      if (value.length !== 11) return false;
      if (/^(\d)\1+$/.test(value)) return false;

      let sum = 0;
      for (let i = 0; i < 9; i++) sum += parseInt(value[i]) * (10 - i);
      let digit1 = 11 - (sum % 11);
      if (digit1 > 9) digit1 = 0;

      sum = 0;
      for (let i = 0; i < 10; i++) sum += parseInt(value[i]) * (11 - i);
      let digit2 = 11 - (sum % 11);
      if (digit2 > 9) digit2 = 0;

      return value.slice(-2) === `${digit1}${digit2}`;
    }, "CPF inválido"),
  rg: z.string().min(5, "RG inválido"),
  phone: z
    .string()
    .transform((value) => value.replace(/[^\d]/g, ""))
    .refine((value) => value.length === 11, "Número de celular inválido"),
});

export const stepTwoSchemaRegister = z.object({
  college_degree: z.string().min(1, "Título é obrigatório"),
  institution: z.string().min(2, "Instituição é obrigatória"),
  course: z.string().min(2, "Curso é obrigatório"),
  semester: z.string().min(1, "Semestre é obrigatório"),
  college_id: z.string().min(4, "Matrícula inválida"),
});

export const stepThreeSchemaRegister = z.object({
  zip_code: z
    .string()
    .transform((value) => value.replace(/[^\d]/g, ""))
    .refine((value) => value.length === 8, "CEP inválido"),
  street: z.string().min(3, "Endereço é obrigatório"),
  house_number: z.string().min(1, "Número é obrigatório"),
  distric: z.string().min(2, "Bairro é obrigatório"),
  city: z.string().min(2, "Cidade é obrigatória"),
  state: z.string().min(2, "Estado é obrigatório"),
  country: z.string().min(2, "País é obrigatório"),
});

export const resetPasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Senha atual é obrigatória"),
    newPassword: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
      .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
      .regex(/[0-9]/, "A senha deve conter pelo menos um número")
      .regex(
        /[^A-Za-z0-9]/,
        "A senha deve conter pelo menos um caractere especial"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "A nova senha deve ser diferente da senha atual",
    path: ["newPassword"],
  });

export const createAreaSchema = z.object({
  title: z.string().min(1, "Título obrigatório"),
  description: z.string().min(1, "Descrição vazia"),
});

export const AssetSchema = z.object({
  id: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  deleted_at: z.string().nullable().optional(),
  name: z.string().min(1, "Nome do ativo é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  category: z.string().min(1, "Categoria é obrigatória"),
  manufacturer: z.string().min(1, "Fabricante é obrigatório"),
  affiliation: z.string().min(1, "Afiliação é obrigatória"),
  assetId: z.string().min(1, "ID do ativo é obrigatório"),
  user: z.object({ id: z.string() }).nullable().optional(),
});

export const editAcessControlSchema = z.object({
  tagId: z.string().optional(),
  isFingerprintRegistered: z.boolean().optional(),
  isFacialRegistered: z.boolean().optional(),
});

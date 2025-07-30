import { Controller, useForm } from "react-hook-form";
import { Column, ModalContent, Row } from "./styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditAcessControlInterface } from "../../../../../../../shared/constants/interfaces";
import { editAcessControlSchema } from "../../../../../../../shared/constants/schemas";
import InputModalCreate from "../../../../../../Research/Areas/components/Modals/CreateModal/inputModal";
import ButtonsModalsPerfil from "../../../../../../../components/Buttons/ButtonsModalsPerfil";
import Select from "../../../../../../../components/Selects/Select";

interface EditAcessControl {
  onClose: () => void;
  onSubmitData: (data: EditAcessControlInterface) => void;
  facial: boolean;
  digital: boolean;
  tagId: string | null;
}
const EditAcessControl: React.FC<EditAcessControl> = ({
  onClose,
  onSubmitData,
  facial,
  digital,
  tagId,
}) => {
  //const facialRef = useRef<HTMLDivElement>(null);
  //const digitalRef = useRef<HTMLDivElement>(null);

  //const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditAcessControlInterface>({
    resolver: zodResolver(editAcessControlSchema),
    defaultValues: {
      tagId: tagId ?? "",
      isFingerprintRegistered: digital,
      isFacialRegistered: facial,
    },
    mode: "onChange",
  });

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       facialRef.current &&
  //       !facialRef.current.contains(event.target as Node) &&
  //       digitalRef.current &&
  //       !digitalRef.current.contains(event.target as Node)
  //     ) {
  //       setOpenDropdown(null);
  //     }
  //   };

  //   if (openDropdown) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   } else {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   }

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [openDropdown]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const onSubmit = (data: EditAcessControlInterface) => {
    const formattedData = {
      ...data,
      tagId: data.tagId === "" ? null : data.tagId,
    };

    console.log(formattedData, "AAAAAAAAAAAAAAA");
    onSubmitData(formattedData);
  };

  return (
    <ModalContent>
      <Column>
        <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>
          <Controller
            name="tagId"
            control={control}
            render={({ field }) => (
              <InputModalCreate
                label="ID Tag"
                {...field}
                value={field.value ?? ""}
                error={errors.tagId?.message}
                width="100%"
                height="2.5rem"
                marginBottom="20px"
              />
            )}
          />
          <Row>
            <Controller
              name="isFacialRegistered"
              control={control}
              render={({ field }) => (
                <Select
                  label="Facial"
                  placeholder="Selecione"
                  options={["Cadastrado", "Não Cadastrado"]}
                  value={facial ? "Cadastrado" : "Não Cadastrado"}
                  onOptionSelect={(option) =>
                    field.onChange(option === "Cadastrado")
                  }
                />
              )}
            />

            <Controller
              name="isFingerprintRegistered"
              control={control}
              render={({ field }) => (
                <Select
                  label="Digital"
                  placeholder="Selecione"
                  options={["Cadastrado", "Não Cadastrado"]}
                  value={digital ? "Cadastrado" : "Não Cadastrado"}
                  onOptionSelect={(option) =>
                    field.onChange(option === "Cadastrado")
                  }
                />
              )}
            />
          </Row>
        </form>
        <ButtonsModalsPerfil
          onCancel={onClose}
          onConfirm={handleSubmit(onSubmit)}
          confirmText="Cancelar"
        />
      </Column>
    </ModalContent>
  );
};

export default EditAcessControl;

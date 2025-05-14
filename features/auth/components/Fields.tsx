import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FieldProps {
    id: string;
    label: string;
    type: string;
    name: string;
    placeholder: string;
    register: any;
    errors: any;
}



const Field = ({id,label,type,name,placeholder, register, errors}: FieldProps) => {
  return (
    <div className="space-y-1">
      <Label htmlFor={id}>{label}</Label>
      <Input
        {...register(name)}
        type={type}
        id={id}
        placeholder={placeholder}
      />
      {errors[name] && (
        <p className="text-sm text-red-500">{errors[name].message}</p>
      )}
    </div>
  );
};

export default Field;
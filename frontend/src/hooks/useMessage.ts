import { useToast } from "@/components/ui/use-toast";

export const useMessage = () => {
  const { toast } = useToast();
  const successMessage = (message: string) => {
    return toast({
      title: "✔️ Success",
      description: message,
      duration: 3000,
    });
  };
  const errorMessage = (message: string) => {
    return toast({
      title: "❌ Failed",
      duration: 3000,
      description: message,
    });
  };
  return { successMessage, errorMessage };
};

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useNewAccount } from "../hooks/useNewAccounts";
import { AccountForm } from "./accountForm";
import { insertAccountSchema } from "../../../../db/schema";
import { z } from "zod";
import { useCreateAccount } from "../api/useCreateAccount";


const formSchema = insertAccountSchema.pick({
  name: true
});

type FormValues = z.infer<typeof formSchema>;

const NewAccountSheet = () => {

  const { isOpen, onClose } = useNewAccount();

  const mutation = useCreateAccount();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      }
    });
  } 


  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>
            New Account
          </SheetTitle>
          <SheetDescription>
            Create a new Account to track your Transactions.
          </SheetDescription>
        </SheetHeader>
        <AccountForm
          onSubmit={onSubmit} 
          disabled={mutation.isPending}
          defaultValues={{
            name: ""
          }} 
        />
      </SheetContent>
    </Sheet>
  )
}

export default NewAccountSheet;

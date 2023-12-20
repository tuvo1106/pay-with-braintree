import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import axios from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useModal } from "@/hooks/use-modal-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionFormSchema } from "@/schema";

export const CreateTransactionModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type == "createTransaction";

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const onSubmit = async (values: z.infer<typeof transactionFormSchema>) => {
    try {
      await axios.post("/api/v1/transactions", values);
      toast.success("Transaction created");
      form.reset();
      onClose();
    } catch (error) {
      toast.error("Error creating transaction");
      console.log(error);
    }
  };

  const form = useForm({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      amount: "1.23",
      paymentMethodToken: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black pt-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-xl text-center font-bold">
            Create Transaction
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="paymentMethodToken"
                render={({ field }) => (
                  <FormItem className="text-xs font-bold text-zinc-500 dark:text-secondary">
                    <FormLabel>PAYMENT METHOD TOKEN</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="text-xs font-bold text-zinc-500 dark:text-secondary">
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="1.23"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
            </div>
            <DialogFooter className="px-6 py-4">
              <Button variant="default" disabled={isLoading}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

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
import {
    paymentMethodFormSchema,
    verificationAddOnsEnum,
    verificationMethodEnum,
} from "@/schema";
import { VENMO_ACCOUNT } from "@/lib/constants";

export const VaultVenmoPaymentMethodModal = () => {
    const { isOpen, onClose, type } = useModal();
    const isModalOpen = isOpen && type == "vaultVenmoPaymentMethod";

    const handleClose = () => {
        form.reset();
        onClose();
    };

    const onSubmit = async (
        values: z.infer<typeof paymentMethodFormSchema>
    ) => {
        try {
            await axios.post("/api/v1/payment_methods", values);
            toast.success("Payment method created");
            form.reset();
            onClose();
        } catch (error) {
            console.log(error);
        }
    };

    const form = useForm({
        resolver: zodResolver(paymentMethodFormSchema),
        defaultValues: {
            paymentInstrument: VENMO_ACCOUNT,
            paymentMethodNonce: "",
            braintreeCustomerId: "15211990216",
            verificationMethod: verificationMethodEnum.Enum.unknown,
            verificationAddOns: verificationAddOnsEnum.Enum.unknown,
        },
    });

    const isLoading = form.formState.isSubmitting;

    form.getFieldState("paymentMethodNonce");

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black pt-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-xl text-center font-bold">
                        Vault a Payment Method
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        className="space-y-8"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="space-y-8 px-6">
                            <FormField
                                control={form.control}
                                name="paymentMethodNonce"
                                render={({ field }) => (
                                    <FormItem className="text-xs font-bold text-zinc-500 dark:text-secondary">
                                        <FormLabel>
                                            Payment Method Nonce
                                        </FormLabel>
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
                                name="braintreeCustomerId"
                                render={({ field }) => (
                                    <FormItem className="text-xs font-bold text-zinc-500 dark:text-secondary">
                                        <FormLabel>
                                            Braintree Customer ID
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="15211990216"
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
                                Vault
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

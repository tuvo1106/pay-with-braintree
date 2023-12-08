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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getBraintreeClient, getLocalPaymentInstance } from "@/lib/braintree";

import { ACH_MANDATE_TEXT } from "@/lib/constants";
import { BraintreeError } from "braintree-web";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import axios from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

const paymentTypeEnum = z.enum(["ideal", "sofort"]);

const formSchema = z.object({
    paymentType: paymentTypeEnum,
    amount: z.string().min(1, { message: "Amount is required." }),
    currencyCode: z.string().min(1, { message: "Amount is required." }),
    givenName: z.string().min(1, { message: "First name is required." }),
    surname: z.string().min(1, { message: "Last name is required." }),
});

export const CreateLpmNonceModal = () => {
    const { isOpen, onClose, type } = useModal();
    const router = useRouter();

    const isModalOpen = isOpen && type == "createLpmNonce";

    const tokenizationKey =
        process.env.NEXT_PUBLIC_BRAINTREE_SDK_TOKENIZATION_KEY;
    if (!tokenizationKey) {
        toast.error("");
        return null;
    }

    const handleClose = () => {
        form.reset();
        onClose();
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const client = await getBraintreeClient(tokenizationKey);
        if (!client) {
            toast.error("Braintree client unavailable");
            return null;
        }
        const localPaymentInstance = await getLocalPaymentInstance(client);
        if (!localPaymentInstance) {
            toast.error("Local payment instance unavailable");
            return;
        }

        const handlePaymentStart = async function (payload: any, start: any) {
            console.log("IN HANDLE PAYMENT START");
            console.log(payload);
            start();
        };

        try {
            const response = await localPaymentInstance.startPayment({
                paymentType: values.paymentType,
                amount: values.amount,
                currencyCode: values.currencyCode,
                givenName: values.givenName,
                surname: values.givenName,
                fallback: {
                    url: "https://your-domain.com/page-to-complete-checkout",
                    buttonText: "Complete Payment",
                },
                onPaymentStart: handlePaymentStart,
            });

            console.log(response);
            toast.success("Tokenization successful");

            // await axios.post("/api/v1/nonces", tokenizePayload);
            form.reset();
            onClose();
            router.refresh();
        } catch (error) {
            console.log(error);
            toast.error("Tokenization unsuccessful");
        }
    };

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            paymentType: paymentTypeEnum.Enum.ideal,
            amount: "",
            currencyCode: "",
            givenName: "",
            surname: "",
        },
    });

    const isLoading = form.formState.isSubmitting;

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black pt-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-xl text-center font-bold">
                        Create Nonce
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
                                name="paymentType"
                                render={({ field }) => (
                                    <FormItem className="text-xs font-bold text-zinc-500 dark:text-secondary">
                                        <FormLabel>PAYMENT TYPE</FormLabel>
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none">
                                                    <SelectValue placeholder="Select an ownership type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem
                                                    value="sofort"
                                                    className="capitalize"
                                                >
                                                    SOFORT
                                                </SelectItem>
                                                <SelectItem
                                                    value="ideal"
                                                    className="capitalize"
                                                >
                                                    IDEAL
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>

                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem className="text-xs font-bold text-zinc-500 dark:text-secondary">
                                        <FormLabel>AMOUNT</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="1.00"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                            <FormField
                                control={form.control}
                                name="currencyCode"
                                render={({ field }) => (
                                    <FormItem className="text-xs font-bold text-zinc-500 dark:text-secondary">
                                        <FormLabel>CURRENCY CODE</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="EUR"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                            <FormField
                                control={form.control}
                                name="givenName"
                                render={({ field }) => (
                                    <FormItem className="text-xs font-bold text-zinc-500 dark:text-secondary">
                                        <FormLabel>FIRST NAME</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="Tu"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                            <FormField
                                control={form.control}
                                name="surname"
                                render={({ field }) => (
                                    <FormItem className="text-xs font-bold text-zinc-500 dark:text-secondary">
                                        <FormLabel>LAST NAME</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="Vo"
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

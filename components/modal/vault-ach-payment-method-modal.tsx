import * as z from "zod"

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import axios from "axios"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { useModal } from "@/hooks/use-modal-store"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    paymentMethodFormSchema,
    verificationAddOnsEnum,
    verificationMethodEnum,
} from "@/schema"
import { VENMO_ACCOUNT } from "@/lib/constants"

export const VaultAchPaymentMethodModal = () => {
    const { isOpen, onClose, type } = useModal()
    const isModalOpen = isOpen && type == "vaultAchPaymentMethod"

    const handleClose = () => {
        form.reset()
        onClose()
    }

    const onSubmit = async (
        values: z.infer<typeof paymentMethodFormSchema>,
    ) => {
        try {
            await axios.post("/api/v1/payment_methods", values)
            toast.success("Payment method created")
            form.reset()
            onClose()
        } catch (error) {
            console.log(error)
        }
    }

    const form = useForm({
        resolver: zodResolver(paymentMethodFormSchema),
        defaultValues: {
            paymentInstrument: VENMO_ACCOUNT,
            paymentMethodNonce: "",
            braintreeCustomerId: "15211990216",
            verificationMethod: verificationMethodEnum.Enum.unknown,
            verificationAddOns: verificationAddOnsEnum.Enum.unknown,
        },
    })

    const isLoading = form.formState.isSubmitting

    form.getFieldState("paymentMethodNonce")

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
                            <FormField
                                control={form.control}
                                name="verificationMethod"
                                render={({ field }) => (
                                    <FormItem className="text-xs font-bold text-zinc-500 dark:text-secondary">
                                        <FormLabel>
                                            VERIFICATION METHOD
                                        </FormLabel>
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none">
                                                    <SelectValue placeholder="Select a verification method" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="independent_check">
                                                    INDEPENDENT
                                                </SelectItem>
                                                <SelectItem value="network_check">
                                                    NETWORK CHECK
                                                </SelectItem>
                                                <SelectItem value="micro_transfers">
                                                    MICRO-TRANSFERS
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                            <FormField
                                control={form.control}
                                name="verificationAddOns"
                                render={({ field }) => (
                                    <FormItem className="text-xs font-bold text-zinc-500 dark:text-secondary">
                                        <FormLabel>
                                            VERIFICATION ADD ONS
                                        </FormLabel>
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none">
                                                    <SelectValue placeholder="Select a verification add on" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="customer_verification">
                                                    CUSTOMER_VERIFICATION
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
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
    )
}

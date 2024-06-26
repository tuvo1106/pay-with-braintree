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
} from "@/components/ui/select"
import {
    accountTypeEnum,
    achNonceFormSchema,
    ownershipTypeEnum,
} from "@/schema"
import { getBraintreeClient, getUsBankAccountInstance } from "@/lib/braintree"

import { ACH_MANDATE_TEXT } from "@/lib/constants"
import { BraintreeError } from "braintree-web"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import axios from "axios"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { useModal } from "@/hooks/use-modal-store"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"

export const CreateAchNonceModal = () => {
    const { isOpen, onClose, type } = useModal()
    const router = useRouter()

    const isModalOpen = isOpen && type == "createAchNonce"

    const form = useForm({
        resolver: zodResolver(achNonceFormSchema),
        defaultValues: {
            accountNumber: "1000000000",
            routingNumber: "121042882",
            accountHolderName: "Tu Vo",
            accountType: accountTypeEnum.Enum.UNKNOWN,
            ownershipType: ownershipTypeEnum.Enum.UNKNOWN,
        },
    })

    const tokenizationKey =
        process.env.NEXT_PUBLIC_BRAINTREE_SDK_TOKENIZATION_KEY
    if (!tokenizationKey) {
        return null
    }

    const handleClose = () => {
        form.reset()
        onClose()
    }

    const onSubmit = async (values: z.infer<typeof achNonceFormSchema>) => {
        const client = await getBraintreeClient(tokenizationKey)
        if (!client) return
        const usBankAccountInstance = await getUsBankAccountInstance(client)
        if (!usBankAccountInstance) {
            console.log("Instance unavailable")
            return
        }

        const handleTokenize = async function (
            tokenizeErr: BraintreeError | undefined,
            tokenizePayload: any,
        ) {
            if (tokenizeErr) {
                console.log(tokenizeErr)
            } else {
                toast.success("Tokenization successful")

                try {
                    await axios.post("/api/v1/nonces", tokenizePayload)
                    form.reset()
                    onClose()
                    router.refresh()
                } catch (error) {
                    console.log(error)
                }
            }
        }
        const billingAddress = {
            streetAddress: "123 Main Street",
            extendedAddress: "",
            locality: "Oakland",
            region: "CA",
            postalCode: "94601",
        }

        let bankDetails
        if (values.ownershipType == "BUSINESS") {
            bankDetails = {
                accountNumber: values.accountNumber,
                routingNumber: values.routingNumber,
                accountType: values.accountType,
                billingAddress: {
                    ...billingAddress,
                },
                businessOwner: {
                    businessName: "TEST",
                },
            }
        } else {
            const [firstName, lastName] = values.accountHolderName.split(" ")
            bankDetails = {
                accountNumber: values.accountNumber,
                routingNumber: values.routingNumber,
                accountType: values.accountType.toLowerCase(),
                ownershipType: values.ownershipType.toLowerCase(),
                firstName,
                lastName,
                billingAddress: {
                    ...billingAddress,
                },
            }
        }

        usBankAccountInstance.tokenize(
            {
                mandateText: ACH_MANDATE_TEXT,
                bankDetails,
                bankLogin: null,
            },
            handleTokenize,
        )
    }

    const isLoading = form.formState.isSubmitting

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
                                name="accountNumber"
                                render={({ field }) => (
                                    <FormItem className="text-xs font-bold text-zinc-500 dark:text-secondary">
                                        <FormLabel>ACCOUNT NUMBER</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="1000000000"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                            <FormField
                                control={form.control}
                                name="routingNumber"
                                render={({ field }) => (
                                    <FormItem className="text-xs font-bold text-zinc-500 dark:text-secondary">
                                        <FormLabel>ROUTING NUMBER</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="121042882"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                            <FormField
                                control={form.control}
                                name="accountHolderName"
                                render={({ field }) => (
                                    <FormItem className="text-xs font-bold text-zinc-500 dark:text-secondary">
                                        <FormLabel>
                                            ACCOUNT HOLDER NAME
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="Tu Vo"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                            <FormField
                                control={form.control}
                                name="accountType"
                                render={({ field }) => (
                                    <FormItem className="text-xs font-bold text-zinc-500 dark:text-secondary">
                                        <FormLabel>ACCOUNT TYPE</FormLabel>
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none">
                                                    <SelectValue placeholder="Select an account type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem
                                                    value="SAVINGS"
                                                    className="capitalize"
                                                >
                                                    SAVINGS
                                                </SelectItem>
                                                <SelectItem
                                                    value="CHECKING"
                                                    className="capitalize"
                                                >
                                                    CHECKING
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                            <FormField
                                control={form.control}
                                name="ownershipType"
                                render={({ field }) => (
                                    <FormItem className="text-xs font-bold text-zinc-500 dark:text-secondary">
                                        <FormLabel>OWNERSHIP TYPE</FormLabel>
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
                                                    value="BUSINESS"
                                                    className="capitalize"
                                                >
                                                    BUSINESS
                                                </SelectItem>
                                                <SelectItem
                                                    value="PERSONAL"
                                                    className="capitalize"
                                                >
                                                    PERSONAL
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
                                Create
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

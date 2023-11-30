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

const formSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required." }),
    lastName: z.string().min(1, { message: "Last name is required." }),
    email: z.string().min(1, { message: "Email is required." }),
    company: z.string(),
    phone: z.string(),
});

export const CreateCustomerModal = () => {
    const { isOpen, onClose, type, data } = useModal();

    const isModalOpen = isOpen && type == "createCustomer";

    const handleClose = () => {
        form.reset();
        onClose();
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post("/api/v1/customers", values);
            toast.success("Customer created");
            form.reset();
            onClose();
        } catch (error) {
            toast.error("Error creating customer");
            console.log(error);
        }
    };

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            company: "",
            email: "",
            phone: "",
        },
    });

    const isLoading = form.formState.isSubmitting;

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black pt-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-xl text-center font-bold">
                        Create Customer
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
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem className="text-xs font-bold text-zinc-500 dark:text-secondary">
                                        <FormLabel>FIRST NAME</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="John"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem className="text-xs font-bold text-zinc-500 dark:text-secondary">
                                        <FormLabel>LAST NAME</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="Doe"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                            <FormField
                                control={form.control}
                                name="company"
                                render={({ field }) => (
                                    <FormItem className="text-xs font-bold text-zinc-500 dark:text-secondary">
                                        <FormLabel>COMPANY</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="Banksy Trading Company"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="text-xs font-bold text-zinc-500 dark:text-secondary">
                                        <FormLabel>EMAIL</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="banksytradingco@gmail.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem className="text-xs font-bold text-zinc-500 dark:text-secondary">
                                        <FormLabel>EMAIL</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="555 555 5555"
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

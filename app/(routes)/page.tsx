"use client"

import {
    ArrowRight,
    Banknote,
    CircleDollarSign,
    Landmark,
    User2,
} from "lucide-react"
import { useEffect, useState } from "react"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export default function HomePage() {
    const router = useRouter()

    const [hydrated, setHydrated] = useState(false)

    useEffect(() => {
        setHydrated(true)
    }, [])

    if (!hydrated) {
        return null
    }

    const tools = [
        {
            label: "Nonces",
            icon: CircleDollarSign,
            href: "/nonces",
            color: "text-violet-500",
            bgColor: "bg-violet-500/10",
        },
        {
            label: "Customers",
            icon: User2,
            href: "/customers",
            color: "text-pink-700",
            bgColor: "bg-pink-700/10",
        },
        {
            label: "Payment Methods",
            icon: Landmark,
            href: "/payment_methods",
            color: "text-emerald-500",
            bgColor: "bg-emerald-500/10",
        },
        {
            label: "Transactions",
            icon: Banknote,
            href: "/transactions",
            color: "text-orange-700",
            bgColor: "bg-orange-700/10",
        },
    ]

    return (
        <div>
            <div className="mb-8 space-y-4">
                <h2 className="text-2xl md:text-4xl font-bold text-center">
                    Pay With Braintree
                </h2>
                <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
                    Transact with ACH, SEPA and Local Payments with the power of
                    Braintree
                </p>
            </div>
            <div className="px-4 md:px-20 lg:px-32 space-y-4">
                {tools.map((tool) => (
                    <Card
                        onClick={() => router.push(tool.href)}
                        key={tool.href}
                        className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
                    >
                        <div className="flex items-center gap-x-4">
                            <div
                                className={cn(
                                    "p-2 w-fit rounded-md",
                                    tool.bgColor,
                                )}
                            >
                                <tool.icon
                                    className={cn("w-8 h-8", tool.color)}
                                />
                            </div>
                            <div className="font-semibold">{tool.label}</div>
                        </div>
                        <ArrowRight className="w-5 h-5" />
                    </Card>
                ))}
            </div>
        </div>
    )
}

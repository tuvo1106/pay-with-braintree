"use client"

import { useEffect, useState } from "react"

import { LoginButton } from "@/components/auth/login-button"
import { Button } from "@/components/ui/button"

export default function Page() {
    const [hydrated, setHydrated] = useState(false)

    useEffect(() => {
        setHydrated(true)
    }, [])

    if (!hydrated) {
        return null
    }

    return (
        <div>
            <div className="px-4 md:px-20 lg:px-32 space-y-4">
                <LoginButton>
                    <Button variant="secondary" size="lg">
                        Sign In
                    </Button>
                </LoginButton>
            </div>
        </div>
    )
}

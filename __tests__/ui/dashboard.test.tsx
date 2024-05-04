import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

import DashboardPage from "@/app/(routes)/dashboard/page"

jest.mock("next/navigation", () => jest.requireActual("next-router-mock"))

describe("Dashboard Page", () => {
    test("renders the header", () => {
        render(<DashboardPage />)

        const paragraph = screen.getByText(
            "Transact with ACH, SEPA and Local Payments with the power of Braintree",
        )
        expect(paragraph).toBeInTheDocument()
    })

    test("renders the paragraph", () => {
        render(<DashboardPage />)

        const paragraph = screen.getByText(
            "Transact with ACH, SEPA and Local Payments with the power of Braintree",
        )
        expect(paragraph).toBeInTheDocument()
    })
})

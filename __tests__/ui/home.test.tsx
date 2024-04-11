import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import mockRouter from "next-router-mock";

import HomePage from "@/app/(routes)/page";

jest.mock("next/navigation", () => jest.requireActual("next-router-mock"));

describe("Home Page", () => {
    test("renders the header", () => {
        render(<HomePage />);

        const paragraph = screen.getByText(
            "Transact with ACH, SEPA and Local Payments with the power of Braintree"
        );
        expect(paragraph).toBeInTheDocument();
    });

    test("renders the paragraph", () => {
        render(<HomePage />);

        const paragraph = screen.getByText(
            "Transact with ACH, SEPA and Local Payments with the power of Braintree"
        );
        expect(paragraph).toBeInTheDocument();
    });
});

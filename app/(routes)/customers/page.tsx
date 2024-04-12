import { DataTable } from "@/components/data-table"
import { Heading } from "@/components/heading"
import { Customer as PrismaCustomer } from "@prisma/client"
import { columns } from "./columns"
import { db } from "@/lib/db"
import CustomerSelect from "@/components/customerSelect"

const CustomerPage = async () => {
    const data = await db.customer.findMany({})

    return (
        <div>
            <Heading title="Customers" description="lorem ipsum" />
            <CustomerSelect />
            <div className="px-4 lg:px-8 py-8">
                <DataTable
                    columns={columns}
                    data={transformData(data)}
                ></DataTable>
            </div>
        </div>
    )
}

const transformData = (customers: PrismaCustomer[] | undefined) => {
    if (!customers) {
        return []
    }

    return customers.map((customer) => ({
        name: `${customer.firstName} ${customer.lastName}`,
        company: customer.company,
        email: customer.email,
        phone: customer.phone,
        braintreePublicId: customer.braintreePublicId,
        createdAt: new Date(customer.createdAt).toDateString(),
    }))
}

export default CustomerPage
